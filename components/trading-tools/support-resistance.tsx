"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, TrendingUp, TrendingDown, RefreshCw, Search } from "lucide-react"

export function SupportResistance() {
  const [selectedStock, setSelectedStock] = useState("NIFTY")
  const [timeframe, setTimeframe] = useState("1D")
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const allSymbols = [
    // Major Indices
    { symbol: "NIFTY", name: "NIFTY 50", category: "Index" },
    { symbol: "BANKNIFTY", name: "NIFTY BANK", category: "Index" },
    { symbol: "FINNIFTY", name: "NIFTY FINANCIAL", category: "Index" },
    { symbol: "MIDCPNIFTY", name: "NIFTY MIDCAP SELECT", category: "Index" },
    { symbol: "SENSEX", name: "BSE SENSEX", category: "Index" },
    { symbol: "BANKEX", name: "BSE BANKEX", category: "Index" },

    // Banking Stocks
    { symbol: "HDFCBANK", name: "HDFC Bank", category: "Banking" },
    { symbol: "ICICIBANK", name: "ICICI Bank", category: "Banking" },
    { symbol: "SBIN", name: "State Bank of India", category: "Banking" },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", category: "Banking" },
    { symbol: "AXISBANK", name: "Axis Bank", category: "Banking" },
    { symbol: "INDUSINDBK", name: "IndusInd Bank", category: "Banking" },
    { symbol: "FEDERALBNK", name: "Federal Bank", category: "Banking" },
    { symbol: "IDFCFIRSTB", name: "IDFC First Bank", category: "Banking" },
    { symbol: "BANDHANBNK", name: "Bandhan Bank", category: "Banking" },
    { symbol: "PNB", name: "Punjab National Bank", category: "Banking" },

    // IT Stocks
    { symbol: "TCS", name: "Tata Consultancy Services", category: "IT" },
    { symbol: "INFY", name: "Infosys", category: "IT" },
    { symbol: "HCLTECH", name: "HCL Technologies", category: "IT" },
    { symbol: "WIPRO", name: "Wipro", category: "IT" },
    { symbol: "TECHM", name: "Tech Mahindra", category: "IT" },
    { symbol: "LTI", name: "LTI Mindtree", category: "IT" },
    { symbol: "COFORGE", name: "Coforge", category: "IT" },
    { symbol: "MPHASIS", name: "Mphasis", category: "IT" },

    // Auto Stocks
    { symbol: "MARUTI", name: "Maruti Suzuki", category: "Auto" },
    { symbol: "TATAMOTORS", name: "Tata Motors", category: "Auto" },
    { symbol: "M&M", name: "Mahindra & Mahindra", category: "Auto" },
    { symbol: "BAJAJ-AUTO", name: "Bajaj Auto", category: "Auto" },
    { symbol: "HEROMOTOCO", name: "Hero MotoCorp", category: "Auto" },
    { symbol: "EICHERMOT", name: "Eicher Motors", category: "Auto" },
    { symbol: "TVSMOTOR", name: "TVS Motor", category: "Auto" },
    { symbol: "ASHOKLEY", name: "Ashok Leyland", category: "Auto" },

    // Pharma Stocks
    { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", category: "Pharma" },
    { symbol: "DRREDDY", name: "Dr. Reddy's Labs", category: "Pharma" },
    { symbol: "CIPLA", name: "Cipla", category: "Pharma" },
    { symbol: "DIVISLAB", name: "Divi's Laboratories", category: "Pharma" },
    { symbol: "BIOCON", name: "Biocon", category: "Pharma" },
    { symbol: "LUPIN", name: "Lupin", category: "Pharma" },
    { symbol: "AUROPHARMA", name: "Aurobindo Pharma", category: "Pharma" },

    // FMCG Stocks
    { symbol: "HINDUNILVR", name: "Hindustan Unilever", category: "FMCG" },
    { symbol: "ITC", name: "ITC", category: "FMCG" },
    { symbol: "NESTLEIND", name: "Nestle India", category: "FMCG" },
    { symbol: "BRITANNIA", name: "Britannia Industries", category: "FMCG" },
    { symbol: "DABUR", name: "Dabur India", category: "FMCG" },
    { symbol: "MARICO", name: "Marico", category: "FMCG" },
    { symbol: "GODREJCP", name: "Godrej Consumer", category: "FMCG" },

    // Energy & Oil
    { symbol: "RELIANCE", name: "Reliance Industries", category: "Energy" },
    { symbol: "ONGC", name: "Oil & Natural Gas Corp", category: "Energy" },
    { symbol: "IOC", name: "Indian Oil Corp", category: "Energy" },
    { symbol: "BPCL", name: "Bharat Petroleum", category: "Energy" },
    { symbol: "HPCL", name: "Hindustan Petroleum", category: "Energy" },
    { symbol: "GAIL", name: "GAIL India", category: "Energy" },

    // Metals & Mining
    { symbol: "TATASTEEL", name: "Tata Steel", category: "Metals" },
    { symbol: "JSWSTEEL", name: "JSW Steel", category: "Metals" },
    { symbol: "HINDALCO", name: "Hindalco Industries", category: "Metals" },
    { symbol: "VEDL", name: "Vedanta", category: "Metals" },
    { symbol: "COALINDIA", name: "Coal India", category: "Metals" },
    { symbol: "SAIL", name: "Steel Authority of India", category: "Metals" },
    { symbol: "NMDC", name: "NMDC", category: "Metals" },

    // Telecom
    { symbol: "BHARTIARTL", name: "Bharti Airtel", category: "Telecom" },
    { symbol: "JIO", name: "Reliance Jio", category: "Telecom" },
    { symbol: "IDEA", name: "Vodafone Idea", category: "Telecom" },

    // Cement
    { symbol: "ULTRACEMCO", name: "UltraTech Cement", category: "Cement" },
    { symbol: "SHREECEM", name: "Shree Cement", category: "Cement" },
    { symbol: "ACC", name: "ACC", category: "Cement" },
    { symbol: "AMBUJACEMENT", name: "Ambuja Cements", category: "Cement" },

    // Others
    { symbol: "LT", name: "Larsen & Toubro", category: "Infrastructure" },
    { symbol: "ADANIPORTS", name: "Adani Ports", category: "Infrastructure" },
    { symbol: "POWERGRID", name: "Power Grid Corp", category: "Power" },
    { symbol: "NTPC", name: "NTPC", category: "Power" },
    { symbol: "ASIANPAINT", name: "Asian Paints", category: "Paints" },
    { symbol: "BAJFINANCE", name: "Bajaj Finance", category: "NBFC" },
    { symbol: "BAJAJFINSV", name: "Bajaj Finserv", category: "NBFC" },
  ]

  const filteredSymbols = allSymbols.filter(
    (item) =>
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const groupedSymbols = filteredSymbols.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, typeof allSymbols>,
  )

  const levels = [
    { type: "Resistance", level: 24450, strength: "Strong", distance: 2.1, volume: "High" },
    { type: "Resistance", level: 24380, strength: "Medium", distance: 1.2, volume: "Medium" },
    { type: "Support", level: 24250, strength: "Strong", distance: -0.8, volume: "High" },
    { type: "Support", level: 24180, strength: "Medium", distance: -1.6, volume: "Medium" },
    { type: "Support", level: 24100, strength: "Weak", distance: -2.9, volume: "Low" },
  ]

  const handleAnalyze = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Support & Resistance Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedStock} onValueChange={setSelectedStock}>
              <SelectTrigger>
                <SelectValue placeholder="Select Symbol" />
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
                    <div className="px-2 py-1 text-sm font-semibold text-muted-foreground bg-muted/50">{category}</div>
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

            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5M">5 Minutes</SelectItem>
                <SelectItem value="15M">15 Minutes</SelectItem>
                <SelectItem value="1H">1 Hour</SelectItem>
                <SelectItem value="1D">1 Day</SelectItem>
                <SelectItem value="1W">1 Week</SelectItem>
              </SelectContent>
            </Select>

            <Input placeholder="Current Price: 24,320" disabled />

            <Button onClick={handleAnalyze} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Analyze
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support & Resistance Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Key Levels - {selectedStock}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium p-3 bg-muted rounded">
              <div>Type</div>
              <div>Level</div>
              <div>Strength</div>
              <div>Distance</div>
              <div>Volume</div>
              <div>Action</div>
            </div>

            {levels.map((level, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 text-sm py-3 border-b hover:bg-muted/50">
                <div className="flex items-center space-x-2">
                  {level.type === "Resistance" ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  )}
                  <span className={level.type === "Resistance" ? "text-red-600" : "text-green-600"}>{level.type}</span>
                </div>
                <div className="font-bold">₹{level.level}</div>
                <div>
                  <Badge
                    variant={
                      level.strength === "Strong" ? "default" : level.strength === "Medium" ? "secondary" : "outline"
                    }
                  >
                    {level.strength}
                  </Badge>
                </div>
                <div className={`font-medium ${level.distance > 0 ? "text-red-600" : "text-green-600"}`}>
                  {level.distance > 0 ? "+" : ""}
                  {level.distance}%
                </div>
                <div>
                  <Badge
                    variant={level.volume === "High" ? "default" : level.volume === "Medium" ? "secondary" : "outline"}
                  >
                    {level.volume}
                  </Badge>
                </div>
                <div>
                  <Button size="sm" variant="outline">
                    Set Alert
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Signals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Bullish Signals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="font-medium text-green-800 dark:text-green-200">Strong Support at 24,250</div>
                <div className="text-sm text-green-600 dark:text-green-300">High volume confirmation</div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="font-medium text-blue-800 dark:text-blue-200">Breakout above 24,380</div>
                <div className="text-sm text-blue-600 dark:text-blue-300">Target: 24,450</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <span>Bearish Signals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="font-medium text-red-800 dark:text-red-200">Resistance at 24,450</div>
                <div className="text-sm text-red-600 dark:text-red-300">Multiple rejections</div>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="font-medium text-orange-800 dark:text-orange-200">Break below 24,250</div>
                <div className="text-sm text-orange-600 dark:text-orange-300">Target: 24,180</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
