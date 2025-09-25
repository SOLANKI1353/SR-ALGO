"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, Target, Clock, TrendingUp, BarChart3, PieChart, Activity, Zap, TrendingDown } from "lucide-react"
import { FibonacciTool } from "./fibonacci-tool"
import { AdvanceDeclineTool } from "./advance-decline-tool"
import { IntradayDashboard } from "./intraday-dashboard"
import { IntradayScanner } from "./quick-actions/intraday-scanner"
import { BreakoutAlerts } from "./quick-actions/breakout-alerts"
import { VolumeSurge } from "./quick-actions/volume-surge"
import { GapAnalysis } from "./quick-actions/gap-analysis"
import { OptionChainAnalyzer } from "./trading-tools/option-chain-analyzer"
import { PositionCalculator } from "./trading-tools/position-calculator"
import { SupportResistance } from "./trading-tools/support-resistance"
import { MarketTimer } from "./trading-tools/market-timer"
import { SwingAnalyzer } from "./trading-tools/swing-analyzer"
import { VolatilityTracker } from "./trading-tools/volatility-tracker"

export function TradingTools() {
  const [activeTool, setActiveTool] = useState<string | null>(null)

  const tools = [
    {
      name: "Intraday Dashboard",
      description: "Top Gainers, Losers, 52W High/Low, Volume Shockers with AI signals",
      icon: Activity,
      status: "new",
      users: "2.8k",
      id: "intraday-dashboard",
    },
    {
      name: "Fibonacci AI Signals",
      description: "Generate AI-powered entry/exit signals using Fibonacci levels",
      icon: TrendingDown,
      status: "new",
      users: "1.2k",
      id: "fibonacci",
    },
    {
      name: "Advanced Decline Analysis",
      description: "Index-wise advance decline ratio with detailed stock performance",
      icon: BarChart3,
      status: "new",
      users: "856",
      id: "advance-decline",
    },
    {
      name: "Option Chain Analyzer",
      description: "Analyze option chain data with real-time Greeks",
      icon: BarChart3,
      status: "active",
      users: "2.4k",
      id: "option-chain",
    },
    {
      name: "Position Size Calculator",
      description: "Calculate optimal position size based on risk",
      icon: Calculator,
      status: "active",
      users: "1.8k",
      id: "position-calc",
    },
    {
      name: "Support & Resistance",
      description: "Identify key support and resistance levels",
      icon: Target,
      status: "active",
      users: "3.2k",
      id: "support-resistance",
    },
    {
      name: "Market Timer",
      description: "Track market hours and session timings",
      icon: Clock,
      status: "active",
      users: "956",
      id: "market-timer",
    },
    {
      name: "Swing Analyzer",
      description: "Identify swing trading opportunities",
      icon: TrendingUp,
      status: "beta",
      users: "445",
      id: "swing-analyzer",
    },
    {
      name: "Volatility Tracker",
      description: "Monitor market volatility in real-time",
      icon: Activity,
      status: "active",
      users: "1.2k",
      id: "volatility-tracker",
    },
  ]

  const quickActions = [
    { name: "Intraday Scanner", action: "Scan Now", color: "bg-blue-600" },
    { name: "Breakout Alerts", action: "Setup Alert", color: "bg-green-600" },
    { name: "Volume Surge", action: "Monitor", color: "bg-purple-600" },
    { name: "Gap Analysis", action: "Analyze", color: "bg-orange-600" },
  ]

  const handleLaunchTool = (toolId: string) => {
    setActiveTool(toolId)
  }

  const handleBackToTools = () => {
    setActiveTool(null)
  }

  const handleQuickAction = (actionId: string) => {
    setActiveTool(actionId)
  }

  if (activeTool === "intraday-dashboard") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Intraday Trading Dashboard</h2>
        </div>
        <IntradayDashboard />
      </div>
    )
  }

  if (activeTool === "fibonacci") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Fibonacci AI Signal Generator</h2>
        </div>
        <FibonacciTool />
      </div>
    )
  }

  if (activeTool === "advance-decline") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Advanced Decline Analysis</h2>
        </div>
        <AdvanceDeclineTool />
      </div>
    )
  }

  if (activeTool === "intraday-scanner") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Intraday Scanner</h2>
        </div>
        <IntradayScanner />
      </div>
    )
  }

  if (activeTool === "breakout-alerts") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Breakout Alerts</h2>
        </div>
        <BreakoutAlerts />
      </div>
    )
  }

  if (activeTool === "volume-surge") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Volume Surge Monitor</h2>
        </div>
        <VolumeSurge />
      </div>
    )
  }

  if (activeTool === "gap-analysis") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Gap Analysis</h2>
        </div>
        <GapAnalysis />
      </div>
    )
  }

  if (activeTool === "option-chain") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Option Chain Analyzer</h2>
        </div>
        <OptionChainAnalyzer />
      </div>
    )
  }

  if (activeTool === "position-calc") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Position Size Calculator</h2>
        </div>
        <PositionCalculator />
      </div>
    )
  }

  if (activeTool === "support-resistance") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Support & Resistance</h2>
        </div>
        <SupportResistance />
      </div>
    )
  }

  if (activeTool === "market-timer") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Market Timer</h2>
        </div>
        <MarketTimer />
      </div>
    )
  }

  if (activeTool === "swing-analyzer") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Swing Analyzer</h2>
        </div>
        <SwingAnalyzer />
      </div>
    )
  }

  if (activeTool === "volatility-tracker") {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToTools}>
            ← Back to Tools
          </Button>
          <h2 className="text-2xl font-bold">Volatility Tracker</h2>
        </div>
        <VolatilityTracker />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.name}
                className={`${action.color} hover:opacity-90 h-20 flex-col space-y-2`}
                onClick={() => handleQuickAction(action.name.toLowerCase().replace(" ", "-"))}
              >
                <div className="font-medium">{action.name}</div>
                <div className="text-xs opacity-90">{action.action}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Card key={tool.name} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </div>
                  </div>
                  <Badge variant={tool.status === "new" ? "default" : tool.status === "beta" ? "secondary" : "outline"}>
                    {tool.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">{tool.users} users</div>
                  <Button size="sm" onClick={() => handleLaunchTool(tool.id)}>
                    Launch Tool
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Option Chain Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5" />
            <span>Option Chain - NIFTY</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-sm font-medium mb-2">
            <div>Strike</div>
            <div>CE OI</div>
            <div>CE LTP</div>
            <div className="text-center">Strike Price</div>
            <div>PE LTP</div>
            <div>PE OI</div>
            <div>PCR</div>
          </div>
          {[24200, 24250, 24300, 24350, 24400].map((strike) => (
            <div key={strike} className="grid grid-cols-7 gap-2 text-sm py-2 border-b">
              <div className="font-medium">{strike}</div>
              <div className="text-green-600">45.2k</div>
              <div>125.50</div>
              <div className="text-center font-bold">{strike}</div>
              <div>89.75</div>
              <div className="text-red-600">38.7k</div>
              <div>0.86</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
