# Portfolio Frontend

React 19 SPA for the personal portfolio. See the **[root README](../README.md)** for full setup, environment variables, API reference, and deployment.

## Quick start

```bash
npm install --legacy-peer-deps   # or: yarn install
cp .env.example .env             # set REACT_APP_BACKEND_URL
npm start                        # http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server (Craco, port 3000) |
| `npm run build` | Production build → `build/` |
| `npm test` | Run tests |

Deployed on **Vercel** with root directory `frontend` (see `vercel.json`).
