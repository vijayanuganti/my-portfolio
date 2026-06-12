"""
Reset and seed the portfolio MongoDB database from seed_data.py.

Usage (from backend folder):
  python seed_database.py              # purge all content collections and reseed
  python seed_database.py --purge-all  # also drop contact_messages & page_visits
"""
import argparse
import asyncio
import os
import re
from pathlib import Path

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

from seed_data import (
    portfolio_info_data,
    projects_data,
    about_data,
    skills_data,
    experience_data,
    certifications_data,
    testimonials_data,
    blog_posts_data,
    FLAGSHIP_PROJECT_TITLES,
    REMOVED_PROJECT_TITLES,
    CONTENT_COLLECTIONS,
    ANALYTICS_COLLECTIONS,
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

IFRAME_RENDER_TYPES = {"iframe_mobile", "iframe_desktop"}


def normalize_project(project: dict) -> dict:
    """Ensure consistent field shapes for API + frontend iframe previews."""
    normalized = dict(project)
    render_type = normalized.get("render_type")
    if render_type and render_type not in IFRAME_RENDER_TYPES:
        render_type = None
    normalized["render_type"] = render_type
    normalized["tagline"] = normalized.get("tagline") or None
    normalized["live_url"] = normalized.get("live_url") or None
    normalized["github_url"] = normalized.get("github_url") or None
    normalized["tech_icons"] = normalized.get("tech_icons") or []
    return normalized


def normalized_projects() -> list[dict]:
    return [normalize_project(p) for p in projects_data]


from db_indexes import ensure_indexes


async def drop_collections(db, names: list[str]) -> None:
    existing = set(await db.list_collection_names())
    for name in names:
        if name in existing:
            await db.drop_collection(name)
            print(f"  dropped: {name}")
        else:
            print(f"  skipped (missing): {name}")


async def purge_stale_project_documents(db) -> int:
    """
    Remove retired projects and duplicate standalone flagship documents
    before inserting canonical seed entries.
    """
    deleted = 0

    if REMOVED_PROJECT_TITLES:
        result = await db.projects.delete_many({"title": {"$in": REMOVED_PROJECT_TITLES}})
        deleted += result.deleted_count
        if result.deleted_count:
            print(f"  cleared retired projects: {result.deleted_count}")

    flagship_patterns = [
        re.compile(r"^ChatFlow", re.IGNORECASE),
        re.compile(r"^Sarat Electronics", re.IGNORECASE),
    ]
    for pattern in flagship_patterns:
        result = await db.projects.delete_many({"title": {"$regex": pattern.pattern, "$options": "i"}})
        deleted += result.deleted_count
        if result.deleted_count:
            print(f"  cleared legacy flagship duplicates ({pattern.pattern}): {result.deleted_count}")

    if FLAGSHIP_PROJECT_TITLES:
        result = await db.projects.delete_many({"title": {"$in": FLAGSHIP_PROJECT_TITLES}})
        deleted += result.deleted_count

    return deleted


async def insert_seed_data(db) -> None:
    await db.portfolio_info.insert_one(portfolio_info_data)
    await purge_stale_project_documents(db)
    await db.projects.insert_many(normalized_projects())
    await db.about.insert_one(about_data)
    await db.skills.insert_many(skills_data)
    await db.experience.insert_many(experience_data)
    if certifications_data:
        await db.certifications.insert_many(certifications_data)
    if testimonials_data:
        await db.testimonials.insert_many(testimonials_data)
    if blog_posts_data:
        await db.blog_posts.insert_many(blog_posts_data)


async def purge_and_seed(db, *, purge_all: bool = False) -> None:
    """Drop portfolio collections and insert fresh seed data."""
    collections_to_drop = list(CONTENT_COLLECTIONS)
    if purge_all:
        collections_to_drop.extend(ANALYTICS_COLLECTIONS)
    await drop_collections(db, collections_to_drop)
    await insert_seed_data(db)


async def seed(*, purge_all: bool) -> None:
    mongo_url = os.environ.get("MONGO_URL")
    db_name = os.environ.get("DB_NAME", "portfolio_db")

    if not mongo_url:
        raise SystemExit("MONGO_URL is missing in backend/.env")

    target = mongo_url.split("@")[-1] if "@" in mongo_url else mongo_url
    print(f"Connecting to database '{db_name}' @ {target}")

    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]

    try:
        await client.admin.command("ping")
        print("Connection OK\n")
    except Exception as e:
        raise SystemExit(f"Cannot reach MongoDB: {e}") from e

    print("Purging collections...")
    await purge_and_seed(db, purge_all=purge_all)

    print("\nDone. Document counts:")
    for col in CONTENT_COLLECTIONS:
        count = await db[col].count_documents({})
        print(f"  {col}: {count}")

    await ensure_indexes(db)
    print("Indexes ensured.")

    client.close()


def main():
    parser = argparse.ArgumentParser(
        description="Purge and reseed portfolio MongoDB from seed_data.py"
    )
    parser.add_argument(
        "--purge-all",
        action="store_true",
        help="Also drop contact_messages and page_visits",
    )
    args = parser.parse_args()
    asyncio.run(seed(purge_all=args.purge_all))


if __name__ == "__main__":
    main()
