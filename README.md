# Portfolio Website — Anuganti Vijay Kumar

A modern, full-stack personal portfolio built with **React 19**, **FastAPI**, and **MongoDB Atlas**. Showcases flagship projects, skills, experience, and a live contact form with **Brevo** email delivery.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database & Seeding](#database--seeding)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Deployment](#deployment-vercel--render)
- [Author](#author)

---

## Features

- **Hero section** — Profile photo, typewriter roles, resume popover (View / Download)
- **Featured projects** — Filterable showcase with flagship apps (ChatFlow, Sarat Electronics, healthcare portals)
- **Skills** — Categorized proficiency bars with tech icons
- **Experience timeline** — Work history with responsibilities and tech stacks
- **About & education** — Multi-entry education history and strengths
- **Contact form** — Rate-limited submissions saved to MongoDB + email via Brevo
- **GitHub stats** — Live contribution data from GitHub API
- **Dark / light theme** — Persistent theme toggle
- **Fully responsive** — Mobile-first layout with scroll animations

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, Create React App + Craco, Tailwind CSS, shadcn/ui, Radix UI, Axios, React Router |
| **Backend** | FastAPI, Uvicorn, Pydantic, Motor (async MongoDB) |
| **Database** | MongoDB Atlas |
| **Email** | Brevo (transactional API) |
| **Deployment** | Vercel (frontend), Render (backend) |

---

## Architecture

```
┌──────────────────────────────────────────┐
│         React SPA (Vercel)               │
│  Hero │ Projects │ Skills │ Contact      │
└──────────────────┬───────────────────────┘
                   │ REST / JSON
┌──────────────────▼───────────────────────┐
│         FastAPI (Render)                 │
│  Portfolio │ Projects │ Contact │ GitHub │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│         MongoDB Atlas                    │
└──────────────────────────────────────────┘
                   │
              Brevo API (contact emails)
```

All portfolio content is managed from **`backend/seed_data.py`** — the single source of truth for MongoDB.

---

## Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| Python | 3.10+ |
| MongoDB | Atlas cluster or local instance |

### 1. Clone the repository

```bash
git clone https://github.com/vijayanuganti/my-portfolio.git
cd my-portfolio
```

### 2. Backend setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
```

Edit `backend/.env` with your MongoDB URI, Brevo keys, and CORS origins.

Seed the database:

```bash
python seed_database.py
```

Start the API:

```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

- API: **http://localhost:8001/api/**
- Docs: **http://localhost:8001/docs**

### 3. Frontend setup

```bash
cd frontend
npm install --legacy-peer-deps
cp .env.example .env
```

Set in `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

Start the dev server:

```bash
npm start
```

App runs at **http://localhost:3000**

### 4. Static assets

| Asset | Path |
|-------|------|
| Profile photo | `frontend/public/images/profile.jpg` |
| Resume PDF | `frontend/public/pdfs/Vijay_resume.pdf` |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `MONGO_URL` | MongoDB Atlas connection URI |
| `DB_NAME` | Database name (default: `portfolio_db`) |
| `RESEED_DB` | Set `true` once to reload from `seed_data.py` |
| `GITHUB_USERNAME` | GitHub username for stats widget |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins |
| `BREVO_API_KEY` | Brevo API key for contact emails |
| `BREVO_SENDER_EMAIL` | Verified sender in Brevo |
| `BREVO_SENDER_NAME` | Display name for outgoing mail |
| `CONTACT_RECIPIENT_EMAIL` | Inbox for contact form messages |

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `REACT_APP_BACKEND_URL` | Backend URL without trailing slash |

> Never commit `.env` files. Use `.env.example` as a template.

---

## Database & Seeding

Content is defined in **`backend/seed_data.py`** and loaded via **`backend/seed_database.py`**.

```bash
cd backend

# Purge content collections and reseed
python seed_database.py

# Also clear contact messages & analytics
python seed_database.py --purge-all
```

Collections: `portfolio_info`, `projects`, `about`, `skills`, `experience`, `certifications`, `testimonials`, `blog_posts`

See [backend/DATABASE.md](backend/DATABASE.md) for schema details.

### Test contact email

```bash
cd backend
python test_email.py
```

If Brevo returns an IP error, disable **Authorized IPs** at [Brevo Security](https://app.brevo.com/security/authorised_ips) or add your server IP.

---

## Project Structure

```
my-portfolio/
├── backend/
│   ├── server.py              # FastAPI app & routes
│   ├── models.py              # Pydantic schemas
│   ├── seed_data.py           # Portfolio content (edit here)
│   ├── seed_database.py       # Purge + seed script
│   ├── email_service.py       # Brevo email integration
│   ├── test_email.py          # Email delivery test
│   ├── requirements.txt       # Dev dependencies
│   ├── requirements-prod.txt  # Production (Render)
│   └── DATABASE.md
│
├── frontend/
│   ├── public/
│   │   ├── images/profile.jpg
│   │   └── pdfs/Vijay_resume.pdf
│   ├── src/
│   │   ├── components/        # Hero, Projects, Skills, Contact, etc.
│   │   ├── constants/         # Tech icons, resume helpers
│   │   ├── context/           # Theme provider
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/api.js       # REST client
│   ├── vercel.json            # Vercel deploy config
│   └── craco.config.js
│
├── render.yaml                # Render Blueprint
└── README.md
```

---

## API Reference

Base URL: `http://localhost:8001/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/portfolio/info` | Name, title, links, tagline |
| `GET` | `/projects` | All projects (sorted by id) |
| `GET` | `/projects/{id}` | Single project |
| `GET` | `/about` | About summary & education |
| `GET` | `/skills` | Categorized skills |
| `GET` | `/experience` | Work experience |
| `GET` | `/certifications` | Awards & activities |
| `GET` | `/testimonials` | Testimonials |
| `GET` | `/blog` | Blog posts |
| `GET` | `/github/stats` | GitHub contribution stats |
| `POST` | `/contact` | Submit contact form (rate-limited) |
| `POST` | `/analytics/visit` | Track page visit |

---

## Deployment (Vercel + Render)

### Backend — Render

1. Push repo to GitHub
2. [Render Dashboard](https://dashboard.render.com) → **New → Blueprint** → connect repo
3. Set secret env vars: `MONGO_URL`, `ALLOWED_ORIGINS`, Brevo keys
4. Deploy → note URL: `https://portfolio-api.onrender.com`

**MongoDB Atlas:** allow `0.0.0.0/0` in Network Access  
**Brevo:** add Render server IP or disable Authorized IPs

### Frontend — Vercel

1. [vercel.com/new](https://vercel.com/new) → import GitHub repo
2. **Root Directory:** `frontend`
3. Environment variable:

```env
REACT_APP_BACKEND_URL=https://portfolio-api.onrender.com
```

4. Deploy → note URL: `https://your-portfolio.vercel.app`

### Link them together

Update Render `ALLOWED_ORIGINS`:

```env
ALLOWED_ORIGINS=https://your-portfolio.vercel.app
```

Redeploy Render after updating CORS.

### Production checklist

- [ ] MongoDB Atlas network access configured
- [ ] Brevo sender email verified
- [ ] Brevo Authorized IPs updated for Render
- [ ] `RESEED_DB=false` on production
- [ ] `ALLOWED_ORIGINS` includes Vercel URL
- [ ] `REACT_APP_BACKEND_URL` points to Render API

---

## Available Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm start` | Dev server (port 3000) |
| `npm run build` | Production build → `build/` |
| `npm test` | Run tests |

### Backend

| Command | Description |
|---------|-------------|
| `uvicorn server:app --reload --port 8001` | Dev API server |
| `python seed_database.py` | Reseed MongoDB |
| `python test_email.py` | Test Brevo delivery |

---

## Author

**Anuganti Vijay Kumar**  
Python Developer & Aspiring Full-Stack Web Developer

- **GitHub:** [vijayanuganti](https://github.com/vijayanuganti)
- **LinkedIn:** [vijju1403](https://www.linkedin.com/in/vijju1403)
- **Email:** vijayanuganti504@gmail.com
- **Location:** Hyderabad, Telangana

---

<p align="center">
  Built with React, FastAPI, MongoDB Atlas, and Brevo.
</p>
