"""Simple in-memory TTL cache for mostly-static portfolio content."""
import copy
import os
import time
from typing import Any, Awaitable, Callable, TypeVar

T = TypeVar("T")

DEFAULT_TTL_SECONDS = int(os.environ.get("CONTENT_CACHE_TTL", "600"))


class TTLCache:
    def __init__(self, ttl_seconds: int = DEFAULT_TTL_SECONDS) -> None:
        self._ttl = ttl_seconds
        self._store: dict[str, tuple[float, Any]] = {}

    def get(self, key: str) -> Any | None:
        entry = self._store.get(key)
        if not entry:
            return None
        expires_at, value = entry
        if time.time() >= expires_at:
            del self._store[key]
            return None
        return copy.deepcopy(value)

    def set(self, key: str, value: Any) -> None:
        self._store[key] = (time.time() + self._ttl, copy.deepcopy(value))

    def invalidate(self, key: str | None = None) -> None:
        if key is None:
            self._store.clear()
        else:
            self._store.pop(key, None)

    async def get_or_set(
        self,
        key: str,
        loader: Callable[[], Awaitable[T]],
    ) -> T:
        cached = self.get(key)
        if cached is not None:
            return cached
        value = await loader()
        self.set(key, value)
        return copy.deepcopy(value)


content_cache = TTLCache()
