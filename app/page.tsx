"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { MarketOverview } from "@/components/market-overview"
import { StockScreener } from "@/components/stock-screener"
import { MarketHeatmap } from "@/components/market-heatmap"
import { FiiDiiData } from "@/components/fii-dii-data"
import { TradingTools } from "@/components/trading-tools"
import { AngelLogin } from "@/components/angel-login"
import { angelAPI, type AngelCredentials } from "@/lib/angel-api"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [marketMode, setMarketMode] = useState<"live" | "demo" | "offline">("offline")

  useEffect(() => {
    const checkAuth = async () => {
      const storedCredentials = localStorage.getItem("angel_credentials")
      const storedMode = localStorage.getItem("market_mode") as "live" | "demo" | "offline"

      if (storedCredentials && storedMode) {
        setMarketMode(storedMode)
        if (storedMode === "live") {
          const credentials = JSON.parse(storedCredentials)
          const success = await angelAPI.authenticate(credentials)
          setIsAuthenticated(success)
        } else {
          // For demo and offline modes, consider authenticated
          setIsAuthenticated(true)
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLoginSuccess = async (credentials: AngelCredentials) => {
    const mode = localStorage.getItem("market_mode") as "live" | "demo" | "offline"
    setMarketMode(mode)

    if (mode === "live") {
      const success = await angelAPI.authenticate(credentials)
      setIsAuthenticated(success)
    } else {
      // For demo and offline modes
      setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("angel_credentials")
    localStorage.removeItem("market_mode")
    setIsAuthenticated(false)
    setMarketMode("offline")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AngelLogin onLoginSuccess={handleLoginSuccess} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <MarketOverview />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarketHeatmap />
              <FiiDiiData />
            </div>
          </div>
        )
      case "screener":
        return <StockScreener />
      case "signals":
        return <StockScreener />
      case "sectors":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MarketHeatmap />
            <FiiDiiData />
          </div>
        )
      case "tools":
        return <TradingTools />
      default:
        return <MarketOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} marketMode={marketMode} onLogout={handleLogout} />
      <main className="container mx-auto px-6 py-8">{renderContent()}</main>
    </div>
  )
}
