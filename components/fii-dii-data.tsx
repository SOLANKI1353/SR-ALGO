"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Download } from "lucide-react"

export function FiiDiiData() {
  const data = [
    {
      date: "18 Sep 2025",
      fiiNet: 2929.76,
      diiNet: 448.47,
      total: 3378.23,
      fiiCash: 2929.76,
      fiiDerivatives: 0,
      diiCash: 448.47,
      diiDerivatives: 0,
    },
    {
      date: "17 Sep 2025",
      fiiNet: 3310.85,
      diiNet: -1122.44,
      total: 2188.41,
      fiiCash: 3310.85,
      fiiDerivatives: 0,
      diiCash: -1122.44,
      diiDerivatives: 0,
    },
    {
      date: "16 Sep 2025",
      fiiNet: -1245.3,
      diiNet: 2156.78,
      total: 911.48,
      fiiCash: -1245.3,
      fiiDerivatives: 0,
      diiCash: 2156.78,
      diiDerivatives: 0,
    },
  ]

  const formatCurrency = (amount: number) => {
    return `₹${Math.abs(amount).toFixed(2)} Cr`
  }

  const getColorClass = (amount: number) => {
    return amount >= 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>FII & DII Data</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium">{item.date}</div>
                <Badge variant="outline" className="text-xs">
                  Net: {formatCurrency(item.total)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">FII Net Flow</div>
                  <div className={`text-lg font-bold ${getColorClass(item.fiiNet)}`}>
                    {item.fiiNet >= 0 ? "+" : ""}
                    {formatCurrency(item.fiiNet)}
                  </div>
                  <div className="text-xs text-muted-foreground">Cash: {formatCurrency(item.fiiCash)}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">DII Net Flow</div>
                  <div className={`text-lg font-bold ${getColorClass(item.diiNet)}`}>
                    {item.diiNet >= 0 ? "+" : ""}
                    {formatCurrency(item.diiNet)}
                  </div>
                  <div className="text-xs text-muted-foreground">Cash: {formatCurrency(item.diiCash)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
