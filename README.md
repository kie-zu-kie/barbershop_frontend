# barbershop_frontend

Frontend barbershop website. This folder is a standalone static frontend. It talks to the Flask API using
`API_BASE_URL`; no Flask templates or backend files are needed to build it.

## Local setup

1. Copy `.env.example` to `.env`.
2. Set `API_BASE_URL` to the backend URL ending in `/api`.
3. Build and serve the static site:

```powershell
npm run build
python -m http.server 8000 --directory dist
```

Open <http://127.0.0.1:8000>.

The backend must allow the exact frontend origin in its `FRONTEND_ORIGINS`
setting. See the backend README for the corresponding API and CORS settings.

For static hosting, set `API_BASE_URL` as a build environment variable and use
`npm run build` as the build command with `dist` as the output directory.
Rebuild after changing `API_BASE_URL`; the build embeds that public API address
in `dist/config.js`.
