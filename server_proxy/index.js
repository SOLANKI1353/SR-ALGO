require('dotenv').config();
const express = require('express');
const SmartApi = require('smartapi-javascript').SmartApi;
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const smart = new SmartApi({ api_key: process.env.SMARTAPI_KEY || '' });

// We'll keep a simple in-memory state for session and ws client
let sessionData = null;
let feedWs = null;
let clients = new Set(); // connected frontend ws clients

// Helper to connect to SmartAPI websocket using feed token
async function connectFeed(feedToken) {
  // close old if exists
  if (feedWs) {
    try { feedWs.close(); } catch(e){/*ignore*/ }
    feedWs = null;
  }
  const wsUrl = `wss://streaming.smartapi.angelbroking.com/v2/stream?feed_token=${feedToken}`;
  console.log('Connecting to SmartAPI feed at', wsUrl);
  feedWs = new WebSocket(wsUrl);

  feedWs.on('open', () => {
    console.log('Connected to SmartAPI feed websocket');
  });

  feedWs.on('message', (data) => {
    // forward raw message to all connected frontend ws clients
    try {
      const msg = data.toString();
      // attempt to parse JSON; if fails send raw
      let payload = msg;
      try { payload = JSON.parse(msg); } catch(e){ payload = msg; }
      const toSend = typeof payload === 'string' ? payload : JSON.stringify(payload);
      clients.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(toSend);
        }
      });
    } catch (err) {
      console.error('Error forwarding feed message', err);
    }
  });

  feedWs.on('close', (code, reason) => {
    console.log('Feed websocket closed', code, reason);
    feedWs = null;
  });

  feedWs.on('error', (err) => {
    console.error('Feed websocket error', err && err.message ? err.message : err);
  });
}

// Generate session (login) using client id and pin (server-side)
app.post('/api/angel/login', async (req, res) => {
  try {
    const client_id = process.env.ANGEL_CLIENT_ID || req.body.clientId;
    const password = process.env.ANGEL_PIN || req.body.pin;
    const totp = process.env.TOTP_IF_REQUIRED || req.body.totp || '';
    if (!client_id || !password) {
      return res.status(400).json({ ok:false, error: 'client id / pin missing in environment or body' });
    }
    const session = await smart.generateSession(client_id, password, totp);
    sessionData = session;
    // If feed token exists, connect feed
    const feedToken = session?.data?.feedToken || session?.data?.feed_token || session?.data?.feedTokenId || null;
    if (feedToken) {
      try {
        await connectFeed(feedToken);
      } catch(e) {
        console.error('connectFeed error', e);
      }
    }
    // Return session to caller
    return res.json({ ok:true, session });
  } catch (err) {
    console.error('login error', err && err.message ? err.message : err);
    return res.status(500).json({ ok:false, error: String(err) });
  }
});

// Subscribe endpoint - instruct feed websocket to subscribe to symbol(s)
app.post('/api/angel/subscribe', async (req, res) => {
  try {
    const { symbols } = req.body;
    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return res.status(400).json({ ok:false, error: 'Provide symbols: ["NSE:RELIANCE"]' });
    }
    if (!feedWs || feedWs.readyState !== WebSocket.OPEN) {
      return res.status(500).json({ ok:false, error: 'Feed websocket not connected. Login first to obtain feed token.' });
    }
    // SmartAPI subscribe message example — adjust payload if your account needs different format
    const subscribePayload = { action: 'subscribe', symbols };
    feedWs.send(JSON.stringify(subscribePayload));
    return res.json({ ok:true, subscribed: symbols });
  } catch (err) {
    console.error('subscribe error', err);
    return res.status(500).json({ ok:false, error: String(err) });
  }
});

// Simple proxy to fetch LTP for a symbol using SDK (REST)
app.get('/api/angel/ltp', async (req, res) => {
  try {
    const symbol = req.query.symbol;
    if (!symbol) return res.status(400).json({ ok:false, error:'symbol query param required, e.g. ?symbol=NSE:RELIANCE' });
    if (smart.getLtp) {
      const ltp = await smart.getLtp(symbol);
      return res.json({ ok:true, ltp });
    } else {
      // fallback to SDK's getLtp or rest
      return res.status(501).json({ ok:false, error: 'smartapi sdk in use does not expose getLtp() in this version. Use REST endpoint implementation.' });
    }
  } catch (err) {
    console.error('ltp error', err && err.message ? err.message : err);
    return res.status(500).json({ ok:false, error: String(err) });
  }
});

// Create HTTP server and attach WebSocket server for frontend clients
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws, req) => {
  console.log('Frontend client connected via /ws');
  clients.add(ws);

  ws.on('message', (message) => {
    // Allow clients to request subscribe via ws too, message should be JSON {type:'subscribe', symbols: [...]}
    try {
      const m = JSON.parse(message.toString());
      if (m.type === 'subscribe' && Array.isArray(m.symbols)) {
        if (feedWs && feedWs.readyState === WebSocket.OPEN) {
          feedWs.send(JSON.stringify({ action: 'subscribe', symbols: m.symbols }));
          ws.send(JSON.stringify({ ok:true, subscribed: m.symbols }));
        } else {
          ws.send(JSON.stringify({ ok:false, error: 'Feed not connected. Login first.' }));
        }
      }
    } catch (e) {
      // ignore parse errors
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Frontend client disconnected');
  });
});

server.listen(PORT, () => {
  console.log('Angel proxy server listening on', PORT);
  console.log('Set SMARTAPI_KEY, ANGEL_CLIENT_ID and ANGEL_PIN in .env and call POST /api/angel/login to create session.');
});
