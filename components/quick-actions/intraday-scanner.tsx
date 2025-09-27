"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export function IntradayScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<any[]>([])

  const handleScan = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setScanResults([
        { symbol: "RELIANCE", price: 2845.5, change: 2.3, volume: "2.5M", signal: "BUY", strength: 85 },
        { symbol: "TCS", price: 3920.75, change: -1.2, volume: "1.8M", signal: "SELL", strength: 72 },
        { symbol: "HDFCBANK", price: 1654.3, change: 1.8, volume: "3.2M", signal: "BUY", strength: 78 },
        { symbol: "INFY", price: 1789.45, change: 0.9, volume: "2.1M", signal: "HOLD", strength: 65 },
        { symbol: "ICICIBANK", price: 1198.6, change: 2.1, volume: "2.8M", signal: "BUY", strength: 82 },
      ])
      setIsScanning(false)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Intraday Scanner</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Button onClick={handleScan} disabled={isScanning} className="bg-blue-600 hover:bg-blue-700">
              {isScanning ? "Scanning..." : "Start Scan"}
            </Button>
            <div className="text-sm text-muted-foreground">
              {isScanning ? "Analyzing market data..." : "Ready to scan"}
            </div>
          </div>

          {scanResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Scan Results</h3>
              {scanResults.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-sm">₹{stock.price}</div>
                    <div className={`text-sm ${stock.change > 0 ? "text-green-600" : "text-red-600"}`}>
                      {stock.change > 0 ? "+" : ""}
                      {stock.change}%
                    </div>
                    <div className="text-sm text-muted-foreground">Vol: {stock.volume}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        stock.signal === "BUY" ? "default" : stock.signal === "SELL" ? "destructive" : "secondary"
                      }
                    >
                      {stock.signal}
                    </Badge>
                    <div className="text-sm">{stock.strength}%</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
