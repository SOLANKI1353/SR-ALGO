"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  Volume2,
  Target,
  Zap,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react"

interface IntradayStock {
  symbol: string
  name: string
  price: number
  change: number
  percent: string
  volume: string
  avgVolume: string
  volumeRatio: number
  signal: "BUY" | "SELL" | "HOLD"
  confidence: number
  entry: number
  stopLoss: number
  target: number
  reasoning: string
  positive: boolean
  high52w?: number
  low52w?: number
  distanceFrom52wHigh?: string
  distanceFrom52wLow?: string
}

interface IntradayData {
  topGainers: IntradayStock[]
  topLosers: IntradayStock[]
  week52High: IntradayStock[]
  week52Low: IntradayStock[]
  volumeShockers: IntradayStock[]
}

export function IntradayDashboard() {
  const [activeCategory, setActiveCategory] = useState<keyof IntradayData>("topGainers")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const intradayData: IntradayData = {
    topGainers: [
      {
        symbol: "TATASTEEL",
        name: "Tata Steel Limited",
        price: 145.5,
        change: 12.3,
        percent: "+9.24%",
        volume: "8.5M",
        avgVolume: "3.2M",
        volumeRatio: 2.66,
        signal: "BUY",
        confidence: 87,
        entry: 145.5,
        stopLoss: 138.2,
        target: 158.75,
        reasoning: "Strong breakout above resistance with high volume. Steel sector showing momentum.",
        positive: true,
      },
      {
        symbol: "JSWSTEEL",
        name: "JSW Steel Limited",
        price: 920.75,
        change: 68.25,
        percent: "+8.01%",
        volume: "4.2M",
        avgVolume: "1.8M",
        volumeRatio: 2.33,
        signal: "BUY",
        confidence: 82,
        entry: 920.75,
        stopLoss: 885.4,
        target: 975.2,
        reasoning: "Bullish momentum with institutional buying. Metal sector outperforming.",
        positive: true,
      },
      {
        symbol: "IRCTC",
        name: "Indian Railway Catering",
        price: 850.3,
        change: 95.8,
        percent: "+12.70%",
        volume: "12.5M",
        avgVolume: "2.1M",
        volumeRatio: 5.95,
        signal: "HOLD",
        confidence: 65,
        entry: 850.3,
        stopLoss: 795.5,
        target: 920.85,
        reasoning: "Parabolic move, wait for pullback. High volume suggests more upside possible.",
        positive: true,
      },
      {
        symbol: "ADANIPORTS",
        name: "Adani Ports & SEZ",
        price: 1420.6,
        change: 95.4,
        percent: "+7.20%",
        volume: "6.8M",
        avgVolume: "2.5M",
        volumeRatio: 2.72,
        signal: "BUY",
        confidence: 79,
        entry: 1420.6,
        stopLoss: 1365.8,
        target: 1485.25,
        reasoning: "Infrastructure play with strong fundamentals. Good risk-reward setup.",
        positive: true,
      },
      {
        symbol: "COALINDIA",
        name: "Coal India Limited",
        price: 485.9,
        change: 32.15,
        percent: "+7.09%",
        volume: "15.2M",
        avgVolume: "8.5M",
        volumeRatio: 1.79,
        signal: "BUY",
        confidence: 74,
        entry: 485.9,
        stopLoss: 465.2,
        target: 515.75,
        reasoning: "PSU momentum with dividend yield support. Energy sector rotation.",
        positive: true,
      },
    ],
    topLosers: [
      {
        symbol: "HDFCBANK",
        name: "HDFC Bank Limited",
        price: 1680.25,
        change: -85.75,
        percent: "-4.86%",
        volume: "8.2M",
        avgVolume: "4.1M",
        volumeRatio: 2.0,
        signal: "SELL",
        confidence: 81,
        entry: 1680.25,
        stopLoss: 1715.8,
        target: 1625.4,
        reasoning: "Banking sector under pressure. Technical breakdown below key support.",
        positive: false,
      },
      {
        symbol: "ICICIBANK",
        name: "ICICI Bank Limited",
        price: 1250.4,
        change: -58.6,
        percent: "-4.48%",
        volume: "6.5M",
        avgVolume: "3.8M",
        volumeRatio: 1.71,
        signal: "SELL",
        confidence: 76,
        entry: 1250.4,
        stopLoss: 1275.9,
        target: 1205.85,
        reasoning: "Weak quarterly results impact. Banking index showing weakness.",
        positive: false,
      },
      {
        symbol: "RBLBANK",
        name: "RBL Bank Limited",
        price: 285.15,
        change: -25.35,
        percent: "-8.17%",
        volume: "12.8M",
        avgVolume: "4.2M",
        volumeRatio: 3.05,
        signal: "SELL",
        confidence: 88,
        entry: 285.15,
        stopLoss: 295.8,
        target: 265.5,
        reasoning: "Regulatory concerns and asset quality issues. High volume selling.",
        positive: false,
      },
      {
        symbol: "YESBANK",
        name: "Yes Bank Limited",
        price: 18.45,
        change: -1.25,
        percent: "-6.35%",
        volume: "45.2M",
        avgVolume: "25.8M",
        volumeRatio: 1.75,
        signal: "HOLD",
        confidence: 45,
        entry: 18.45,
        stopLoss: 17.2,
        target: 19.85,
        reasoning: "Volatile stock with mixed signals. Wait for clear direction.",
        positive: false,
      },
      {
        symbol: "DELTACORP",
        name: "Delta Corp Limited",
        price: 180.3,
        change: -15.7,
        percent: "-8.01%",
        volume: "8.5M",
        avgVolume: "3.2M",
        volumeRatio: 2.66,
        signal: "SELL",
        confidence: 72,
        entry: 180.3,
        stopLoss: 188.5,
        target: 165.8,
        reasoning: "Gaming sector facing regulatory headwinds. Technical breakdown.",
        positive: false,
      },
    ],
    week52High: [
      {
        symbol: "RELIANCE",
        name: "Reliance Industries",
        price: 2847.5,
        change: 45.2,
        percent: "+1.61%",
        volume: "4.2M",
        avgVolume: "3.5M",
        volumeRatio: 1.2,
        high52w: 2856.75,
        distanceFrom52wHigh: "-0.32%",
        signal: "BUY",
        confidence: 85,
        entry: 2847.5,
        stopLoss: 2785.2,
        target: 2925.8,
        reasoning: "Near 52-week high with strong fundamentals. Oil-to-chemical business momentum.",
        positive: true,
      },
      {
        symbol: "TCS",
        name: "Tata Consultancy Services",
        price: 4250.75,
        change: 285.3,
        percent: "+7.19%",
        volume: "3.8M",
        avgVolume: "2.1M",
        volumeRatio: 1.81,
        high52w: 4259.6,
        distanceFrom52wHigh: "-0.21%",
        signal: "BUY",
        confidence: 91,
        entry: 4250.75,
        stopLoss: 4125.4,
        target: 4385.9,
        reasoning: "IT sector leader hitting new highs. Strong Q3 results and guidance.",
        positive: true,
      },
      {
        symbol: "INFY",
        name: "Infosys Limited",
        price: 1789.9,
        change: 23.5,
        percent: "+1.33%",
        volume: "2.8M",
        avgVolume: "2.2M",
        volumeRatio: 1.27,
        high52w: 1795.25,
        distanceFrom52wHigh: "-0.30%",
        signal: "BUY",
        confidence: 78,
        entry: 1789.9,
        stopLoss: 1745.6,
        target: 1845.75,
        reasoning: "IT major near 52-week high. Digital transformation demand strong.",
        positive: true,
      },
      {
        symbol: "HCLTECH",
        name: "HCL Technologies",
        price: 1685.4,
        change: 42.8,
        percent: "+2.61%",
        volume: "1.9M",
        avgVolume: "1.5M",
        volumeRatio: 1.27,
        high52w: 1689.75,
        distanceFrom52wHigh: "-0.26%",
        signal: "BUY",
        confidence: 82,
        entry: 1685.4,
        stopLoss: 1635.9,
        target: 1745.2,
        reasoning: "Strong execution and client wins. IT services demand robust.",
        positive: true,
      },
      {
        symbol: "WIPRO",
        name: "Wipro Limited",
        price: 585.75,
        change: 18.25,
        percent: "+3.22%",
        volume: "4.5M",
        avgVolume: "3.2M",
        volumeRatio: 1.41,
        high52w: 587.9,
        distanceFrom52wHigh: "-0.37%",
        signal: "HOLD",
        confidence: 68,
        entry: 585.75,
        stopLoss: 565.4,
        target: 615.8,
        reasoning: "Near highs but momentum slowing. Wait for clear breakout.",
        positive: true,
      },
    ],
    week52Low: [
      {
        symbol: "PAYTM",
        name: "One 97 Communications",
        price: 425.6,
        change: 28.9,
        percent: "+7.29%",
        volume: "18.5M",
        avgVolume: "12.2M",
        volumeRatio: 1.52,
        low52w: 310.0,
        distanceFrom52wLow: "+37.29%",
        signal: "BUY",
        confidence: 73,
        entry: 425.6,
        stopLoss: 395.8,
        target: 475.25,
        reasoning: "Bounce from 52-week low levels. Fintech sector showing signs of recovery.",
        positive: true,
      },
      {
        symbol: "ZOMATO",
        name: "Zomato Limited",
        price: 185.3,
        change: 12.45,
        percent: "+7.20%",
        volume: "25.8M",
        avgVolume: "18.5M",
        volumeRatio: 1.39,
        low52w: 48.8,
        distanceFrom52wLow: "+279.71%",
        signal: "BUY",
        confidence: 79,
        entry: 185.3,
        stopLoss: 172.4,
        target: 205.85,
        reasoning: "Strong recovery from lows. Food delivery business improving profitability.",
        positive: true,
      },
      {
        symbol: "NYKAA",
        name: "FSN E-Commerce Ventures",
        price: 185.75,
        change: 8.9,
        percent: "+5.04%",
        volume: "8.2M",
        avgVolume: "5.8M",
        volumeRatio: 1.41,
        low52w: 112.52,
        distanceFrom52wLow: "+65.11%",
        signal: "HOLD",
        confidence: 62,
        entry: 185.75,
        stopLoss: 172.3,
        target: 205.4,
        reasoning: "E-commerce recovery play. Beauty segment showing growth.",
        positive: true,
      },
      {
        symbol: "POLICYBZR",
        name: "PB Fintech Limited",
        price: 1285.4,
        change: 65.8,
        percent: "+5.39%",
        volume: "2.8M",
        avgVolume: "1.9M",
        volumeRatio: 1.47,
        low52w: 512.1,
        distanceFrom52wLow: "+151.01%",
        signal: "BUY",
        confidence: 76,
        entry: 1285.4,
        stopLoss: 1235.6,
        target: 1365.9,
        reasoning: "Insurance tech platform gaining traction. Strong recovery from lows.",
        positive: true,
      },
      {
        symbol: "CARTRADE",
        name: "CarTrade Tech Limited",
        price: 685.9,
        change: 42.3,
        percent: "+6.57%",
        volume: "1.5M",
        avgVolume: "0.8M",
        volumeRatio: 1.88,
        low52w: 325.75,
        distanceFrom52wLow: "+110.56%",
        signal: "BUY",
        confidence: 71,
        entry: 685.9,
        stopLoss: 645.2,
        target: 745.8,
        reasoning: "Auto tech platform benefiting from used car market growth.",
        positive: true,
      },
    ],
    volumeShockers: [
      {
        symbol: "IRCTC",
        name: "Indian Railway Catering",
        price: 850.3,
        change: 95.8,
        percent: "+12.70%",
        volume: "25.8M",
        avgVolume: "2.1M",
        volumeRatio: 12.29,
        signal: "HOLD",
        confidence: 65,
        entry: 850.3,
        stopLoss: 795.5,
        target: 920.85,
        reasoning: "Massive volume spike on railway budget news. Parabolic move, be cautious.",
        positive: true,
      },
      {
        symbol: "RBLBANK",
        name: "RBL Bank Limited",
        price: 285.15,
        change: -25.35,
        percent: "-8.17%",
        volume: "35.2M",
        avgVolume: "4.2M",
        volumeRatio: 8.38,
        signal: "SELL",
        confidence: 88,
        entry: 285.15,
        stopLoss: 295.8,
        target: 265.5,
        reasoning: "Huge selling volume on regulatory concerns. More downside likely.",
        positive: false,
      },
      {
        symbol: "YESBANK",
        name: "Yes Bank Limited",
        price: 18.45,
        change: -1.25,
        percent: "-6.35%",
        volume: "125.8M",
        avgVolume: "25.8M",
        volumeRatio: 4.88,
        signal: "HOLD",
        confidence: 45,
        entry: 18.45,
        stopLoss: 17.2,
        target: 19.85,
        reasoning: "High volume but mixed signals. Retail interest high but fundamentals weak.",
        positive: false,
      },
      {
        symbol: "SUZLON",
        name: "Suzlon Energy Limited",
        price: 58.75,
        change: 4.85,
        percent: "+9.00%",
        volume: "185.5M",
        avgVolume: "45.2M",
        volumeRatio: 4.1,
        signal: "BUY",
        confidence: 72,
        entry: 58.75,
        stopLoss: 54.2,
        target: 65.8,
        reasoning: "Renewable energy theme with massive retail participation. Momentum play.",
        positive: true,
      },
      {
        symbol: "ADANIPOWER",
        name: "Adani Power Limited",
        price: 685.4,
        change: 45.9,
        percent: "+7.18%",
        volume: "28.5M",
        avgVolume: "8.2M",
        volumeRatio: 3.48,
        signal: "BUY",
        confidence: 69,
        entry: 685.4,
        stopLoss: 645.8,
        target: 735.6,
        reasoning: "Power sector momentum with high volume participation. Energy theme play.",
        positive: true,
      },
    ],
  }

  const categories = [
    { key: "topGainers" as const, label: "Top Gainers", icon: TrendingUp, color: "text-green-600" },
    { key: "topLosers" as const, label: "Top Losers", icon: TrendingDown, color: "text-red-600" },
    { key: "week52High" as const, label: "52W High", icon: ArrowUpRight, color: "text-blue-600" },
    { key: "week52Low" as const, label: "52W Low", icon: ArrowDownRight, color: "text-purple-600" },
    { key: "volumeShockers" as const, label: "Volume Shockers", icon: Volume2, color: "text-orange-600" },
  ]

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLastUpdate(new Date())
    setIsLoading(false)
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "BUY":
        return "bg-green-500 text-white"
      case "SELL":
        return "bg-red-500 text-white"
      default:
        return "bg-yellow-500 text-white"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "from-green-500 to-emerald-600"
    if (confidence >= 60) return "from-yellow-500 to-orange-500"
    return "from-red-500 to-pink-600"
  }

  const currentStocks = intradayData[activeCategory]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Intraday Trading Dashboard</h2>
          <p className="text-muted-foreground">Real-time market movers with AI-powered trading signals</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</div>
          <Button onClick={handleRefresh} disabled={isLoading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Category Selection */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.key}
              variant={activeCategory === category.key ? "default" : "outline"}
              onClick={() => setActiveCategory(category.key)}
              className="flex items-center space-x-2"
            >
              <Icon className={`h-4 w-4 ${activeCategory === category.key ? "text-white" : category.color}`} />
              <span>{category.label}</span>
              <Badge variant="secondary" className="text-xs">
                {intradayData[category.key].length}
              </Badge>
            </Button>
          )
        })}
      </div>

      {/* Stock Cards */}
      <div className="grid gap-4">
        {currentStocks.map((stock, index) => (
          <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="font-bold text-lg">{stock.symbol}</div>
                  <Badge className={getSignalColor(stock.signal)}>{stock.signal}</Badge>
                  {stock.distanceFrom52wHigh && (
                    <Badge variant="outline" className="text-xs">
                      {stock.distanceFrom52wHigh} from 52W High
                    </Badge>
                  )}
                  {stock.distanceFrom52wLow && (
                    <Badge variant="outline" className="text-xs">
                      {stock.distanceFrom52wLow} from 52W Low
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg">₹{stock.price.toFixed(2)}</div>
                  <div className={`text-sm font-medium ${stock.positive ? "text-green-600" : "text-red-600"}`}>
                    {stock.percent}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{stock.name}</div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Confidence Bar */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">AI Confidence:</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${getConfidenceColor(stock.confidence)} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${stock.confidence}%` }}
                  ></div>
                </div>
                <span className="font-bold text-sm">{stock.confidence}%</span>
              </div>

              {/* Volume Info */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Volume</div>
                  <div className="font-medium">{stock.volume}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Avg Volume</div>
                  <div className="font-medium">{stock.avgVolume}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Volume Ratio</div>
                  <div className={`font-bold ${stock.volumeRatio > 2 ? "text-orange-600" : "text-muted-foreground"}`}>
                    {stock.volumeRatio.toFixed(2)}x
                  </div>
                </div>
              </div>

              {/* Trade Setup */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-1 mb-1">
                    <TrendingUp className="h-3 w-3 text-blue-600" />
                    <span className="text-xs font-medium">Entry</span>
                  </div>
                  <div className="font-mono text-sm">₹{stock.entry.toFixed(2)}</div>
                </div>

                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                  <div className="flex items-center space-x-1 mb-1">
                    <Activity className="h-3 w-3 text-red-600" />
                    <span className="text-xs font-medium">Stop Loss</span>
                  </div>
                  <div className="font-mono text-sm">₹{stock.stopLoss.toFixed(2)}</div>
                </div>

                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-1 mb-1">
                    <Target className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium">Target</span>
                  </div>
                  <div className="font-mono text-sm">₹{stock.target.toFixed(2)}</div>
                </div>
              </div>

              {/* AI Reasoning */}
              <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start space-x-2">
                  <Zap className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-yellow-800 dark:text-yellow-200 text-sm mb-1">AI Analysis</div>
                    <div className="text-xs text-yellow-700 dark:text-yellow-300">{stock.reasoning}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  Execute Trade
                </Button>
                <Button size="sm" variant="outline">
                  Set Alert
                </Button>
                <Button size="sm" variant="outline">
                  View Chart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Market Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {categories.map((category) => {
              const stocks = intradayData[category.key]
              const buySignals = stocks.filter((s) => s.signal === "BUY").length
              const sellSignals = stocks.filter((s) => s.signal === "SELL").length
              const Icon = category.icon

              return (
                <div key={category.key} className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Icon className={`h-4 w-4 ${category.color}`} />
                    <span className="font-medium">{category.label}</span>
                  </div>
                  <div className="text-2xl font-bold">{stocks.length}</div>
                  <div className="text-xs text-muted-foreground">
                    {buySignals} BUY • {sellSignals} SELL
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
