/**
 * Client-side helpers for live market data + login.
 */

export type AngelCredentials = {
  clientId: string
  pin: string
  totp?: string
}

export const angelAPI = {
  async authenticate(creds: AngelCredentials): Promise<boolean> {
    try {
      // Call server to create SmartAPI session
      const resp = await fetch("/api/angel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: creds.clientId,
          pin: creds.pin,
          totp: creds.totp
        })
      })
      const data = await resp.json()
      if (!data.ok) throw new Error(data.error || "login failed")
      // Save credentials to localStorage for reuse
      localStorage.setItem("angel_credentials", JSON.stringify(creds))
      return true
    } catch (err) {
      console.error("angelAPI.authenticate error", err)
      return false
    }
  },

  async fetchLTP(symbol: string): Promise<number> {
    const resp = await fetch(`/api/angel/ltp?symbol=${encodeURIComponent(symbol)}`)
    const j = await resp.json()
    if (!j.ok) throw new Error(j.error || "no-ok")
    return j.ltp
  },

  connectFeedWS(): WebSocket {
    const protocol = location.protocol === "https:" ? "wss" : "ws"
    const host = location.host
    return new WebSocket(`${protocol}://${host}/ws`)
  }
}
