from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse, Response
from fastapi.exceptions import RequestValidationError
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import time
from pathlib import Path
from typing import List
from collections import defaultdict
from datetime import datetime, timedelta
import httpx

from models import (
    Project,
    About,
    SkillCategory,
    Experience,
    ContactMessage,
    ContactMessageCreate,
    Certification,
    Testimonial,
    BlogPost,
    AnalyticsVisitCreate,
)
from seed_database import purge_and_seed
from email_service import send_contact_notification
from github_service import fetch_github_stats

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]

GITHUB_USERNAME = os.environ.get("GITHUB_USERNAME", "vijayanuganti")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio API", version="2.0.0")
api_router = APIRouter(prefix="/api")

# In-memory rate limit: IP -> list of timestamps
_contact_rate_limit: dict[str, list[datetime]] = defaultdict(list)
CONTACT_LIMIT = 3
CONTACT_WINDOW = timedelta(hours=1)


def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def check_contact_rate_limit(ip: str) -> bool:
    now = datetime.utcnow()
    _contact_rate_limit[ip] = [
        t for t in _contact_rate_limit[ip] if now - t < CONTACT_WINDOW
    ]
    if len(_contact_rate_limit[ip]) >= CONTACT_LIMIT:
        return False
    _contact_rate_limit[ip].append(now)
    return True


@app.middleware("http")
async def request_logging_middleware(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration_ms = (time.time() - start) * 1000
    logger.info(
        "%s %s %s %.2fms",
        request.method,
        request.url.path,
        response.status_code,
        duration_ms,
    )
    return response


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.warning("Validation error on %s: %s", request.url.path, exc.errors())
    return JSONResponse(status_code=422, content={"detail": exc.errors()})


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled error on %s: %s", request.url.path, str(exc))
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})


@app.on_event("startup")
async def startup_db_client():
    try:
        force_reseed = os.environ.get("RESEED_DB", "").lower() in ("1", "true", "yes")
        portfolio_count = await db.portfolio_info.count_documents({})
        needs_reseed = force_reseed or portfolio_count == 0
        if force_reseed:
            logger.info("RESEED_DB=true — purging and reloading from seed_data.py")
        if needs_reseed:
            await purge_and_seed(db, purge_all=False)
            logger.info("Database seeded successfully!")
        else:
            logger.info("Database up to date, skipping seed.")
    except Exception as e:
        logger.error("Error during startup: %s", str(e))


@api_router.get("/")
async def api_root():
    return {"message": "Portfolio API is running", "version": "2.0.0"}


@app.api_route("/", methods=["GET", "HEAD"])
async def root():
    return {
        "status": "ok",
        "message": "Portfolio API is running",
        "version": "2.0.0",
        "docs": "/docs",
        "api": "/api/",
    }


@app.api_route("/health", methods=["GET", "HEAD"])
async def health():
    return {"status": "ok"}


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)


@api_router.get("/portfolio/info")
async def get_portfolio_info():
    info = await db.portfolio_info.find_one({}, {"_id": 0})
    if not info:
        raise HTTPException(status_code=404, detail="Portfolio info not found")
    return info


@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find({}, {"_id": 0}).sort("id", 1).to_list(100)
    return projects


@api_router.get("/projects/{project_id}")
async def get_project(project_id: int):
    project = await db.projects.find_one({"id": project_id}, {"_id": 0})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@api_router.get("/about")
async def get_about():
    about = await db.about.find_one({}, {"_id": 0})
    if not about:
        raise HTTPException(status_code=404, detail="About info not found")
    return about


@api_router.get("/skills")
async def get_skills():
    try:
        skills = await db.skills.find({}, {"_id": 0}).to_list(100)
        # Normalize legacy string-only skills from older seeds
        for cat in skills:
            normalized = []
            for s in cat.get("skills", []):
                if isinstance(s, str):
                    normalized.append({"name": s, "proficiency": 85, "icon": "default"})
                else:
                    normalized.append(s)
            cat["skills"] = normalized
        return skills
    except Exception as e:
        logger.error(f"Error fetching skills: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@api_router.get("/experience", response_model=List[Experience])
async def get_experience():
    items = await db.experience.find({}, {"_id": 0}).sort("order", 1).to_list(50)
    return items


@api_router.get("/certifications", response_model=List[Certification])
async def get_certifications():
    items = await db.certifications.find({}, {"_id": 0}).to_list(50)
    return items


@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    items = await db.testimonials.find({}, {"_id": 0}).to_list(50)
    return items


@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts():
    items = await db.blog_posts.find({}, {"_id": 0}).to_list(50)
    return items


@api_router.get("/github/stats")
async def get_github_stats():
    return await fetch_github_stats(GITHUB_USERNAME)


@api_router.post("/contact")
async def create_contact_message(message: ContactMessageCreate, request: Request):
    ip = get_client_ip(request)
    if not check_contact_rate_limit(ip):
        raise HTTPException(
            status_code=429,
            detail="Too many messages. Please try again in an hour.",
        )
    try:
        contact_msg = ContactMessage(**message.dict(), ip_address=ip)
        await db.contact_messages.insert_one(contact_msg.dict())

        await send_contact_notification(
            name=message.name,
            email=message.email,
            message=message.message,
        )

        logger.info("Contact message from %s (IP: %s) — email sent", message.email, ip)
        return {"success": True, "message": "Message sent successfully"}
    except ValueError as e:
        logger.error("Email configuration error: %s", str(e))
        raise HTTPException(status_code=500, detail="Email service is not configured.")
    except RuntimeError as e:
        logger.error("Email delivery failed: %s", str(e))
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        logger.error("Error saving contact message: %s", str(e))
        raise HTTPException(status_code=500, detail="Failed to send message")


@api_router.post("/analytics/visit")
async def track_visit(payload: AnalyticsVisitCreate, request: Request):
    ip = get_client_ip(request)
    visit = {
        "path": payload.path,
        "timestamp": datetime.utcnow(),
        "ip_address": ip,
        "user_agent": request.headers.get("User-Agent", "")[:256],
    }
    await db.page_visits.insert_one(visit)
    total = await db.page_visits.count_documents({})
    return {"success": True, "total_visits": total}


@api_router.get("/analytics/visit")
async def get_visit_stats():
    total = await db.page_visits.count_documents({})
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    today_count = await db.page_visits.count_documents(
        {"timestamp": {"$gte": today_start}}
    )
    return {"total_visits": total, "visits_today": today_count}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
