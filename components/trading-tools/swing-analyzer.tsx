"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, RefreshCw, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SwingAnalyzer() {
  const [selectedSector, setSelectedSector] = useState("all")
  const [timeframe, setTimeframe] = useState("1W")
  const [isScanning, setIsScanning] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const sectors = [
    { value: "all", label: "All Sectors", category: "General" },

    // Major Indices
    { value: "nifty50", label: "NIFTY 50", category: "Indices" },
    { value: "niftybank", label: "NIFTY BANK", category: "Indices" },
    { value: "niftynext50", label: "NIFTY NEXT 50", category: "Indices" },
    { value: "niftymidcap", label: "NIFTY MIDCAP 100", category: "Indices" },
    { value: "niftysmallcap", label: "NIFTY SMALLCAP 100", category: "Indices" },

    // Banking & Financial Services
    { value: "banking", label: "Banking", category: "Financial" },
    { value: "nbfc", label: "NBFC", category: "Financial" },
    { value: "insurance", label: "Insurance", category: "Financial" },
    { value: "housing_finance", label: "Housing Finance", category: "Financial" },

    // Technology
    { value: "it", label: "Information Technology", category: "Technology" },
    { value: "software", label: "Software", category: "Technology" },
    { value: "telecom", label: "Telecommunications", category: "Technology" },

    // Healthcare & Pharma
    { value: "pharma", label: "Pharmaceuticals", category: "Healthcare" },
    { value: "healthcare", label: "Healthcare Services", category: "Healthcare" },
    { value: "diagnostics", label: "Diagnostics", category: "Healthcare" },

    // Automobile
    { value: "auto", label: "Automobile", category: "Industrial" },
    { value: "auto_ancillary", label: "Auto Ancillary", category: "Industrial" },
    { value: "tyres", label: "Tyres", category: "Industrial" },

    // FMCG & Consumer
    { value: "fmcg", label: "FMCG", category: "Consumer" },
    { value: "consumer_durables", label: "Consumer Durables", category: "Consumer" },
    { value: "retail", label: "Retail", category: "Consumer" },
    { value: "textiles", label: "Textiles", category: "Consumer" },

    // Energy & Utilities
    { value: "oil_gas", label: "Oil & Gas", category: "Energy" },
    { value: "power", label: "Power", category: "Energy" },
    { value: "renewable_energy", label: "Renewable Energy", category: "Energy" },

    // Materials & Commodities
    { value: "metals", label: "Metals", category: "Materials" },
    { value: "steel", label: "Steel", category: "Materials" },
    { value: "cement", label: "Cement", category: "Materials" },
    { value: "chemicals", label: "Chemicals", category: "Materials" },
    { value: "fertilizers", label: "Fertilizers", category: "Materials" },
    { value: "paper", label: "Paper", category: "Materials" },

    // Infrastructure & Real Estate
    { value: "infrastructure", label: "Infrastructure", category: "Infrastructure" },
    { value: "construction", label: "Construction", category: "Infrastructure" },
    { value: "real_estate", label: "Real Estate", category: "Infrastructure" },

    // Media & Entertainment
    { value: "media", label: "Media & Entertainment", category: "Media" },
    { value: "advertising", label: "Advertising", category: "Media" },

    // Agriculture & Food
    { value: "agriculture", label: "Agriculture", category: "Agriculture" },
    { value: "food_processing", label: "Food Processing", category: "Agriculture" },

    // Others
    { value: "aviation", label: "Aviation", category: "Transportation" },
    { value: "shipping", label: "Shipping", category: "Transportation" },
    { value: "logistics", label: "Logistics", category: "Transportation" },
    { value: "hotels", label: "Hotels & Tourism", category: "Services" },
    { value: "education", label: "Education", category: "Services" },
  ]

  const filteredSectors = sectors.filter(
    (sector) =>
      sector.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sector.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const groupedSectors = filteredSectors.reduce(
    (acc, sector) => {
      if (!acc[sector.category]) {
        acc[sector.category] = []
      }
      acc[sector.category].push(sector)
      return acc
    },
    {} as Record<string, typeof sectors>,
  )

  const swingOpportunities = [
    {
      symbol: "RELIANCE",
      price: 2456.75,
      change: 2.3,
      signal: "BUY",
      confidence: 85,
      entry: 2450,
      target: 2650,
      stopLoss: 2350,
      timeframe: "2-4 weeks",
      reason: "Bullish breakout from consolidation",
    },
    {
      symbol: "TCS",
      price: 3890.2,
      change: -1.2,
      signal: "SELL",
      confidence: 78,
      entry: 3900,
      target: 3650,
      stopLoss: 4050,
      timeframe: "3-5 weeks",
      reason: "Bearish divergence on RSI",
    },
    {
      symbol: "HDFC",
      price: 1678.45,
      change: 1.8,
      signal: "BUY",
      confidence: 92,
      entry: 1675,
      target: 1850,
      stopLoss: 1580,
      timeframe: "4-6 weeks",
      reason: "Golden cross formation",
    },
    {
      symbol: "ICICIBANK",
      price: 1245.3,
      change: 0.5,
      signal: "HOLD",
      confidence: 65,
      entry: 1240,
      target: 1350,
      stopLoss: 1180,
      timeframe: "2-3 weeks",
      reason: "Sideways consolidation",
    },
  ]

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => setIsScanning(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Swing Trading Analyzer</span>
            <Badge variant="secondary">Beta</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger>
                <SelectValue placeholder="Select Sector" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                <div className="p-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search sectors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                {Object.entries(groupedSectors).map(([category, sectorList]) => (
                  <div key={category}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{category}</div>
                    {sectorList.map((sector) => (
                      <SelectItem key={sector.value} value={sector.value}>
                        {sector.label}
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
                <SelectItem value="1D">Daily</SelectItem>
                <SelectItem value="1W">Weekly</SelectItem>
                <SelectItem value="1M">Monthly</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Min Confidence:</span>
              <span className="font-bold">70%</span>
            </div>

            <Button onClick={handleScan} disabled={isScanning}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? "animate-spin" : ""}`} />
              {isScanning ? "Scanning..." : "Scan Market"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Swing Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Swing Trading Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {swingOpportunities.map((stock) => (
              <div key={stock.symbol} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-bold text-lg">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground">₹{stock.price}</div>
                    </div>
                    <div
                      className={`flex items-center space-x-1 ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {stock.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="font-medium">
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={
                        stock.signal === "BUY" ? "default" : stock.signal === "SELL" ? "destructive" : "secondary"
                      }
                    >
                      {stock.signal}
                    </Badge>
                    <div className="text-right">
                      <div className="font-bold">{stock.confidence}%</div>
                      <div className="text-xs text-muted-foreground">Confidence</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Entry</div>
                    <div className="font-bold">₹{stock.entry}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Target</div>
                    <div className="font-bold text-green-600">₹{stock.target}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Stop Loss</div>
                    <div className="font-bold text-red-600">₹{stock.stopLoss}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Timeframe</div>
                    <div className="font-bold">{stock.timeframe}</div>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm font-medium mb-1">Analysis:</div>
                  <div className="text-sm text-muted-foreground">{stock.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-muted-foreground">Buy Signals</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600">8</div>
            <div className="text-sm text-muted-foreground">Sell Signals</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">15</div>
            <div className="text-sm text-muted-foreground">Hold Positions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">78%</div>
            <div className="text-sm text-muted-foreground">Avg Confidence</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
