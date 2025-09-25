"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function MarketHeatmap() {
  const sectors = [
    { name: "IT", change: 2.1, size: "large" },
    { name: "Banking", change: -0.8, size: "large" },
    { name: "Pharma", change: 1.5, size: "medium" },
    { name: "Auto", change: 0.9, size: "medium" },
    { name: "FMCG", change: -1.2, size: "medium" },
    { name: "Metals", change: 3.2, size: "large" },
    { name: "Oil & Gas", change: 1.8, size: "medium" },
    { name: "Realty", change: -0.5, size: "small" },
    { name: "Power", change: 2.4, size: "small" },
    { name: "Telecom", change: -1.8, size: "small" },
    { name: "Media", change: 0.3, size: "small" },
    { name: "Textiles", change: 1.1, size: "small" },
  ]

  const getColor = (change: number) => {
    if (change > 2) return "bg-green-600 text-white"
    if (change > 0) return "bg-green-500 text-white"
    if (change > -1) return "bg-red-400 text-white"
    return "bg-red-600 text-white"
  }

  const getSize = (size: string) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2"
      case "medium":
        return "col-span-2 row-span-1"
      default:
        return "col-span-1 row-span-1"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-2 h-96">
          {sectors.map((sector) => (
            <div
              key={sector.name}
              className={`
                ${getSize(sector.size)} 
                ${getColor(sector.change)}
                rounded-lg p-3 flex flex-col justify-between
                hover:opacity-80 transition-opacity cursor-pointer
              `}
            >
              <div>
                <div className="font-bold text-sm">{sector.name}</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  {sector.change > 0 ? "+" : ""}
                  {sector.change}%
                </span>
                {sector.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
