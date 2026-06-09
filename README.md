# Electronics Store E-commerce Website

A modern, full-stack e-commerce marketplace specialized in electronics, featuring interactive user dashboards, responsive design layouts, dynamic data filtering, and a powerful backend architecture.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python&logoColor=white)

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Technical Stack](#️-technical-stack)
- [Architecture Overview](#-architecture-overview)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🚀 Key Features

- **Product Catalog & Management** — Structured showcase of electronics with real-time inventory updates and specialized specifications (processor, RAM, storage, display, connectivity, and more).
- **Dynamic Filtering** — Advanced filtering mechanisms allowing users to narrow down products by category, price range, brand, and specifications instantly without page reloads.
- **Interactive Dashboards** — Secure, user-friendly portal layouts for checking past orders, active tracking, and managing profile credentials.
- **Modern Responsive Design** — Fully optimized UI that adapts beautifully across mobile viewports, tablets, and large desktop screens.
- **State Management & Live Updates** — Smooth asynchronous data flows tracking user interactions, shopping cart states, and checkout calculations without screen flicker or reload lag.
- **REST API Driven Architecture** — Clean abstraction layer fetching, processing, and caching electronic product payloads safely with validation and error handling.

---

## 🛠️ Technical Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend Framework** | React (Vite-powered for high-performance Hot Module Replacement) |
| **Styling & UI** | Tailwind CSS / Bootstrap for clean, mobile-first layouts |
| **State & Routing** | React Hooks, Context API / state management, React Router DOM |
| **Backend Infrastructure** | Python web frameworks (FastAPI / Dash / Flask) |
| **Database & Storage** | Structured database systems (MySQL / Oracle SQL / MongoDB) for safe persistence of product payloads, order histories, and user info |
| **Tools & Version Control** | Git, GitHub, and VS Code |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (React + Vite)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐  │
│  │ Catalog  │  │ Filters  │  │  Cart    │  │  Dashboard  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬──────┘  │
│       └─────────────┴─────────────┴───────────────┘         │
│                         REST / JSON                         │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                   Backend (FastAPI / Python)                │
│  Products │ Orders │ Users │ Auth │ Inventory │ Analytics   │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│              Database (MongoDB / MySQL / Oracle)            │
└─────────────────────────────────────────────────────────────┘
```

The application follows a **decoupled client–server model**: the Vite-powered React SPA handles presentation and client-side state, while the Python API manages business logic, authentication, and database operations.

---

## 🚦 Getting Started

### Prerequisites

Before you begin, ensure the following are installed on your machine:

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | v18 or higher | Required for the Vite frontend |
| **npm** or **yarn** | Latest stable | Package manager for frontend dependencies |
| **Python** | 3.8+ | Required for the backend API |
| **Database** | MongoDB / MySQL / Oracle | Local instance or cloud-hosted (e.g., MongoDB Atlas) |
| **Git** | Latest | Version control |

### Installation & Local Setup

#### 1. Clone the repository

```bash
git clone <repository-url>
cd electronics-store
```

#### 2. Set up the backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
```

Copy the environment template and configure your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your database connection string and secret keys (see [Environment Variables](#-environment-variables)).

Seed the database with sample electronics inventory (optional):

```bash
python seed_database.py
```

Start the backend development server:

```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

The API will be available at **http://localhost:8001**. Interactive docs at **http://localhost:8001/docs**.

#### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8001
```

Start the Vite development server:

```bash
npm run dev
```

The storefront will open at **http://localhost:5173** (default Vite port).

#### 4. Verify the setup

| Service | URL | Expected Result |
|---------|-----|-----------------|
| Frontend | http://localhost:5173 | Product catalog homepage loads |
| Backend API | http://localhost:8001/api/health | Returns `{ "status": "ok" }` |
| API Docs | http://localhost:8001/docs | Swagger UI with all endpoints |

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URL` | Database connection URI | `mongodb+srv://user:pass@cluster.mongodb.net` |
| `DB_NAME` | Database name | `electronics_store_db` |
| `SECRET_KEY` | JWT / session signing key | Random secure string |
| `CORS_ORIGINS` | Allowed frontend origins | `http://localhost:5173` |
| `RESEED_DB` | Force reseed on startup | `false` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8001` |

> **Security note:** Never commit `.env` files to version control. Use `.env.example` as a template only.

---

## 📁 Project Structure

```
electronics-store/
├── backend/
│   ├── server.py              # FastAPI application entry point
│   ├── models.py              # Pydantic schemas & data models
│   ├── seed_data.py           # Sample product & user seed data
│   ├── seed_database.py       # Database seeding utility
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example           # Environment variable template
│   └── DATABASE.md            # Database schema documentation
│
├── frontend/
│   ├── public/                # Static assets (images, icons)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── context/           # Global state (cart, auth, theme)
│   │   ├── services/          # API client & data fetching
│   │   ├── App.jsx            # Root application component
│   │   └── main.jsx           # Vite entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## 📡 API Reference

Base URL: `http://localhost:8001/api`

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | List all products (supports query filters) |
| `GET` | `/products/{id}` | Get single product details |
| `GET` | `/products/categories` | List all product categories |
| `POST` | `/products` | Create product *(admin)* |
| `PUT` | `/products/{id}` | Update product *(admin)* |
| `DELETE` | `/products/{id}` | Delete product *(admin)* |

### Query Parameters (Filtering)

```
GET /api/products?category=laptops&brand=Apple&min_price=500&max_price=2000&sort=price_asc
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category (e.g., `phones`, `laptops`, `accessories`) |
| `brand` | string | Filter by manufacturer |
| `min_price` | number | Minimum price threshold |
| `max_price` | number | Maximum price threshold |
| `search` | string | Full-text search on name and description |
| `sort` | string | Sort order: `price_asc`, `price_desc`, `newest` |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/orders` | List user orders |
| `GET` | `/orders/{id}` | Get order details & tracking |
| `POST` | `/orders` | Place a new order |
| `PATCH` | `/orders/{id}/status` | Update order status *(admin)* |

### Users & Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new account |
| `POST` | `/auth/login` | Authenticate and receive token |
| `GET` | `/users/me` | Get current user profile |
| `PUT` | `/users/me` | Update profile credentials |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cart` | Retrieve current cart |
| `POST` | `/cart/items` | Add item to cart |
| `PUT` | `/cart/items/{id}` | Update item quantity |
| `DELETE` | `/cart/items/{id}` | Remove item from cart |

---

## 📜 Available Scripts

### Frontend (`frontend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across the codebase |

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `uvicorn server:app --reload` | Start dev server with auto-reload |
| `python seed_database.py` | Seed database with sample data |
| `python seed_database.py --purge-all` | Purge all collections and reseed |

---

## 🌐 Deployment

### Frontend (Vite → Static Hosting)

Build the production bundle and deploy to Vercel, Netlify, or GitHub Pages:

```bash
cd frontend
npm run build
```

Set `VITE_API_URL` to your production API URL in the hosting platform's environment settings.

### Backend (FastAPI)

Deploy with Docker, Railway, Render, or any ASGI-compatible host:

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001
```

Ensure production environment variables (`MONGO_URL`, `SECRET_KEY`, `CORS_ORIGINS`) are configured on the host.

### Recommended Production Checklist

- [ ] Set strong `SECRET_KEY` and rotate periodically
- [ ] Restrict `CORS_ORIGINS` to your deployed frontend domain
- [ ] Enable HTTPS on both frontend and backend
- [ ] Use a managed database (MongoDB Atlas, AWS RDS, etc.)
- [ ] Configure rate limiting on auth and checkout endpoints
- [ ] Set up CI/CD pipeline (GitHub Actions recommended)

---

## 🤝 Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add: brief description of change"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request with a clear summary and test plan

Please maintain consistent code style, add meaningful commit messages, and update documentation when introducing new endpoints or environment variables.

---

## 👤 Author

**Anuganti Vijay Kumar**

Python Developer & Aspiring Full-Stack Web Developer specializing in React, Python (FastAPI / Dash / Flask), and structured database systems.

- **GitHub:** [@your-github-username](https://github.com/your-github-username)
- **LinkedIn:** [Anuganti Vijay Kumar](https://linkedin.com/in/your-profile)
- **Email:** your.email@example.com

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ using React, Vite, FastAPI, and modern web technologies.
</p>
"# my-portfolio" 
