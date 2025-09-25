"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Volume2, Activity } from "lucide-react"

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

interface SectorDetailModalProps {
  isOpen: boolean
  onClose: () => void
  sectorName: string
  stocks: Stock[]
}

export function SectorDetailModal({ isOpen, onClose, sectorName, stocks }: SectorDetailModalProps) {
  const topGainers = stocks.filter((stock) => stock.positive).slice(0, 3)
  const topLosers = stocks.filter((stock) => !stock.positive).slice(0, 3)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{sectorName} Sector - Stock Performance</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Top Gainers & Losers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-600 mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Top Gainers
                </h3>
                <div className="space-y-2">
                  {topGainers.map((stock) => (
                    <div key={stock.symbol} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground">₹{stock.price}</div>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-700">
                        {stock.percent}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-red-600 mb-3 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Top Losers
                </h3>
                <div className="space-y-2">
                  {topLosers.map((stock) => (
                    <div key={stock.symbol} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground">₹{stock.price}</div>
                      </div>
                      <Badge variant="destructive" className="bg-red-100 text-red-700">
                        {stock.percent}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* All Stocks */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">All {sectorName} Stocks</h3>
              <div className="space-y-3">
                {stocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-semibold">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground">{stock.name}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-semibold">₹{stock.price}</div>
                        <div
                          className={`flex items-center text-sm ${stock.positive ? "text-green-600" : "text-red-600"}`}
                        >
                          {stock.positive ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          {stock.change} ({stock.percent})
                        </div>
                      </div>

                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Volume2 className="h-3 w-3 mr-1" />
                          {stock.volume}
                        </div>
                        <div className="flex items-center">
                          <Activity className="h-3 w-3 mr-1" />
                          {stock.marketCap}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
