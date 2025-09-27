"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bell, Plus, X } from "lucide-react"

export function BreakoutAlerts() {
  const [alerts, setAlerts] = useState([
    { id: 1, symbol: "NIFTY", level: 24500, type: "Resistance", status: "Active" },
    { id: 2, symbol: "BANKNIFTY", level: 52000, type: "Support", status: "Triggered" },
  ])
  const [newAlert, setNewAlert] = useState({ symbol: "", level: "", type: "Resistance" })

  const addAlert = () => {
    if (newAlert.symbol && newAlert.level) {
      setAlerts([
        ...alerts,
        {
          id: Date.now(),
          symbol: newAlert.symbol.toUpperCase(),
          level: Number.parseFloat(newAlert.level),
          type: newAlert.type,
          status: "Active",
        },
      ])
      setNewAlert({ symbol: "", level: "", type: "Resistance" })
    }
  }

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Breakout Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              <Input
                placeholder="Symbol"
                value={newAlert.symbol}
                onChange={(e) => setNewAlert({ ...newAlert, symbol: e.target.value })}
              />
              <Input
                placeholder="Level"
                type="number"
                value={newAlert.level}
                onChange={(e) => setNewAlert({ ...newAlert, level: e.target.value })}
              />
              <select
                className="px-3 py-2 border rounded-md"
                value={newAlert.type}
                onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
              >
                <option value="Resistance">Resistance</option>
                <option value="Support">Support</option>
              </select>
              <Button onClick={addAlert} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Active Alerts</h3>
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="font-medium">{alert.symbol}</div>
                    <div className="text-sm">₹{alert.level}</div>
                    <Badge variant="outline">{alert.type}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={alert.status === "Active" ? "default" : "destructive"}>{alert.status}</Badge>
                    <Button size="sm" variant="ghost" onClick={() => removeAlert(alert.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
