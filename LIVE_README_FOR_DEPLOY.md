# Live-Ready Instructions (modified by assistant)
This project has been updated to include a small server-side proxy that integrates with Angel One SmartAPI.
Follow these steps to run locally and enable live market data.

## Steps to run locally
1. Go to `server_proxy` folder:
   ```bash
   cd server_proxy
   ```
2. Copy `.env.example` to `.env` and fill your SmartAPI credentials:
   - `SMARTAPI_KEY` (from SmartAPI developer portal)
   - `ANGEL_CLIENT_ID` (your angel client code)
   - `ANGEL_PIN` (your password/pin)
   - `TOTP_IF_REQUIRED` if your account needs TOTP
   - `PORT` (optional, default 4000)
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the proxy server:
   ```bash
   npm start
   ```
5. Start your frontend (project root) as you normally do (e.g. `npm run dev`).
6. Frontend code now calls `/api/angel/ltp` and `/api/angel/login` endpoints on the same host — ensure your frontend dev server proxies `/api` to the server_proxy (you can use `http-proxy-middleware` or run both services under reverse proxy).

## Notes
- This scaffold uses `smartapi-javascript` SDK. Consult SmartAPI docs for exact session and websocket usage.
- For production deploy: host `server_proxy` on a server (Railway/Render/Vercel serverless functions) and set environment variables in the host dashboard.

## WebSocket forwarding
1. Call POST /api/angel/login to create session and automatically establish feed connection.
2. Connect your frontend to ws://<host>:<port>/ws (or wss if HTTPS).
3. To subscribe to symbols via websocket, send JSON: { type: 'subscribe', symbols: ['NSE:RELIANCE'] } or call POST /api/angel/subscribe.
