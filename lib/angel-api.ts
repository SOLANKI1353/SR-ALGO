/**
 * Client-side helpers for live market data.
 * - serverLogin(clientId, pin) => calls server POST /api/angel/login to create session (server connects to SmartAPI)
 * - fetchLTP(symbol) => calls server GET /api/angel/ltp?symbol=...
 * - connectFeedWS(url) => connect to server-side websocket /ws to receive forwarded ticks
 *
 * Usage:
 *   await serverLogin(...)
 *   const ws = connectFeedWS(); // receives messages forwarded from SmartAPI feed
 *   ws.onmessage = (e) => { console.log('tick', e.data); }
 *   // To ask the server to subscribe to symbols via ws:
 *   ws.send(JSON.stringify({ type: 'subscribe', symbols: ['NSE:RELIANCE'] }));
 */

export async function fetchLTP(symbol: string) {
  try {
    const resp = await fetch(`/api/angel/ltp?symbol=${encodeURIComponent(symbol)}`);
    const j = await resp.json();
    if (!j.ok) throw new Error(j.error || 'no-ok');
    return j.ltp;
  } catch (err) {
    console.error('fetchLTP error', err);
    throw err;
  }
}

export async function serverLogin(clientId?: string, pin?: string, totp?: string) {
  const resp = await fetch('/api/angel/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId, pin, totp })
  });
  return resp.json();
}

export function connectFeedWS() {
  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  const host = location.host;
  const ws = new WebSocket(`${protocol}://${host}/ws`);
  return ws;
}
