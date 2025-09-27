"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign,
  PieChart,
  Users,
  ShoppingCart,
  Eye,
} from "lucide-react"
import { SectorDetailModal } from "./sector-detail-modal"

export function MarketOverview() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const indices = [
    { name: "NIFTY 50", value: "24,250.50", change: "+180.75", percent: "+0.75%", positive: true },
    { name: "SENSEX", value: "79,890.10", change: "+450.25", percent: "+0.57%", positive: true },
    { name: "NIFTY BANK", value: "52,350.20", change: "-124.40", percent: "-0.24%", positive: false },
    { name: "USD/INR", value: "83.55", change: "+0.12", percent: "+0.14%", positive: true },
  ]

  const commodities = [
    { name: "Gold (MCX)", value: "72,500", change: "-250", percent: "-0.34%", positive: false },
    { name: "Silver (MCX)", value: "91,200", change: "+800", percent: "+0.88%", positive: true },
    { name: "Crude Oil (MCX)", value: "6,800", change: "-50", percent: "-0.73%", positive: false },
  ]

  const sectors = [
    {
      name: "IT",
      change: "+2.1%",
      positive: true,
      buyingPressure: 75,
      volume: "₹12,450 Cr",
      fiiActivity: "Buying",
      diiActivity: "Selling",
    },
    {
      name: "Banking",
      change: "-0.8%",
      positive: false,
      buyingPressure: 35,
      volume: "₹18,200 Cr",
      fiiActivity: "Selling",
      diiActivity: "Buying",
    },
    {
      name: "Pharma",
      change: "+1.5%",
      positive: true,
      buyingPressure: 68,
      volume: "₹8,750 Cr",
      fiiActivity: "Buying",
      diiActivity: "Neutral",
    },
    {
      name: "Auto",
      change: "+0.9%",
      positive: true,
      buyingPressure: 58,
      volume: "₹9,850 Cr",
      fiiActivity: "Neutral",
      diiActivity: "Buying",
    },
    {
      name: "FMCG",
      change: "-1.2%",
      positive: false,
      buyingPressure: 42,
      volume: "₹6,320 Cr",
      fiiActivity: "Selling",
      diiActivity: "Selling",
    },
    {
      name: "Metals",
      change: "+3.2%",
      positive: true,
      buyingPressure: 82,
      volume: "₹15,600 Cr",
      fiiActivity: "Buying",
      diiActivity: "Buying",
    },
  ]

  const getSectorStocks = (sectorName: string) => {
    const stockData: { [key: string]: any[] } = {
      IT: [
        {
          symbol: "TCS",
          name: "Tata Consultancy Services",
          price: 4250,
          change: 85,
          percent: "+2.04%",
          volume: "2.5M",
          marketCap: "₹15.4L Cr",
          positive: true,
        },
        {
          symbol: "INFY",
          name: "Infosys Limited",
          price: 1820,
          change: 35,
          percent: "+1.96%",
          volume: "3.2M",
          marketCap: "₹7.6L Cr",
          positive: true,
        },
        {
          symbol: "HCLTECH",
          name: "HCL Technologies",
          price: 1650,
          change: 28,
          percent: "+1.73%",
          volume: "1.8M",
          marketCap: "₹4.5L Cr",
          positive: true,
        },
        {
          symbol: "WIPRO",
          name: "Wipro Limited",
          price: 580,
          change: -8,
          percent: "-1.36%",
          volume: "2.1M",
          marketCap: "₹3.2L Cr",
          positive: false,
        },
        {
          symbol: "TECHM",
          name: "Tech Mahindra",
          price: 1420,
          change: 22,
          percent: "+1.57%",
          volume: "1.5M",
          marketCap: "₹1.4L Cr",
          positive: true,
        },
      ],
      Banking: [
        {
          symbol: "HDFCBANK",
          name: "HDFC Bank",
          price: 1680,
          change: -12,
          percent: "-0.71%",
          volume: "4.2M",
          marketCap: "₹12.8L Cr",
          positive: false,
        },
        {
          symbol: "ICICIBANK",
          name: "ICICI Bank",
          price: 1250,
          change: -8,
          percent: "-0.63%",
          volume: "3.8M",
          marketCap: "₹8.7L Cr",
          positive: false,
        },
        {
          symbol: "SBIN",
          name: "State Bank of India",
          price: 820,
          change: 15,
          percent: "+1.86%",
          volume: "5.1M",
          marketCap: "₹7.3L Cr",
          positive: true,
        },
        {
          symbol: "AXISBANK",
          name: "Axis Bank",
          price: 1180,
          change: -18,
          percent: "-1.50%",
          volume: "2.9M",
          marketCap: "₹3.6L Cr",
          positive: false,
        },
        {
          symbol: "KOTAKBANK",
          name: "Kotak Mahindra Bank",
          price: 1750,
          change: -25,
          percent: "-1.41%",
          volume: "1.7M",
          marketCap: "₹3.5L Cr",
          positive: false,
        },
      ],
      Pharma: [
        {
          symbol: "SUNPHARMA",
          name: "Sun Pharmaceutical",
          price: 1680,
          change: 28,
          percent: "+1.69%",
          volume: "1.2M",
          marketCap: "₹4.0L Cr",
          positive: true,
        },
        {
          symbol: "DRREDDY",
          name: "Dr. Reddy's Labs",
          price: 6850,
          change: 95,
          percent: "+1.41%",
          volume: "0.8M",
          marketCap: "₹1.1L Cr",
          positive: true,
        },
        {
          symbol: "CIPLA",
          name: "Cipla Limited",
          price: 1520,
          change: 18,
          percent: "+1.20%",
          volume: "1.1M",
          marketCap: "₹1.2L Cr",
          positive: true,
        },
        {
          symbol: "DIVISLAB",
          name: "Divi's Laboratories",
          price: 5950,
          change: -45,
          percent: "-0.75%",
          volume: "0.5M",
          marketCap: "₹1.6L Cr",
          positive: false,
        },
        {
          symbol: "BIOCON",
          name: "Biocon Limited",
          price: 358,
          change: 8,
          percent: "+2.29%",
          volume: "2.3M",
          marketCap: "₹43K Cr",
          positive: true,
        },
      ],
      Auto: [
        {
          symbol: "MARUTI",
          name: "Maruti Suzuki",
          price: 12500,
          change: 125,
          percent: "+1.01%",
          volume: "0.9M",
          marketCap: "₹3.8L Cr",
          positive: true,
        },
        {
          symbol: "TATAMOTORS",
          name: "Tata Motors",
          price: 980,
          change: 15,
          percent: "+1.55%",
          volume: "4.2M",
          marketCap: "₹3.6L Cr",
          positive: true,
        },
        {
          symbol: "M&M",
          name: "Mahindra & Mahindra",
          price: 2850,
          change: -22,
          percent: "-0.76%",
          volume: "1.8M",
          marketCap: "₹3.5L Cr",
          positive: false,
        },
        {
          symbol: "BAJAJ-AUTO",
          name: "Bajaj Auto",
          price: 9200,
          change: 85,
          percent: "+0.93%",
          volume: "0.6M",
          marketCap: "₹2.7L Cr",
          positive: true,
        },
        {
          symbol: "HEROMOTOCO",
          name: "Hero MotoCorp",
          price: 4950,
          change: 45,
          percent: "+0.92%",
          volume: "0.8M",
          marketCap: "₹99K Cr",
          positive: true,
        },
      ],
      FMCG: [
        {
          symbol: "HINDUNILVR",
          name: "Hindustan Unilever",
          price: 2680,
          change: -35,
          percent: "-1.29%",
          volume: "1.5M",
          marketCap: "₹6.3L Cr",
          positive: false,
        },
        {
          symbol: "ITC",
          name: "ITC Limited",
          price: 485,
          change: -8,
          percent: "-1.62%",
          volume: "6.2M",
          marketCap: "₹6.0L Cr",
          positive: false,
        },
        {
          symbol: "NESTLEIND",
          name: "Nestle India",
          price: 2450,
          change: 28,
          percent: "+1.16%",
          volume: "0.4M",
          marketCap: "₹2.4L Cr",
          positive: true,
        },
        {
          symbol: "BRITANNIA",
          name: "Britannia Industries",
          price: 5200,
          change: -45,
          percent: "-0.86%",
          volume: "0.3M",
          marketCap: "₹1.2L Cr",
          positive: false,
        },
        {
          symbol: "DABUR",
          name: "Dabur India",
          price: 620,
          change: -12,
          percent: "-1.90%",
          volume: "2.1M",
          marketCap: "₹1.1L Cr",
          positive: false,
        },
      ],
      Metals: [
        {
          symbol: "TATASTEEL",
          name: "Tata Steel",
          price: 145,
          change: 8,
          percent: "+5.84%",
          volume: "8.5M",
          marketCap: "₹1.8L Cr",
          positive: true,
        },
        {
          symbol: "JSWSTEEL",
          name: "JSW Steel",
          price: 920,
          change: 35,
          percent: "+3.95%",
          volume: "3.2M",
          marketCap: "₹2.3L Cr",
          positive: true,
        },
        {
          symbol: "HINDALCO",
          name: "Hindalco Industries",
          price: 650,
          change: 18,
          percent: "+2.85%",
          volume: "4.1M",
          marketCap: "₹1.4L Cr",
          positive: true,
        },
        {
          symbol: "VEDL",
          name: "Vedanta Limited",
          price: 485,
          change: 12,
          percent: "+2.54%",
          volume: "5.8M",
          marketCap: "₹1.8L Cr",
          positive: true,
        },
        {
          symbol: "NMDC",
          name: "NMDC Limited",
          price: 240,
          change: 6,
          percent: "+2.56%",
          volume: "2.9M",
          marketCap: "₹1.1L Cr",
          positive: true,
        },
      ],
    }
    return stockData[sectorName] || []
  }

  const handleSectorClick = (sectorName: string) => {
    setSelectedSector(sectorName)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {indices.map((index) => (
          <Card key={index.name} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{index.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{index.value}</div>
                  <div
                    className={`flex items-center space-x-1 text-sm ${
                      index.positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {index.positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    <span>{index.change}</span>
                    <span>({index.percent})</span>
                  </div>
                </div>
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    index.positive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {index.positive ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Commodities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Commodities</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {commodities.map((commodity) => (
              <div key={commodity.name} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{commodity.name}</div>
                  <div className="text-lg font-bold">{commodity.value}</div>
                </div>
                <div className={`text-right ${commodity.positive ? "text-green-600" : "text-red-600"}`}>
                  <div className="font-medium">{commodity.change}</div>
                  <div className="text-sm">{commodity.percent}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Advanced Sector Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sectors.map((sector) => (
              <div
                key={sector.name}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleSectorClick(sector.name)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-lg">{sector.name}</span>
                    <Badge variant={sector.positive ? "default" : "destructive"}>{sector.change}</Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>View Stocks</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Buying Pressure</span>
                      <span className={sector.buyingPressure > 50 ? "text-green-600" : "text-red-600"}>
                        {sector.buyingPressure}%
                      </span>
                    </div>
                    <Progress value={sector.buyingPressure} className="h-2" />
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Volume</div>
                    <div className="font-medium">{sector.volume}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>FII:</span>
                      <Badge
                        variant={
                          sector.fiiActivity === "Buying"
                            ? "default"
                            : sector.fiiActivity === "Selling"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {sector.fiiActivity}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ShoppingCart className="h-4 w-4" />
                      <span>DII:</span>
                      <Badge
                        variant={
                          sector.diiActivity === "Buying"
                            ? "default"
                            : sector.diiActivity === "Selling"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {sector.diiActivity}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Market Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Advances</span>
                <span className="text-green-600">1,247</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Declines</span>
                <span className="text-red-600">892</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Volume</span>
                <span className="font-medium">₹45,678 Cr</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedSector && (
        <SectorDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sectorName={selectedSector}
          stocks={getSectorStocks(selectedSector)}
        />
      )}
    </div>
  )
}
