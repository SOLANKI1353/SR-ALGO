"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Target, Shield, BarChart3, AlertTriangle, Search, RefreshCw } from "lucide-react"

interface FibonacciSignal {
  symbol: string
  signal: "BUY" | "SELL" | "HOLD"
  confidence: number
  entry: number
  stopLoss: number
  target1: number
  target2: number
  target3: number
  currentPrice: number
  fibLevel: string
  reasoning: string
  volume: string
  timeframe: string
}

export function FibonacciTool() {
  const [timeframe, setTimeframe] = useState("1D")
  const [signals, setSignals] = useState<FibonacciSignal[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [lastScan, setLastScan] = useState<Date | null>(null)

  const scanForFibonacciSignals = async () => {
    setIsScanning(true)

    // Simulate AI scanning multiple stocks/indices for Fibonacci patterns
    setTimeout(() => {
      const mockSignals: FibonacciSignal[] = [
        {
          symbol: "RELIANCE",
          signal: "BUY",
          confidence: 87,
          entry: 2456.5,
          stopLoss: 2398.2,
          target1: 2520.8,
          target2: 2578.9,
          target3: 2635.4,
          currentPrice: 2456.5,
          fibLevel: "38.2% Support",
          reasoning: "Strong bounce from 38.2% Fibonacci level with high volume. RSI showing bullish divergence.",
          volume: "2.3M",
          timeframe: timeframe,
        },
        {
          symbol: "NIFTY 50",
          signal: "SELL",
          confidence: 82,
          entry: 19850.25,
          stopLoss: 19920.8,
          target1: 19720.5,
          target2: 19650.3,
          target3: 19580.75,
          currentPrice: 19850.25,
          fibLevel: "61.8% Resistance",
          reasoning: "Rejection at 61.8% Fibonacci resistance level. Bearish engulfing pattern formed.",
          volume: "1.8M",
          timeframe: timeframe,
        },
        {
          symbol: "BANKNIFTY",
          signal: "BUY",
          confidence: 91,
          entry: 44280.75,
          stopLoss: 44050.2,
          target1: 44580.9,
          target2: 44750.4,
          target3: 44920.85,
          currentPrice: 44280.75,
          fibLevel: "50% Golden Zone",
          reasoning: "Perfect bounce from 50% Fibonacci level in golden zone. Strong institutional buying observed.",
          volume: "3.1M",
          timeframe: timeframe,
        },
        {
          symbol: "TCS",
          signal: "BUY",
          confidence: 79,
          entry: 3890.4,
          stopLoss: 3825.6,
          target1: 3965.8,
          target2: 4025.9,
          target3: 4085.2,
          currentPrice: 3890.4,
          fibLevel: "23.6% Pullback",
          reasoning: "Healthy pullback to 23.6% level after strong uptrend. Volume increasing on bounce.",
          volume: "890K",
          timeframe: timeframe,
        },
        {
          symbol: "HDFC BANK",
          signal: "SELL",
          confidence: 75,
          entry: 1678.9,
          stopLoss: 1705.4,
          target1: 1645.2,
          target2: 1620.8,
          target3: 1595.5,
          currentPrice: 1678.9,
          fibLevel: "78.6% Resistance",
          reasoning: "Failed to break above 78.6% Fibonacci resistance. Weak volume on recent rallies.",
          volume: "1.2M",
          timeframe: timeframe,
        },
        {
          symbol: "INFY",
          signal: "BUY",
          confidence: 85,
          entry: 1456.3,
          stopLoss: 1420.8,
          target1: 1495.6,
          target2: 1525.4,
          target3: 1555.9,
          currentPrice: 1456.3,
          fibLevel: "38.2% Support",
          reasoning: "Strong support at 38.2% level with bullish hammer formation. FII buying increasing.",
          volume: "1.5M",
          timeframe: timeframe,
        },
      ]

      setSignals(mockSignals)
      setLastScan(new Date())
      setIsScanning(false)
    }, 3000)
  }

  useEffect(() => {
    scanForFibonacciSignals()
  }, [timeframe])

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "BUY":
        return "bg-green-500"
      case "SELL":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return "from-green-500 to-emerald-600"
    if (confidence >= 75) return "from-yellow-500 to-orange-500"
    return "from-red-500 to-pink-600"
  }

  return (
    <div className="space-y-6">
      {/* Scanner Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Fibonacci AI Scanner</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {signals.length} Signals Found
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Timeframe</label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5M">5 Minutes</SelectItem>
                    <SelectItem value="15M">15 Minutes</SelectItem>
                    <SelectItem value="1H">1 Hour</SelectItem>
                    <SelectItem value="1D">1 Day</SelectItem>
                    <SelectItem value="1W">1 Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {lastScan && (
                <div className="text-sm text-muted-foreground">Last scan: {lastScan.toLocaleTimeString()}</div>
              )}
            </div>

            <Button
              onClick={scanForFibonacciSignals}
              disabled={isScanning}
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              {isScanning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Scan
                </>
              )}
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            AI automatically scans 500+ stocks and indices for Fibonacci retracement/extension patterns and generates
            high-probability trading signals.
          </div>
        </CardContent>
      </Card>

      {/* Fibonacci Signals */}
      <div className="grid gap-4">
        {signals.map((signal, index) => (
          <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="font-bold text-lg">{signal.symbol}</div>
                  <Badge className={`${getSignalColor(signal.signal)} text-white`}>{signal.signal}</Badge>
                  <Badge variant="outline">{signal.fibLevel}</Badge>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg">₹{signal.currentPrice.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Vol: {signal.volume}</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Confidence Bar */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Confidence:</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${getConfidenceColor(signal.confidence)} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${signal.confidence}%` }}
                  ></div>
                </div>
                <span className="font-bold text-sm">{signal.confidence}%</span>
              </div>

              {/* Trade Details */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-1 mb-1">
                    <TrendingUp className="h-3 w-3 text-blue-600" />
                    <span className="text-xs font-medium">Entry</span>
                  </div>
                  <div className="font-mono text-sm">₹{signal.entry.toFixed(2)}</div>
                </div>

                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                  <div className="flex items-center space-x-1 mb-1">
                    <Shield className="h-3 w-3 text-red-600" />
                    <span className="text-xs font-medium">Stop Loss</span>
                  </div>
                  <div className="font-mono text-sm">₹{signal.stopLoss.toFixed(2)}</div>
                </div>

                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-1 mb-1">
                    <Target className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium">Target 1</span>
                  </div>
                  <div className="font-mono text-sm">₹{signal.target1.toFixed(2)}</div>
                </div>

                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-1 mb-1">
                    <Target className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium">Target 2</span>
                  </div>
                  <div className="font-mono text-sm">₹{signal.target2.toFixed(2)}</div>
                </div>

                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-1 mb-1">
                    <Target className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium">Target 3</span>
                  </div>
                  <div className="font-mono text-sm">₹{signal.target3.toFixed(2)}</div>
                </div>
              </div>

              {/* AI Reasoning */}
              <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-yellow-800 dark:text-yellow-200 text-sm mb-1">AI Analysis</div>
                    <div className="text-xs text-yellow-700 dark:text-yellow-300">{signal.reasoning}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  Execute Trade
                </Button>
                <Button size="sm" variant="outline">
                  Set Alert
                </Button>
                <Button size="sm" variant="outline">
                  View Chart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {signals.length === 0 && !isScanning && (
        <Card>
          <CardContent className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="text-lg font-medium mb-2">No Fibonacci Signals Found</div>
            <div className="text-sm text-muted-foreground">
              Click "Refresh Scan" to search for new trading opportunities
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
