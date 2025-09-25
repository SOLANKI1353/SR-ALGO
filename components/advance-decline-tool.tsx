"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Activity, BarChart3, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  percent: string
  volume: string
  marketCap: string
  positive: boolean
}

interface IndexData {
  name: string
  totalStocks: number
  advances: number
  declines: number
  unchanged: number
  advancePercent: number
  declinePercent: number
  volume: string
  topGainers: Stock[]
  topLosers: Stock[]
  allStocks: Stock[]
}

export function AdvanceDeclineTool() {
  const [selectedIndex, setSelectedIndex] = useState<string>("NIFTY 50")
  const [isLoading, setIsLoading] = useState(false)

  const indexData: { [key: string]: IndexData } = {
    "NIFTY 50": {
      name: "NIFTY 50",
      totalStocks: 50,
      advances: 32,
      declines: 16,
      unchanged: 2,
      advancePercent: 64,
      declinePercent: 32,
      volume: "₹45,678 Cr",
      topGainers: [
        {
          symbol: "TATASTEEL",
          name: "Tata Steel",
          price: 145,
          change: 12,
          percent: "+9.03%",
          volume: "8.5M",
          marketCap: "₹1.8L Cr",
          positive: true,
        },
        {
          symbol: "JSWSTEEL",
          name: "JSW Steel",
          price: 920,
          change: 65,
          percent: "+7.60%",
          volume: "3.2M",
          marketCap: "₹2.3L Cr",
          positive: true,
        },
        {
          symbol: "TCS",
          name: "Tata Consultancy Services",
          price: 4250,
          change: 285,
          percent: "+7.19%",
          volume: "2.5M",
          marketCap: "₹15.4L Cr",
          positive: true,
        },
      ],
      topLosers: [
        {
          symbol: "HDFCBANK",
          name: "HDFC Bank",
          price: 1680,
          change: -85,
          percent: "-4.82%",
          volume: "4.2M",
          marketCap: "₹12.8L Cr",
          positive: false,
        },
        {
          symbol: "ICICIBANK",
          name: "ICICI Bank",
          price: 1250,
          change: -58,
          percent: "-4.43%",
          volume: "3.8M",
          marketCap: "₹8.7L Cr",
          positive: false,
        },
        {
          symbol: "AXISBANK",
          name: "Axis Bank",
          price: 1180,
          change: -48,
          percent: "-3.91%",
          volume: "2.9M",
          marketCap: "₹3.6L Cr",
          positive: false,
        },
      ],
      allStocks: [
        {
          symbol: "TATASTEEL",
          name: "Tata Steel",
          price: 145,
          change: 12,
          percent: "+9.03%",
          volume: "8.5M",
          marketCap: "₹1.8L Cr",
          positive: true,
        },
        {
          symbol: "JSWSTEEL",
          name: "JSW Steel",
          price: 920,
          change: 65,
          percent: "+7.60%",
          volume: "3.2M",
          marketCap: "₹2.3L Cr",
          positive: true,
        },
        {
          symbol: "TCS",
          name: "Tata Consultancy Services",
          price: 4250,
          change: 285,
          percent: "+7.19%",
          volume: "2.5M",
          marketCap: "₹15.4L Cr",
          positive: true,
        },
        {
          symbol: "INFY",
          name: "Infosys Limited",
          price: 1820,
          change: 95,
          percent: "+5.51%",
          volume: "3.2M",
          marketCap: "₹7.6L Cr",
          positive: true,
        },
        {
          symbol: "SUNPHARMA",
          name: "Sun Pharmaceutical",
          price: 1680,
          change: 78,
          percent: "+4.87%",
          volume: "1.2M",
          marketCap: "₹4.0L Cr",
          positive: true,
        },
        {
          symbol: "MARUTI",
          name: "Maruti Suzuki",
          price: 12500,
          change: 425,
          percent: "+3.52%",
          volume: "0.9M",
          marketCap: "₹3.8L Cr",
          positive: true,
        },
        {
          symbol: "RELIANCE",
          name: "Reliance Industries",
          price: 2850,
          change: 85,
          percent: "+3.07%",
          volume: "5.2M",
          marketCap: "₹19.3L Cr",
          positive: true,
        },
        {
          symbol: "HDFCBANK",
          name: "HDFC Bank",
          price: 1680,
          change: -85,
          percent: "-4.82%",
          volume: "4.2M",
          marketCap: "₹12.8L Cr",
          positive: false,
        },
        {
          symbol: "ICICIBANK",
          name: "ICICI Bank",
          price: 1250,
          change: -58,
          percent: "-4.43%",
          volume: "3.8M",
          marketCap: "₹8.7L Cr",
          positive: false,
        },
        {
          symbol: "AXISBANK",
          name: "Axis Bank",
          price: 1180,
          change: -48,
          percent: "-3.91%",
          volume: "2.9M",
          marketCap: "₹3.6L Cr",
          positive: false,
        },
      ],
    },
    "NIFTY NEXT 50": {
      name: "NIFTY NEXT 50",
      totalStocks: 50,
      advances: 28,
      declines: 20,
      unchanged: 2,
      advancePercent: 56,
      declinePercent: 40,
      volume: "₹32,450 Cr",
      topGainers: [
        {
          symbol: "ADANIPORTS",
          name: "Adani Ports",
          price: 1420,
          change: 95,
          percent: "+7.17%",
          volume: "4.2M",
          marketCap: "₹2.9L Cr",
          positive: true,
        },
        {
          symbol: "GODREJCP",
          name: "Godrej Consumer",
          price: 1180,
          change: 68,
          percent: "+6.12%",
          volume: "2.1M",
          marketCap: "₹1.2L Cr",
          positive: true,
        },
        {
          symbol: "PIDILITIND",
          name: "Pidilite Industries",
          price: 2850,
          change: 165,
          percent: "+6.15%",
          volume: "1.5M",
          marketCap: "₹1.4L Cr",
          positive: true,
        },
      ],
      topLosers: [
        {
          symbol: "BAJFINANCE",
          name: "Bajaj Finance",
          price: 7200,
          change: -385,
          percent: "-5.08%",
          volume: "1.8M",
          marketCap: "₹4.4L Cr",
          positive: false,
        },
        {
          symbol: "HDFCLIFE",
          name: "HDFC Life Insurance",
          price: 680,
          change: -32,
          percent: "-4.49%",
          volume: "3.2M",
          marketCap: "₹1.4L Cr",
          positive: false,
        },
      ],
      allStocks: [
        {
          symbol: "ADANIPORTS",
          name: "Adani Ports",
          price: 1420,
          change: 95,
          percent: "+7.17%",
          volume: "4.2M",
          marketCap: "₹2.9L Cr",
          positive: true,
        },
        {
          symbol: "GODREJCP",
          name: "Godrej Consumer",
          price: 1180,
          change: 68,
          percent: "+6.12%",
          volume: "2.1M",
          marketCap: "₹1.2L Cr",
          positive: true,
        },
        {
          symbol: "PIDILITIND",
          name: "Pidilite Industries",
          price: 2850,
          change: 165,
          percent: "+6.15%",
          volume: "1.5M",
          marketCap: "₹1.4L Cr",
          positive: true,
        },
        {
          symbol: "BAJFINANCE",
          name: "Bajaj Finance",
          price: 7200,
          change: -385,
          percent: "-5.08%",
          volume: "1.8M",
          marketCap: "₹4.4L Cr",
          positive: false,
        },
        {
          symbol: "HDFCLIFE",
          name: "HDFC Life Insurance",
          price: 680,
          change: -32,
          percent: "-4.49%",
          volume: "3.2M",
          marketCap: "₹1.4L Cr",
          positive: false,
        },
      ],
    },
    "NIFTY MIDCAP 100": {
      name: "NIFTY MIDCAP 100",
      totalStocks: 100,
      advances: 62,
      declines: 35,
      unchanged: 3,
      advancePercent: 62,
      declinePercent: 35,
      volume: "₹28,750 Cr",
      topGainers: [
        {
          symbol: "ZEEL",
          name: "Zee Entertainment",
          price: 285,
          change: 28,
          percent: "+10.89%",
          volume: "12.5M",
          marketCap: "₹27,350 Cr",
          positive: true,
        },
        {
          symbol: "VOLTAS",
          name: "Voltas Limited",
          price: 1650,
          change: 142,
          percent: "+9.42%",
          volume: "3.8M",
          marketCap: "₹54,680 Cr",
          positive: true,
        },
        {
          symbol: "MUTHOOTFIN",
          name: "Muthoot Finance",
          price: 1420,
          change: 118,
          percent: "+9.06%",
          volume: "2.1M",
          marketCap: "₹57,120 Cr",
          positive: true,
        },
      ],
      topLosers: [
        {
          symbol: "BANKBARODA",
          name: "Bank of Baroda",
          price: 245,
          change: -18,
          percent: "-6.84%",
          volume: "8.5M",
          marketCap: "₹1.3L Cr",
          positive: false,
        },
        {
          symbol: "CANBK",
          name: "Canara Bank",
          price: 420,
          change: -28,
          percent: "-6.25%",
          volume: "5.2M",
          marketCap: "₹75,680 Cr",
          positive: false,
        },
      ],
      allStocks: [
        {
          symbol: "ZEEL",
          name: "Zee Entertainment",
          price: 285,
          change: 28,
          percent: "+10.89%",
          volume: "12.5M",
          marketCap: "₹27,350 Cr",
          positive: true,
        },
        {
          symbol: "VOLTAS",
          name: "Voltas Limited",
          price: 1650,
          change: 142,
          percent: "+9.42%",
          volume: "3.8M",
          marketCap: "₹54,680 Cr",
          positive: true,
        },
        {
          symbol: "MUTHOOTFIN",
          name: "Muthoot Finance",
          price: 1420,
          change: 118,
          percent: "+9.06%",
          volume: "2.1M",
          marketCap: "₹57,120 Cr",
          positive: true,
        },
        {
          symbol: "BANKBARODA",
          name: "Bank of Baroda",
          price: 245,
          change: -18,
          percent: "-6.84%",
          volume: "8.5M",
          marketCap: "₹1.3L Cr",
          positive: false,
        },
        {
          symbol: "CANBK",
          name: "Canara Bank",
          price: 420,
          change: -28,
          percent: "-6.25%",
          volume: "5.2M",
          marketCap: "₹75,680 Cr",
          positive: false,
        },
      ],
    },
    "NIFTY SMALLCAP 100": {
      name: "NIFTY SMALLCAP 100",
      totalStocks: 100,
      advances: 58,
      declines: 38,
      unchanged: 4,
      advancePercent: 58,
      declinePercent: 38,
      volume: "₹18,950 Cr",
      topGainers: [
        {
          symbol: "IRCTC",
          name: "Indian Railway Catering",
          price: 850,
          change: 95,
          percent: "+12.58%",
          volume: "8.2M",
          marketCap: "₹68,000 Cr",
          positive: true,
        },
        {
          symbol: "RAILTEL",
          name: "RailTel Corporation",
          price: 420,
          change: 45,
          percent: "+12.00%",
          volume: "4.5M",
          marketCap: "₹8,400 Cr",
          positive: true,
        },
        {
          symbol: "MAZAGON",
          name: "Mazagon Dock Shipbuilders",
          price: 3850,
          change: 385,
          percent: "+11.11%",
          volume: "1.2M",
          marketCap: "₹76,230 Cr",
          positive: true,
        },
      ],
      topLosers: [
        {
          symbol: "RBLBANK",
          name: "RBL Bank",
          price: 285,
          change: -25,
          percent: "-8.06%",
          volume: "6.8M",
          marketCap: "₹16,950 Cr",
          positive: false,
        },
        {
          symbol: "DELTACORP",
          name: "Delta Corp",
          price: 180,
          change: -15,
          percent: "-7.69%",
          volume: "3.2M",
          marketCap: "₹4,680 Cr",
          positive: false,
        },
      ],
      allStocks: [
        {
          symbol: "IRCTC",
          name: "Indian Railway Catering",
          price: 850,
          change: 95,
          percent: "+12.58%",
          volume: "8.2M",
          marketCap: "₹68,000 Cr",
          positive: true,
        },
        {
          symbol: "RAILTEL",
          name: "RailTel Corporation",
          price: 420,
          change: 45,
          percent: "+12.00%",
          volume: "4.5M",
          marketCap: "₹8,400 Cr",
          positive: true,
        },
        {
          symbol: "MAZAGON",
          name: "Mazagon Dock Shipbuilders",
          price: 3850,
          change: 385,
          percent: "+11.11%",
          volume: "1.2M",
          marketCap: "₹76,230 Cr",
          positive: true,
        },
        {
          symbol: "RBLBANK",
          name: "RBL Bank",
          price: 285,
          change: -25,
          percent: "-8.06%",
          volume: "6.8M",
          marketCap: "₹16,950 Cr",
          positive: false,
        },
        {
          symbol: "DELTACORP",
          name: "Delta Corp",
          price: 180,
          change: -15,
          percent: "-7.69%",
          volume: "3.2M",
          marketCap: "₹4,680 Cr",
          positive: false,
        },
      ],
    },
    "NIFTY 500": {
      name: "NIFTY 500",
      totalStocks: 500,
      advances: 285,
      declines: 195,
      unchanged: 20,
      advancePercent: 57,
      declinePercent: 39,
      volume: "₹125,850 Cr",
      topGainers: [
        {
          symbol: "IRCTC",
          name: "Indian Railway Catering",
          price: 850,
          change: 95,
          percent: "+12.58%",
          volume: "8.2M",
          marketCap: "₹68,000 Cr",
          positive: true,
        },
        {
          symbol: "RAILTEL",
          name: "RailTel Corporation",
          price: 420,
          change: 45,
          percent: "+12.00%",
          volume: "4.5M",
          marketCap: "₹8,400 Cr",
          positive: true,
        },
        {
          symbol: "MAZAGON",
          name: "Mazagon Dock Shipbuilders",
          price: 3850,
          change: 385,
          percent: "+11.11%",
          volume: "1.2M",
          marketCap: "₹76,230 Cr",
          positive: true,
        },
      ],
      topLosers: [
        {
          symbol: "RBLBANK",
          name: "RBL Bank",
          price: 285,
          change: -25,
          percent: "-8.06%",
          volume: "6.8M",
          marketCap: "₹16,950 Cr",
          positive: false,
        },
        {
          symbol: "DELTACORP",
          name: "Delta Corp",
          price: 180,
          change: -15,
          percent: "-7.69%",
          volume: "3.2M",
          marketCap: "₹4,680 Cr",
          positive: false,
        },
        {
          symbol: "BANKBARODA",
          name: "Bank of Baroda",
          price: 245,
          change: -18,
          percent: "-6.84%",
          volume: "8.5M",
          marketCap: "₹1.3L Cr",
          positive: false,
        },
      ],
      allStocks: [
        {
          symbol: "IRCTC",
          name: "Indian Railway Catering",
          price: 850,
          change: 95,
          percent: "+12.58%",
          volume: "8.2M",
          marketCap: "₹68,000 Cr",
          positive: true,
        },
        {
          symbol: "RAILTEL",
          name: "RailTel Corporation",
          price: 420,
          change: 45,
          percent: "+12.00%",
          volume: "4.5M",
          marketCap: "₹8,400 Cr",
          positive: true,
        },
        {
          symbol: "MAZAGON",
          name: "Mazagon Dock Shipbuilders",
          price: 3850,
          change: 385,
          percent: "+11.11%",
          volume: "1.2M",
          marketCap: "₹76,230 Cr",
          positive: true,
        },
        {
          symbol: "TATASTEEL",
          name: "Tata Steel",
          price: 145,
          change: 12,
          percent: "+9.03%",
          volume: "8.5M",
          marketCap: "₹1.8L Cr",
          positive: true,
        },
        {
          symbol: "TCS",
          name: "Tata Consultancy Services",
          price: 4250,
          change: 285,
          percent: "+7.19%",
          volume: "2.5M",
          marketCap: "₹15.4L Cr",
          positive: true,
        },
        {
          symbol: "RBLBANK",
          name: "RBL Bank",
          price: 285,
          change: -25,
          percent: "-8.06%",
          volume: "6.8M",
          marketCap: "₹16,950 Cr",
          positive: false,
        },
        {
          symbol: "DELTACORP",
          name: "Delta Corp",
          price: 180,
          change: -15,
          percent: "-7.69%",
          volume: "3.2M",
          marketCap: "₹4,680 Cr",
          positive: false,
        },
        {
          symbol: "BANKBARODA",
          name: "Bank of Baroda",
          price: 245,
          change: -18,
          percent: "-6.84%",
          volume: "8.5M",
          marketCap: "₹1.3L Cr",
          positive: false,
        },
      ],
    },
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const currentData = indexData[selectedIndex]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Advance Decline</h2>
          <p className="text-muted-foreground">Index-wise stock performance analysis</p>
        </div>
        <Button onClick={handleRefresh} disabled={isLoading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {/* Index Selection */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(indexData).map((index) => (
          <Button
            key={index}
            variant={selectedIndex === index ? "default" : "outline"}
            onClick={() => setSelectedIndex(index)}
            className="text-sm"
          >
            {index}
          </Button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.totalStocks}</div>
            <div className="text-sm text-muted-foreground">in {currentData.name}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Advances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-green-600">{currentData.advances}</div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-sm text-muted-foreground">{currentData.advancePercent}% of stocks</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Declines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-red-600">{currentData.declines}</div>
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-sm text-muted-foreground">{currentData.declinePercent}% of stocks</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.volume}</div>
            <div className="text-sm text-muted-foreground">Total traded</div>
          </CardContent>
        </Card>
      </div>

      {/* Advance/Decline Ratio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Advance/Decline Ratio</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Advances ({currentData.advances})</span>
              <span className="text-green-600">{currentData.advancePercent}%</span>
            </div>
            <Progress value={currentData.advancePercent} className="h-3" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-red-600">Declines ({currentData.declines})</span>
              <span className="text-red-600">{currentData.declinePercent}%</span>
            </div>
            <Progress value={currentData.declinePercent} className="h-3" />
          </div>
          <div className="pt-2 border-t">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">A/D Ratio</div>
              <div className="text-xl font-bold">{(currentData.advances / currentData.declines).toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Gainers and Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-600">
              <ArrowUpRight className="h-5 w-5" />
              <span>Top Gainers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentData.topGainers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-semibold">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                  <div className="text-xs text-muted-foreground">Vol: {stock.volume}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹{stock.price}</div>
                  <div className="text-green-600 font-medium">{stock.percent}</div>
                  <div className="text-xs text-muted-foreground">{stock.marketCap}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <ArrowDownRight className="h-5 w-5" />
              <span>Top Losers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentData.topLosers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-semibold">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                  <div className="text-xs text-muted-foreground">Vol: {stock.volume}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹{stock.price}</div>
                  <div className="text-red-600 font-medium">{stock.percent}</div>
                  <div className="text-xs text-muted-foreground">{stock.marketCap}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* All Stocks in Index */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>All Stocks in {currentData.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {currentData.allStocks.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`h-3 w-3 rounded-full ${stock.positive ? "bg-green-500" : "bg-red-500"}`} />
                  <div>
                    <div className="font-semibold">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">{stock.name}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="font-bold">₹{stock.price}</div>
                    <div className="text-xs text-muted-foreground">Vol: {stock.volume}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={stock.positive ? "default" : "destructive"}>{stock.percent}</Badge>
                    <div className="text-xs text-muted-foreground mt-1">{stock.marketCap}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
