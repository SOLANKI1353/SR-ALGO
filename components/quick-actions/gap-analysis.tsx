"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3 } from "lucide-react"

export function GapAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [gapData, setGapData] = useState([
    {
      symbol: "BHARTIARTL",
      prevClose: 1654.3,
      open: 1698.45,
      gap: 2.67,
      type: "Gap Up",
      filled: false,
      target: 1720.5,
      support: 1675.2,
    },
    {
      symbol: "WIPRO",
      prevClose: 445.8,
      open: 432.15,
      gap: -3.06,
      type: "Gap Down",
      filled: true,
      target: 425.3,
      support: 440.6,
    },
    {
      symbol: "TECHM",
      prevClose: 1789.6,
      open: 1825.3,
      gap: 1.99,
      type: "Gap Up",
      filled: false,
      target: 1845.75,
      support: 1805.2,
    },
  ])

  const analyzeGaps = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      // Simulate gap analysis
      setGapData((prev) =>
        prev.map((stock) => ({
          ...stock,
          filled: Math.random() > 0.6,
          target: stock.open + (Math.random() * 20 - 10),
          support: stock.open - (Math.random() * 15 + 5),
        })),
      )
      setIsAnalyzing(false)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Gap Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Button onClick={analyzeGaps} disabled={isAnalyzing} className="bg-orange-600 hover:bg-orange-700">
              {isAnalyzing ? "Analyzing..." : "Analyze Gaps"}
            </Button>
            <div className="text-sm text-muted-foreground">
              {isAnalyzing ? "Analyzing gap patterns..." : "Ready to analyze"}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Gap Analysis Results</h3>
            {gapData.map((stock) => (
              <div key={stock.symbol} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="font-medium">{stock.symbol}</div>
                    <Badge variant={stock.gap > 0 ? "default" : "destructive"}>{stock.type}</Badge>
                    <div className={`text-sm ${stock.gap > 0 ? "text-green-600" : "text-red-600"}`}>
                      {stock.gap > 0 ? "+" : ""}
                      {stock.gap}%
                    </div>
                  </div>
                  <Badge variant={stock.filled ? "secondary" : "outline"}>
                    {stock.filled ? "Gap Filled" : "Gap Open"}
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Prev Close</div>
                    <div>₹{stock.prevClose}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Open</div>
                    <div>₹{stock.open}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Target</div>
                    <div className="text-green-600">₹{stock.target.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Support</div>
                    <div className="text-red-600">₹{stock.support.toFixed(2)}</div>
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
