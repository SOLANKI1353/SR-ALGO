
"use client"
import { useState } from "react"

export function AngelLogin() {
  const [apiKey, setApiKey] = useState("")
  const [clientId, setClientId] = useState("")
  const [pin, setPin] = useState("")
  const [totp, setTotp] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: any) {
    e?.preventDefault()
    setMessage(null)
    if (!apiKey || !clientId) {
      setMessage("API Key and Client ID are required.")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/angel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, clientId, pin, totp })
      })
      const data = await res.json().catch(()=>({}))
      if (res.ok) {
        setMessage("✅ Login successful. Session created.")
      } else {
        setMessage("❌ Login failed: " + (data?.error || data?.message || res.statusText || "Unknown error"))
      }
    } catch (err: any) {
      setMessage("⚠️ Network/error: " + (err?.message || String(err)))
    } finally {
      setLoading(false)
    }
  }

  async function testLiveData() {
    setMessage("Checking live data endpoints...")
    try {
      const tryEndpoints = ["/api/health","/server_proxy","/api/ping","/api/angel/status","/server_proxy/ping"]
      for (const ep of tryEndpoints) {
        try {
          const r = await fetch(ep, { method: "GET" })
          if (r.ok) {
            setMessage("Live data reachable at " + ep)
            return
          }
        } catch(e){/*ignore*/}
      }
      setMessage("Live data not reachable from browser. Ensure server proxy is running and NEXT_PUBLIC_PROXY_URL is set if required.")
    } catch (e:any) {
      setMessage("Error while testing live data: " + e?.message)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h3 className="text-lg font-semibold mb-2">Angel / Broker Login</h3>
      <form onSubmit={handleLogin} className="space-y-2">
        <div>
          <label className="block text-sm">API Key</label>
          <input value={apiKey} onChange={e=>setApiKey(e.target.value)} className="w-full p-2 rounded border" />
        </div>
        <div>
          <label className="block text-sm">Client ID</label>
          <input value={clientId} onChange={e=>setClientId(e.target.value)} className="w-full p-2 rounded border" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm">PIN</label>
            <input value={pin} onChange={e=>setPin(e.target.value)} className="w-full p-2 rounded border" />
          </div>
          <div>
            <label className="block text-sm">TOTP / MFA</label>
            <input value={totp} onChange={e=>setTotp(e.target.value)} className="w-full p-2 rounded border" />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 rounded bg-primary text-primary-foreground" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button type="button" onClick={testLiveData} className="px-4 py-2 rounded border">Test Live Data</button>
        </div>
      </form>
      {message && <div className="mt-3 p-2 rounded bg-muted text-muted-foreground">{message}</div>}
      <div className="mt-3 text-sm text-muted-foreground">
        Tip: If login keeps failing, check server_proxy/.env has ANGEL_CLIENT_ID, ANGEL_PIN and SMARTAPI_KEY and that server_proxy is running (node server_proxy/index.js).
      </div>
    </div>
  )
}
