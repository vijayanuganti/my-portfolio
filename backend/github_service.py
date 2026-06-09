"""GitHub stats fetcher with caching and graceful fallback for production."""
import logging
import os
import time
from typing import Any, Optional

import httpx

logger = logging.getLogger(__name__)

_CACHE: dict[str, dict[str, Any]] = {}
CACHE_TTL_SECONDS = 900  # 15 minutes


def _stats_cards(username: str) -> dict[str, str]:
    theme = "theme=tokyonight&hide_border=true&bg_color=0f172a&title_color=6366f1"
    return {
        "stats": (
            f"https://github-readme-stats.vercel.app/api?username={username}"
            f"&show_icons=true&{theme}&icon_color=10b981"
        ),
        "top_langs": (
            f"https://github-readme-stats.vercel.app/api/top-langs/?username={username}"
            f"&layout=compact&{theme}"
        ),
        # Heroku instance is deprecated; use maintained Vercel mirror
        "streak": (
            f"https://github-readme-streak-stats.demos.dev/?user={username}"
            f"&theme=tokyonight&hide_border=true&background=0f172a"
            f"&ring=6366f1&fire=10b981&currStreakNum=ffffff"
        ),
    }


def _fallback_payload(username: str) -> dict[str, Any]:
    return {
        "username": username,
        "name": username,
        "avatar_url": None,
        "public_repos": 0,
        "followers": 0,
        "following": 0,
        "html_url": f"https://github.com/{username}",
        "bio": None,
        "stats_cards": _stats_cards(username),
        "cached": False,
        "degraded": True,
    }


def _github_headers() -> dict[str, str]:
    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    token = os.environ.get("GITHUB_TOKEN", "").strip()
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


async def fetch_github_stats(username: str) -> dict[str, Any]:
    """Return GitHub profile stats; never raises for upstream API failures."""
    now = time.time()
    cached = _CACHE.get(username)
    if cached and cached["expires_at"] > now:
        payload = dict(cached["payload"])
        payload["cached"] = True
        return payload

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(
                f"https://api.github.com/users/{username}",
                headers=_github_headers(),
            )

        if response.status_code == 404:
            logger.warning("GitHub user not found: %s", username)
            return _fallback_payload(username)

        if response.status_code == 403:
            logger.warning(
                "GitHub API rate limit for %s — returning card URLs only. "
                "Set GITHUB_TOKEN on Render for higher limits.",
                username,
            )
            return _fallback_payload(username)

        response.raise_for_status()
        user = response.json()

        payload = {
            "username": username,
            "name": user.get("name") or username,
            "avatar_url": user.get("avatar_url"),
            "public_repos": user.get("public_repos", 0),
            "followers": user.get("followers", 0),
            "following": user.get("following", 0),
            "html_url": user.get("html_url") or f"https://github.com/{username}",
            "bio": user.get("bio"),
            "stats_cards": _stats_cards(username),
            "cached": False,
            "degraded": False,
        }
        _CACHE[username] = {"payload": payload, "expires_at": now + CACHE_TTL_SECONDS}
        return payload

    except httpx.HTTPError as exc:
        logger.error("GitHub API request failed for %s: %s", username, exc)
        if cached:
            payload = dict(cached["payload"])
            payload["cached"] = True
            payload["degraded"] = True
            return payload
        return _fallback_payload(username)
