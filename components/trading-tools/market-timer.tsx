"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Globe, Calendar } from "lucide-react"

export function MarketTimer() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const marketSessions = [
    {
      name: "NSE/BSE",
      country: "India",
      preOpen: "09:00",
      open: "09:15",
      close: "15:30",
      timezone: "IST",
      status: "Open",
    },
    {
      name: "NYSE",
      country: "USA",
      preOpen: "04:00",
      open: "09:30",
      close: "16:00",
      timezone: "EST",
      status: "Closed",
    },
    {
      name: "NASDAQ",
      country: "USA",
      preOpen: "04:00",
      open: "09:30",
      close: "16:00",
      timezone: "EST",
      status: "Closed",
    },
    {
      name: "LSE",
      country: "UK",
      preOpen: "08:00",
      open: "08:00",
      close: "16:30",
      timezone: "GMT",
      status: "Closed",
    },
    {
      name: "TSE",
      country: "Japan",
      preOpen: "08:00",
      open: "09:00",
      close: "15:00",
      timezone: "JST",
      status: "Closed",
    },
  ]

  const economicEvents = [
    { time: "10:30", event: "Industrial Production", impact: "High", country: "IN" },
    { time: "14:00", event: "RBI Policy Decision", impact: "High", country: "IN" },
    { time: "19:00", event: "Fed Minutes", impact: "Medium", country: "US" },
    { time: "21:30", event: "GDP Data", impact: "High", country: "US" },
  ]

  return (
    <div className="space-y-6">
      {/* Current Time */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Market Timer</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {currentTime.toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour12: false,
              })}
            </div>
            <div className="text-lg text-muted-foreground">
              {currentTime.toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Global Market Sessions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketSessions.map((session) => (
              <div key={session.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-bold">{session.name}</div>
                    <div className="text-sm text-muted-foreground">{session.country}</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm">
                    Pre: {session.preOpen} | Open: {session.open} - {session.close}
                  </div>
                  <div className="text-xs text-muted-foreground">{session.timezone}</div>
                </div>
                <Badge variant={session.status === "Open" ? "default" : "secondary"}>{session.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Economic Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Today's Economic Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {economicEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="font-bold text-lg">{event.time}</div>
                  <div>
                    <div className="font-medium">{event.event}</div>
                    <div className="text-sm text-muted-foreground">{event.country}</div>
                  </div>
                </div>
                <Badge
                  variant={
                    event.impact === "High" ? "destructive" : event.impact === "Medium" ? "default" : "secondary"
                  }
                >
                  {event.impact}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">OPEN</div>
            <div className="text-sm text-muted-foreground">NSE/BSE Status</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">5h 45m</div>
            <div className="text-sm text-muted-foreground">Time to Close</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">17h 30m</div>
            <div className="text-sm text-muted-foreground">Next Open</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
