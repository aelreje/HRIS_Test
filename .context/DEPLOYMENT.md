# Deployment & Infrastructure

## 🚀 Frontend (Vercel)
- **Root Directory:** `frontend` (Required in Vercel Settings).
- **Build Command:** `npm run build`.
- **Framework Preset:** `Vite`.
- **SPA Routing:** Configured via `vercel.json` to rewrite all paths to `index.html`.

## 🛰️ Backend (HelioHost)
- **API URL:** `https://lpzndr.helioho.st/hris/api/`
- **CORS:** Handled by `api/middleware/cors.php`.
- **Rewrite:** Vercel proxies `/api/*` requests to this URL.

## 🔑 Environment Variables
| Variable | Development Value | Production Value |
| :--- | :--- | :--- |
| `VITE_API_URL` | `http://localhost/HRIS_Test/api` | `/api` |
| `DB_HOST` | `localhost` | (Cloud DB Host) |
