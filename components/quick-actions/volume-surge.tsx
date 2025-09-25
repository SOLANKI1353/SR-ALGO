"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Play, Pause } from "lucide-react"

export function VolumeSurge() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [surgeData, setSurgeData] = useState([
    { symbol: "ADANIPORTS", currentVol: "5.2M", avgVol: "2.1M", surge: 2.5, price: 1245.3, change: 3.2 },
    { symbol: "TATASTEEL", currentVol: "8.7M", avgVol: "3.8M", surge: 2.3, price: 145.75, change: 1.8 },
    { symbol: "JSWSTEEL", currentVol: "6.1M", avgVol: "2.9M", surge: 2.1, price: 912.4, change: -0.5 },
    { symbol: "HINDALCO", currentVol: "4.3M", avgVol: "2.2M", surge: 2.0, price: 634.85, change: 2.7 },
  ])

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isMonitoring) {
      interval = setInterval(() => {
        // Simulate real-time volume updates
        setSurgeData((prev) =>
          prev.map((stock) => ({
            ...stock,
            currentVol: (Number.parseFloat(stock.currentVol) + Math.random() * 0.5).toFixed(1) + "M",
            surge: +(stock.surge + (Math.random() - 0.5) * 0.2).toFixed(1),
          })),
        )
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isMonitoring])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Volume Surge Monitor</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Button
              onClick={toggleMonitoring}
              className={`${isMonitoring ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"}`}
            >
              {isMonitoring ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
            </Button>
            <div className="text-sm text-muted-foreground">
              {isMonitoring ? "Live monitoring active" : "Click to start monitoring"}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Volume Surge Detected</h3>
            {surgeData.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm">₹{stock.price}</div>
                  <div className={`text-sm ${stock.change > 0 ? "text-green-600" : "text-red-600"}`}>
                    {stock.change > 0 ? "+" : ""}
                    {stock.change}%
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm">
                    <div>Vol: {stock.currentVol}</div>
                    <div className="text-muted-foreground">Avg: {stock.avgVol}</div>
                  </div>
                  <Badge variant="destructive">{stock.surge}x Surge</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
