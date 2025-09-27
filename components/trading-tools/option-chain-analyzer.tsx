"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, TrendingDown, RefreshCw, Search } from "lucide-react"

export function OptionChainAnalyzer() {
  const [selectedSymbol, setSelectedSymbol] = useState("NIFTY")
  const [selectedExpiry, setSelectedExpiry] = useState("28-NOV-2024")
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const indices = [
    "NIFTY",
    "BANKNIFTY",
    "FINNIFTY",
    "MIDCPNIFTY",
    "NIFTYIT",
    "NIFTYPHARMA",
    "NIFTYAUTO",
    "NIFTYFMCG",
    "NIFTYREALTY",
    "NIFTYMETAL",
    "NIFTYENERGY",
    "NIFTYPSE",
  ]

  const stocks = [
    // Banking & Financial
    "HDFCBANK",
    "ICICIBANK",
    "SBIN",
    "AXISBANK",
    "KOTAKBANK",
    "INDUSINDBK",
    "FEDERALBNK",
    "BANDHANBNK",
    "IDFCFIRSTB",
    "PNB",
    // IT & Technology
    "TCS",
    "INFY",
    "WIPRO",
    "HCLTECH",
    "TECHM",
    "LTI",
    "MINDTREE",
    "MPHASIS",
    "COFORGE",
    "LTTS",
    // Oil & Gas
    "RELIANCE",
    "ONGC",
    "BPCL",
    "HINDPETRO",
    "IOC",
    "GAIL",
    "OIL",
    "MGL",
    "IGL",
    "PETRONET",
    // Pharma
    "SUNPHARMA",
    "DRREDDY",
    "CIPLA",
    "DIVISLAB",
    "BIOCON",
    "LUPIN",
    "CADILAHC",
    "AUROPHARMA",
    "TORNTPHARM",
    "GLENMARK",
    // Auto
    "MARUTI",
    "HYUNDAI",
    "M&M",
    "TATAMOTORS",
    "BAJAJ-AUTO",
    "HEROMOTOCO",
    "TVSMOTORS",
    "EICHERMOT",
    "ASHOKLEY",
    "BHARATFORG",
    // FMCG
    "HINDUNILVR",
    "ITC",
    "NESTLEIND",
    "BRITANNIA",
    "DABUR",
    "GODREJCP",
    "MARICO",
    "COLPAL",
    "PGHH",
    "VBL",
    // Metals & Mining
    "TATASTEEL",
    "JSWSTEEL",
    "HINDALCO",
    "VEDL",
    "COALINDIA",
    "NMDC",
    "SAIL",
    "JINDALSTEL",
    "MOIL",
    "NATIONALUM",
    // Cement
    "ULTRACEMCO",
    "SHREECEM",
    "ACC",
    "AMBUJAGEMENT",
    "JKCEMENT",
    "RAMCOCEM",
    "HEIDELBERG",
    "INDIACEM",
    "PRISMCEMENT",
    "STARCEMENT",
    // Telecom
    "BHARTIARTL",
    "IDEA",
    "RJIO",
    "MTNL",
    "BSNL",
    "TTML",
    "GTPL",
    "HFCL",
    "STERLTECH",
    "RAILTEL",
    // Power & Utilities
    "NTPC",
    "POWERGRID",
    "ADANIPOWER",
    "TATAPOWER",
    "JSPL",
    "ADANIGREEN",
    "RPOWER",
    "NHPC",
    "SJVN",
    "THERMAX",
  ]

  const allSymbols = [...indices, ...stocks]

  const filteredSymbols = allSymbols.filter((symbol) => symbol.toLowerCase().includes(searchTerm.toLowerCase()))

  const optionData = [
    { strike: 24200, ceOI: 45200, ceLTP: 125.5, ceIV: 18.5, peLTP: 89.75, peOI: 38700, peIV: 19.2, pcr: 0.86 },
    { strike: 24250, ceOI: 52300, ceLTP: 98.25, ceIV: 17.8, peLTP: 112.4, peOI: 41200, peIV: 18.9, pcr: 0.79 },
    { strike: 24300, ceOI: 68900, ceLTP: 75.8, ceIV: 17.2, peLTP: 138.9, peOI: 55600, peIV: 18.4, pcr: 0.81 },
    { strike: 24350, ceOI: 89400, ceLTP: 56.45, ceIV: 16.9, peLTP: 168.25, peOI: 72300, peIV: 17.8, pcr: 0.81 },
    { strike: 24400, ceOI: 125600, ceLTP: 41.2, ceIV: 16.5, peLTP: 201.75, peOI: 98700, peIV: 17.2, pcr: 0.79 },
  ]

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Option Chain Controls</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Symbol" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  <div className="p-2 border-b">
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

                  {/* Indices Section */}
                  <div className="p-2">
                    <div className="text-xs font-semibold text-muted-foreground mb-2">INDICES</div>
                    {indices
                      .filter((symbol) => symbol.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((symbol) => (
                        <SelectItem key={symbol} value={symbol} className="text-blue-600 font-medium">
                          {symbol}
                        </SelectItem>
                      ))}
                  </div>

                  {/* Stocks Section */}
                  <div className="p-2 border-t">
                    <div className="text-xs font-semibold text-muted-foreground mb-2">STOCKS</div>
                    {stocks
                      .filter((symbol) => symbol.toLowerCase().includes(searchTerm.toLowerCase()))
                      .slice(0, 50)
                      .map((symbol) => (
                        <SelectItem key={symbol} value={symbol}>
                          {symbol}
                        </SelectItem>
                      ))}
                    {stocks.filter((symbol) => symbol.toLowerCase().includes(searchTerm.toLowerCase())).length > 50 && (
                      <div className="text-xs text-muted-foreground p-2">
                        ...and{" "}
                        {stocks.filter((symbol) => symbol.toLowerCase().includes(searchTerm.toLowerCase())).length - 50}{" "}
                        more stocks
                      </div>
                    )}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <Select value={selectedExpiry} onValueChange={setSelectedExpiry}>
              <SelectTrigger>
                <SelectValue placeholder="Select Expiry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="28-NOV-2024">28-NOV-2024</SelectItem>
                <SelectItem value="05-DEC-2024">05-DEC-2024</SelectItem>
                <SelectItem value="12-DEC-2024">12-DEC-2024</SelectItem>
                <SelectItem value="26-DEC-2024">26-DEC-2024</SelectItem>
              </SelectContent>
            </Select>

            <Input placeholder="Strike Price" />

            <Button onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Option Chain Data */}
      <Card>
        <CardHeader>
          <CardTitle>Option Chain - {selectedSymbol}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-9 gap-2 text-sm font-medium mb-4 p-2 bg-muted rounded">
              <div>Strike</div>
              <div>CE OI</div>
              <div>CE LTP</div>
              <div>CE IV</div>
              <div className="text-center font-bold">Strike Price</div>
              <div>PE IV</div>
              <div>PE LTP</div>
              <div>PE OI</div>
              <div>PCR</div>
            </div>

            {optionData.map((option) => (
              <div key={option.strike} className="grid grid-cols-9 gap-2 text-sm py-3 border-b hover:bg-muted/50">
                <div className="font-medium">{option.strike}</div>
                <div className="text-green-600 font-medium">{(option.ceOI / 1000).toFixed(1)}k</div>
                <div className="font-medium">₹{option.ceLTP}</div>
                <div className="text-blue-600">{option.ceIV}%</div>
                <div className="text-center font-bold text-lg">{option.strike}</div>
                <div className="text-blue-600">{option.peIV}%</div>
                <div className="font-medium">₹{option.peLTP}</div>
                <div className="text-red-600 font-medium">{(option.peOI / 1000).toFixed(1)}k</div>
                <div className={`font-medium ${option.pcr > 1 ? "text-green-600" : "text-red-600"}`}>{option.pcr}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Greeks Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Call Options Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Max Pain:</span>
                <span className="font-bold">24,350</span>
              </div>
              <div className="flex justify-between">
                <span>Call OI:</span>
                <span className="font-bold text-green-600">3.8L</span>
              </div>
              <div className="flex justify-between">
                <span>Avg IV:</span>
                <span className="font-bold">17.4%</span>
              </div>
              <div className="flex justify-between">
                <span>PCR:</span>
                <span className="font-bold">0.81</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <span>Put Options Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Put/Call Ratio:</span>
                <span className="font-bold">0.81</span>
              </div>
              <div className="flex justify-between">
                <span>Put OI:</span>
                <span className="font-bold text-red-600">3.1L</span>
              </div>
              <div className="flex justify-between">
                <span>Avg IV:</span>
                <span className="font-bold">18.1%</span>
              </div>
              <div className="flex justify-between">
                <span>Support:</span>
                <span className="font-bold">24,200</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
