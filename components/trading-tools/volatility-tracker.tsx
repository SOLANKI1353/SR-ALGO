"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Activity, TrendingUp, TrendingDown, AlertTriangle, Search } from "lucide-react"

export function VolatilityTracker() {
  const [selectedIndex, setSelectedIndex] = useState("NIFTY")
  const [timeframe, setTimeframe] = useState("1D")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const allSymbols = [
    // Major Indices
    { symbol: "NIFTY", name: "NIFTY 50", category: "Indices" },
    { symbol: "BANKNIFTY", name: "BANK NIFTY", category: "Indices" },
    { symbol: "FINNIFTY", name: "FIN NIFTY", category: "Indices" },
    { symbol: "MIDCPNIFTY", name: "MIDCAP NIFTY", category: "Indices" },
    { symbol: "SENSEX", name: "SENSEX", category: "Indices" },
    { symbol: "BANKEX", name: "BANKEX", category: "Indices" },

    // Banking Stocks
    { symbol: "HDFCBANK", name: "HDFC Bank", category: "Banking" },
    { symbol: "ICICIBANK", name: "ICICI Bank", category: "Banking" },
    { symbol: "SBIN", name: "State Bank of India", category: "Banking" },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", category: "Banking" },
    { symbol: "AXISBANK", name: "Axis Bank", category: "Banking" },
    { symbol: "INDUSINDBK", name: "IndusInd Bank", category: "Banking" },
    { symbol: "BAJFINANCE", name: "Bajaj Finance", category: "Banking" },
    { symbol: "HDFCLIFE", name: "HDFC Life", category: "Banking" },

    // IT Stocks
    { symbol: "TCS", name: "Tata Consultancy Services", category: "IT" },
    { symbol: "INFY", name: "Infosys", category: "IT" },
    { symbol: "WIPRO", name: "Wipro", category: "IT" },
    { symbol: "HCLTECH", name: "HCL Technologies", category: "IT" },
    { symbol: "TECHM", name: "Tech Mahindra", category: "IT" },
    { symbol: "LTI", name: "LTI Mindtree", category: "IT" },

    // Auto Stocks
    { symbol: "MARUTI", name: "Maruti Suzuki", category: "Auto" },
    { symbol: "TATAMOTORS", name: "Tata Motors", category: "Auto" },
    { symbol: "M&M", name: "Mahindra & Mahindra", category: "Auto" },
    { symbol: "BAJAJ-AUTO", name: "Bajaj Auto", category: "Auto" },
    { symbol: "HEROMOTOCO", name: "Hero MotoCorp", category: "Auto" },
    { symbol: "EICHERMOT", name: "Eicher Motors", category: "Auto" },

    // Pharma Stocks
    { symbol: "SUNPHARMA", name: "Sun Pharma", category: "Pharma" },
    { symbol: "DRREDDY", name: "Dr. Reddy's Labs", category: "Pharma" },
    { symbol: "CIPLA", name: "Cipla", category: "Pharma" },
    { symbol: "DIVISLAB", name: "Divi's Labs", category: "Pharma" },
    { symbol: "BIOCON", name: "Biocon", category: "Pharma" },
    { symbol: "LUPIN", name: "Lupin", category: "Pharma" },

    // FMCG Stocks
    { symbol: "HINDUNILVR", name: "Hindustan Unilever", category: "FMCG" },
    { symbol: "ITC", name: "ITC", category: "FMCG" },
    { symbol: "NESTLEIND", name: "Nestle India", category: "FMCG" },
    { symbol: "BRITANNIA", name: "Britannia", category: "FMCG" },
    { symbol: "DABUR", name: "Dabur", category: "FMCG" },
    { symbol: "GODREJCP", name: "Godrej Consumer", category: "FMCG" },

    // Energy & Oil
    { symbol: "RELIANCE", name: "Reliance Industries", category: "Energy" },
    { symbol: "ONGC", name: "ONGC", category: "Energy" },
    { symbol: "IOC", name: "Indian Oil Corp", category: "Energy" },
    { symbol: "BPCL", name: "BPCL", category: "Energy" },
    { symbol: "HPCL", name: "HPCL", category: "Energy" },
    { symbol: "GAIL", name: "GAIL", category: "Energy" },

    // Metals & Mining
    { symbol: "TATASTEEL", name: "Tata Steel", category: "Metals" },
    { symbol: "JSWSTEEL", name: "JSW Steel", category: "Metals" },
    { symbol: "HINDALCO", name: "Hindalco", category: "Metals" },
    { symbol: "VEDL", name: "Vedanta", category: "Metals" },
    { symbol: "COALINDIA", name: "Coal India", category: "Metals" },
    { symbol: "SAIL", name: "SAIL", category: "Metals" },

    // Telecom
    { symbol: "BHARTIARTL", name: "Bharti Airtel", category: "Telecom" },
    { symbol: "JIO", name: "Jio", category: "Telecom" },
    { symbol: "IDEA", name: "Vodafone Idea", category: "Telecom" },

    // Cement
    { symbol: "ULTRACEMCO", name: "UltraTech Cement", category: "Cement" },
    { symbol: "SHREECEM", name: "Shree Cement", category: "Cement" },
    { symbol: "ACC", name: "ACC", category: "Cement" },
    { symbol: "AMBUJACEMENT", name: "Ambuja Cements", category: "Cement" },

    // Infrastructure
    { symbol: "LT", name: "Larsen & Toubro", category: "Infrastructure" },
    { symbol: "ADANIPORTS", name: "Adani Ports", category: "Infrastructure" },
    { symbol: "POWERGRID", name: "Power Grid Corp", category: "Infrastructure" },
    { symbol: "NTPC", name: "NTPC", category: "Infrastructure" },
  ]

  const filteredSymbols = allSymbols.filter(
    (item) =>
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Group symbols by category for better organization
  const groupedSymbols = filteredSymbols.reduce(
    (acc, symbol) => {
      if (!acc[symbol.category]) {
        acc[symbol.category] = []
      }
      acc[symbol.category].push(symbol)
      return acc
    },
    {} as Record<string, typeof allSymbols>,
  )

  const volatilityData = [
    { symbol: "NIFTY", current: 18.5, avg: 15.2, status: "High", change: 3.3 },
    { symbol: "BANKNIFTY", current: 22.8, avg: 19.5, status: "High", change: 3.3 },
    { symbol: "FINNIFTY", current: 16.2, avg: 14.8, status: "Normal", change: 1.4 },
    { symbol: "RELIANCE", current: 28.5, avg: 24.2, status: "High", change: 4.3 },
    { symbol: "TCS", current: 19.8, avg: 18.5, status: "Normal", change: 1.3 },
  ]

  const highVolatilityStocks = [
    { symbol: "ADANIPORTS", volatility: 45.2, change: 8.5, volume: "3.2x" },
    { symbol: "TATASTEEL", volatility: 38.7, change: -6.2, volume: "2.8x" },
    { symbol: "BAJFINANCE", volatility: 35.4, change: 5.8, volume: "2.1x" },
    { symbol: "MARUTI", volatility: 32.1, change: -4.3, volume: "1.9x" },
  ]

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Volatility Tracker</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Select
                value={selectedIndex}
                onValueChange={setSelectedIndex}
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Index/Stock" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search symbols..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  {Object.entries(groupedSymbols).map(([category, symbols]) => (
                    <div key={category}>
                      <div className="px-2 py-1 text-sm font-semibold text-muted-foreground bg-muted/50">
                        {category}
                      </div>
                      {symbols.map((item) => (
                        <SelectItem key={item.symbol} value={item.symbol}>
                          <div className="flex flex-col">
                            <span className="font-medium">{item.symbol}</span>
                            <span className="text-xs text-muted-foreground">{item.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1D">1 Day</SelectItem>
                <SelectItem value="1W">1 Week</SelectItem>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
              </SelectContent>
            </Select>

            <Button>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Set Alert
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Volatility Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Market Volatility Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {volatilityData.map((item) => (
              <div key={item.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-bold">{item.symbol}</div>
                    <div className="text-sm text-muted-foreground">Implied Volatility</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="font-bold text-lg">{item.current}%</div>
                    <div className="text-xs text-muted-foreground">Current</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">{item.avg}%</div>
                    <div className="text-xs text-muted-foreground">30D Avg</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`font-medium ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {item.change >= 0 ? "+" : ""}
                      {item.change}%
                    </span>
                  </div>
                  <Badge variant={item.status === "High" ? "destructive" : "secondary"}>{item.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* High Volatility Stocks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>High Volatility Stocks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {highVolatilityStocks.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-bold">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">Volatility: {stock.volatility}%</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className={`font-bold ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change}%
                    </div>
                    <div className="text-xs text-muted-foreground">Price Change</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-600">{stock.volume}</div>
                    <div className="text-xs text-muted-foreground">Volume</div>
                  </div>
                  <Button size="sm" variant="outline">
                    Track
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Volatility Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600">High</div>
            <div className="text-sm text-muted-foreground">Market Volatility</div>
            <div className="text-xs text-muted-foreground mt-1">Above 30D average</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">VIX</div>
            <div className="text-lg font-bold text-orange-600">19.8</div>
            <div className="text-sm text-muted-foreground">Fear Index</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-sm text-muted-foreground">High Vol Stocks</div>
            <div className="text-xs text-muted-foreground mt-1">Above 25% IV</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
