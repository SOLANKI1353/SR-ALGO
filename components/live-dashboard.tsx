"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { angelAPI, type MarketData, type PortfolioData } from "@/lib/angel-api"
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, LogOut } from "lucide-react"

interface LiveDashboardProps {
  onLogout: () => void
}

export function LiveDashboard({ onLogout }: LiveDashboardProps) {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch market data for key indices
        const indices = ["NIFTY", "BANKNIFTY", "SENSEX", "FINNIFTY"]
        const marketResponse = await angelAPI.getMarketData(indices)
        setMarketData(marketResponse)

        // Fetch portfolio data
        const portfolioResponse = await angelAPI.getPortfolio()
        setPortfolio(portfolioResponse)

        setLastUpdate(new Date())
      } catch (error) {
        console.error("[v0] Failed to fetch live data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Set up real-time updates every 5 seconds
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    angelAPI.logout()
    onLogout()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Activity className="h-8 w-8 animate-pulse mx-auto" />
          <p>Loading live market data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">SR ALGO Live</h1>
            </div>
            <Badge variant="secondary" className="bg-green-500/10 text-green-500">
              <Activity className="h-3 w-3 mr-1" />
              Live Data Connected
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Market Overview */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Live Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketData.map((data) => (
              <Card key={data.symbol}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{data.symbol}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">₹{data.ltp.toFixed(2)}</div>
                    <div
                      className={`flex items-center space-x-1 text-sm ${
                        data.change >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {data.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span>₹{Math.abs(data.change).toFixed(2)}</span>
                      <span>({data.changePercent.toFixed(2)}%)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>High: ₹{data.high.toFixed(2)}</div>
                      <div>Low: ₹{data.low.toFixed(2)}</div>
                      <div>Open: ₹{data.open.toFixed(2)}</div>
                      <div>Vol: {(data.volume / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Portfolio Overview */}
        {portfolio && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Live Portfolio</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Total Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{portfolio.totalValue.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Total P&L
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${portfolio.totalPnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                    ₹{portfolio.totalPnl.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    P&L %
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${
                      portfolio.totalPnlPercent >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {portfolio.totalPnlPercent.toFixed(2)}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Holdings */}
            <Card>
              <CardHeader>
                <CardTitle>Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolio.holdings.map((holding) => (
                    <div key={holding.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{holding.symbol}</div>
                        <div className="text-sm text-muted-foreground">
                          Qty: {holding.quantity} | Avg: ₹{holding.avgPrice}
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-medium">₹{holding.ltp}</div>
                        <div className={`text-sm ${holding.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                          ₹{holding.pnl} ({holding.pnlPercent.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
