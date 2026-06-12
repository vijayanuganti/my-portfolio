"""MongoDB indexes for portfolio read paths."""
import logging

logger = logging.getLogger(__name__)


async def ensure_indexes(db) -> None:
    """Create indexes idempotently (safe on every startup)."""
    await db.projects.create_index([("id", 1)], unique=True, background=True)
    await db.experience.create_index([("order", 1)], background=True)
    await db.page_visits.create_index([("timestamp", -1)], background=True)
    await db.contact_messages.create_index([("timestamp", -1)], background=True)
    logger.info("MongoDB indexes ensured")
