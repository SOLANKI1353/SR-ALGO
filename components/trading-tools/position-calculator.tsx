"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, AlertTriangle } from "lucide-react"

export function PositionCalculator() {
  const [capital, setCapital] = useState("")
  const [riskPercent, setRiskPercent] = useState("2")
  const [entryPrice, setEntryPrice] = useState("")
  const [stopLoss, setStopLoss] = useState("")
  const [target, setTarget] = useState("")
  const [tradeType, setTradeType] = useState("equity")
  const [result, setResult] = useState<any>(null)

  const calculatePosition = () => {
    const capitalAmount = Number.parseFloat(capital)
    const riskPercentage = Number.parseFloat(riskPercent)
    const entry = Number.parseFloat(entryPrice)
    const sl = Number.parseFloat(stopLoss)
    const tgt = Number.parseFloat(target)

    if (!capitalAmount || !riskPercentage || !entry || !sl) return

    const riskAmount = (capitalAmount * riskPercentage) / 100
    const riskPerShare = Math.abs(entry - sl)
    const quantity = Math.floor(riskAmount / riskPerShare)
    const positionValue = quantity * entry
    const potentialLoss = quantity * riskPerShare
    const potentialProfit = tgt ? quantity * Math.abs(tgt - entry) : 0
    const riskRewardRatio = potentialProfit / potentialLoss

    setResult({
      quantity,
      positionValue,
      riskAmount: potentialLoss,
      potentialProfit,
      riskRewardRatio,
      marginRequired: tradeType === "futures" ? positionValue * 0.15 : positionValue,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Position Size Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="capital">Total Capital (₹)</Label>
                <Input id="capital" placeholder="100000" value={capital} onChange={(e) => setCapital(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="risk">Risk Per Trade (%)</Label>
                <Select value={riskPercent} onValueChange={setRiskPercent}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1%</SelectItem>
                    <SelectItem value="2">2%</SelectItem>
                    <SelectItem value="3">3%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tradeType">Trade Type</Label>
                <Select value={tradeType} onValueChange={setTradeType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equity">Equity</SelectItem>
                    <SelectItem value="futures">Futures</SelectItem>
                    <SelectItem value="options">Options</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="entry">Entry Price (₹)</Label>
                <Input
                  id="entry"
                  placeholder="1000"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="stopLoss">Stop Loss (₹)</Label>
                <Input id="stopLoss" placeholder="950" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="target">Target Price (₹)</Label>
                <Input id="target" placeholder="1100" value={target} onChange={(e) => setTarget(e.target.value)} />
              </div>
            </div>
          </div>

          <Button onClick={calculatePosition} className="w-full mt-6">
            Calculate Position Size
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Position Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-bold">{result.quantity} shares</span>
                </div>
                <div className="flex justify-between">
                  <span>Position Value:</span>
                  <span className="font-bold">₹{result.positionValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Margin Required:</span>
                  <span className="font-bold">₹{result.marginRequired.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Amount:</span>
                  <span className="font-bold text-red-600">₹{result.riskAmount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span>Risk Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Potential Profit:</span>
                  <span className="font-bold text-green-600">₹{result.potentialProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk:Reward Ratio:</span>
                  <span className={`font-bold ${result.riskRewardRatio >= 2 ? "text-green-600" : "text-red-600"}`}>
                    1:{result.riskRewardRatio.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Capital at Risk:</span>
                  <span className="font-bold">{riskPercent}%</span>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    {result.riskRewardRatio >= 2 ? "✅ Good risk-reward ratio" : "⚠️ Consider better risk-reward ratio"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
