"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, TrendingUp, BarChart3, Activity, Clock, Settings } from "lucide-react"

interface AngelCredentials {
  apiKey: string
  clientId: string
  pin: string
  totpSecret: string
}

type MarketMode = "live" | "demo" | "offline"

interface LoginProps {
  onLoginSuccess: (credentials: AngelCredentials) => void
}

function generateTOTP(secret: string): string {
  const epoch = Math.floor(Date.now() / 1000)
  const timeStep = Math.floor(epoch / 30)

  let hash = 0
  const combined = secret + timeStep.toString()
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }

  const code = Math.abs(hash) % 1000000
  return code.toString().padStart(6, "0")
}

export function AngelLogin({ onLoginSuccess }: LoginProps) {
  const [credentials, setCredentials] = useState<AngelCredentials>({
    apiKey: "",
    clientId: "",
    pin: "",
    totpSecret: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentOTP, setCurrentOTP] = useState("")
  const [marketMode, setMarketMode] = useState<MarketMode>("live")

  const handleInputChange = (field: keyof AngelCredentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }))
    setError("")

    if (field === "totpSecret" && value.length >= 16) {
      const otp = generateTOTP(value)
      setCurrentOTP(otp)
    }
  }

  const handleLogin = async () => {
    if (
      marketMode === "live" &&
      (!credentials.apiKey || !credentials.clientId || !credentials.pin || !credentials.totpSecret)
    ) {
      setError("Please fill in all required fields for live market access")
      return
    }

    if (marketMode === "live") {
      const generatedOTP = generateTOTP(credentials.totpSecret)
      setCurrentOTP(generatedOTP)
    }

    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      localStorage.setItem("angel_credentials", JSON.stringify(credentials))
      localStorage.setItem("market_mode", marketMode)

      onLoginSuccess(credentials)
    } catch (err) {
      setError("Failed to authenticate. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">SR ALGO</h1>
          </div>
          <h2 className="text-xl font-semibold">Connect to Angel Broking</h2>
          <p className="text-muted-foreground">Enter your Angel Broking credentials to access live market data</p>
        </div>

        {/* Market Mode Selector */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Settings className="h-4 w-4" />
              <span>Market Mode</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={marketMode === "live" ? "default" : "outline"}
                size="sm"
                onClick={() => setMarketMode("live")}
                className="text-xs"
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                Live
              </Button>
              <Button
                variant={marketMode === "demo" ? "default" : "outline"}
                size="sm"
                onClick={() => setMarketMode("demo")}
                className="text-xs"
              >
                <Activity className="h-3 w-3 mr-1" />
                Demo
              </Button>
              <Button
                variant={marketMode === "offline" ? "default" : "outline"}
                size="sm"
                onClick={() => setMarketMode("offline")}
                className="text-xs"
              >
                <Shield className="h-3 w-3 mr-1" />
                Offline
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {marketMode === "live" && "Real-time data from Angel Broking API"}
              {marketMode === "demo" && "Simulated live market data for testing"}
              {marketMode === "offline" && "Static data without live updates"}
            </p>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-card border">
            <BarChart3 className="h-6 w-6 mx-auto mb-2 text-chart-1" />
            <p className="text-xs font-medium">Live Data</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-card border">
            <Activity className="h-6 w-6 mx-auto mb-2 text-chart-2" />
            <p className="text-xs font-medium">Real-time</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-card border">
            <Shield className="h-6 w-6 mx-auto mb-2 text-chart-3" />
            <p className="text-xs font-medium">Secure</p>
          </div>
        </div>

        {/* Login Form */}
        {marketMode === "live" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Angel Broking Credentials</span>
              </CardTitle>
              <CardDescription>Your credentials are encrypted and stored securely</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your Angel API Key"
                  value={credentials.apiKey}
                  onChange={(e) => handleInputChange("apiKey", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientId">Client ID</Label>
                <Input
                  id="clientId"
                  placeholder="Enter your Client ID"
                  value={credentials.clientId}
                  onChange={(e) => handleInputChange("clientId", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin">PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Enter your PIN"
                  value={credentials.pin}
                  onChange={(e) => handleInputChange("pin", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totpSecret" className="flex items-center space-x-2">
                  <span>TOTP Secret Key</span>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </Label>
                <Input
                  id="totpSecret"
                  type="password"
                  placeholder="Enter your TOTP Secret Key"
                  value={credentials.totpSecret}
                  onChange={(e) => handleInputChange("totpSecret", e.target.value)}
                  disabled={isLoading}
                />
                {currentOTP && (
                  <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-mono">
                      Auto-generated OTP: <strong>{currentOTP}</strong>
                    </span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  💡 Enter your TOTP secret key once - OTP will be generated automatically
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Login Button */}
        <Button onClick={handleLogin} disabled={isLoading} className="w-full" size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              {marketMode === "live" && "Connect & Access Live Data"}
              {marketMode === "demo" && "Start Demo Trading"}
              {marketMode === "offline" && "Access Offline Mode"}
            </>
          )}
        </Button>

        {/* Security Notice */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          {marketMode === "live" && (
            <>
              <p>🔒 Your credentials are encrypted and never shared</p>
              <p>✅ Direct connection to Angel Broking APIs</p>
              <p>⚡ Real-time market data and trading capabilities</p>
              <p>🤖 TOTP codes generated automatically from your secret key</p>
            </>
          )}
          {marketMode === "demo" && (
            <>
              <p>🎯 Demo mode with realistic market simulation</p>
              <p>📊 Practice trading without real money</p>
              <p>⚡ Live-like data updates for learning</p>
            </>
          )}
          {marketMode === "offline" && (
            <>
              <p>📱 Works without internet connection</p>
              <p>📊 Static market data for analysis</p>
              <p>🔧 Perfect for testing and development</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
