# MongoDB setup — use your own database

## 1. Set connection in `backend/.env`

```env
MONGO_URL=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority
DB_NAME=your_portfolio_db_name
RESEED_DB=true
```

| Variable | Purpose |
|----------|---------|
| `MONGO_URL` | Full MongoDB connection string (local or Atlas) |
| `DB_NAME` | Database name on that server (you choose it) |
| `RESEED_DB` | `true` = on next backend start, wipe portfolio collections and load `seed_data.py` |

**MongoDB Atlas:** Network Access → allow your IP (or `0.0.0.0/0` for dev). Database Access → user with read/write on your DB.

Copy from `.env.example` if needed.

## 2. Change portfolio content

Edit **`backend/seed_data.py`** — this is the single source for:

- `portfolio_info_data` — name, email, GitHub, tagline
- `projects_data` — projects list
- `about_data` — summary, education, strengths
- `skills_data` — skills with proficiency %
- `experience_data` — jobs timeline
- `certifications_data`, `testimonials_data`, `blog_posts_data`

Then reload the database (always purges content collections first):

```bash
cd backend
python seed_database.py
```

Or set `RESEED_DB=true` in `.env`, restart the API, then set it back to `false`.

To also clear contact form submissions and visit analytics:

```bash
python seed_database.py --purge-all
```

## 3. Restart backend

```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

## 4. What is NOT wiped on reseed

- `contact_messages` — contact form submissions
- `page_visits` — analytics

Only portfolio content collections are replaced.

## 5. Edit data in MongoDB directly (optional)

Use [MongoDB Compass](https://www.mongodb.com/products/compass) or Atlas UI. Collections:

`portfolio_info`, `projects`, `about`, `skills`, `experience`, `certifications`, `testimonials`, `blog_posts`

After manual edits, set `RESEED_DB=false` so startup does not overwrite your changes.
