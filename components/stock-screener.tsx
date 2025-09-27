"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Target, Zap, Search, Star, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function StockScreener() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { id: "all", label: "All Stocks", count: 2847 },
    { id: "intraday", label: "Intraday Picks", count: 45 },
    { id: "swing", label: "Swing Trades", count: 23 },
    { id: "breakout", label: "Breakouts", count: 18 },
    { id: "momentum", label: "Momentum", count: 67 },
  ]

  const stocks = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd",
      price: "2,847.50",
      change: "+45.20",
      percent: "+1.61%",
      volume: "2.4M",
      signal: "BUY",
      strength: 85,
      positive: true,
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: "3,950.75",
      change: "+67.30",
      percent: "+1.73%",
      volume: "1.8M",
      signal: "STRONG BUY",
      strength: 92,
      positive: true,
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Limited",
      price: "1,635.20",
      change: "-12.40",
      percent: "-0.75%",
      volume: "3.2M",
      signal: "HOLD",
      strength: 65,
      positive: false,
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      price: "1,789.90",
      change: "+23.50",
      percent: "+1.33%",
      volume: "2.1M",
      signal: "BUY",
      strength: 78,
      positive: true,
    },
    {
      symbol: "ICICIBANK",
      name: "ICICI Bank Limited",
      price: "1,245.60",
      change: "-8.90",
      percent: "-0.71%",
      volume: "4.1M",
      signal: "SELL",
      strength: 35,
      positive: false,
    },
  ]

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "STRONG BUY":
        return "bg-green-600 text-white"
      case "BUY":
        return "bg-green-500 text-white"
      case "HOLD":
        return "bg-yellow-500 text-white"
      case "SELL":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Signal Generator */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <span>AI Signal Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input placeholder="Enter stock symbol (e.g., RELIANCE)" />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Zap className="h-4 w-4 mr-2" />
              Generate Signal
            </Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Get AI-powered analysis including target price, stop loss, and confidence level
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Stock Screener</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="flex items-center space-x-2"
              >
                <span>{filter.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search stocks by name or symbol..." className="pl-10" />
          </div>

          {/* Stock List */}
          <div className="space-y-3">
            {stocks.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-bold">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">{stock.name}</div>
                  </div>
                  <Badge className={getSignalColor(stock.signal)}>{stock.signal}</Badge>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="font-bold">₹{stock.price}</div>
                    <div
                      className={`flex items-center space-x-1 text-sm ${
                        stock.positive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stock.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      <span>
                        {stock.change} ({stock.percent})
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Volume</div>
                    <div className="font-medium">{stock.volume}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Strength</div>
                    <div className="font-bold">{stock.strength}%</div>
                  </div>

                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
