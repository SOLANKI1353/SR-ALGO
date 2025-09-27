
"use client"
import { useEffect, useState } from "react"

export default function LiveStatus() {
  const [status, setStatus] = useState("Checking...")
  useEffect(() => {
    let mounted = true
    const tryEndpoints = ["/api/health", "/server_proxy", "/api/ping", "/api/angel/status"]
    async function check() {
      for (const ep of tryEndpoints) {
        try {
          const res = await fetch(ep, { method: "GET" })
          if (!mounted) return
          if (res.ok) {
            setStatus("Connected (" + ep + ")")
            return
          }
        } catch (e) {
          // ignore
        }
      }
      if (mounted) setStatus("Offline / proxy not reachable")
    }
    check()
    const id = setInterval(check, 10_000)
    return () => { mounted = false; clearInterval(id) }
  }, [])
  return <div className="live-status" title="Live data connection status">Live Data: {status}</div>
}
