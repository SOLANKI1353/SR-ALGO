"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Bell,
  Settings,
  User,
  Moon,
  Sun,
  TrendingUp,
  BarChart3,
  PieChart,
  Zap,
  Target,
  Activity,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  marketMode?: "live" | "demo" | "offline"
  onLogout?: () => void
}

export function Navigation({ activeTab, setActiveTab, marketMode = "offline", onLogout }: NavigationProps) {
  const { theme, setTheme } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [activeSettingsPanel, setActiveSettingsPanel] = useState<string | null>(null)
  const [showMarketModeSelector, setShowMarketModeSelector] = useState(false)

  const [activeUserPanel, setActiveUserPanel] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  const [refreshInterval, setRefreshInterval] = useState("5 sec")
  const [defaultTimeframe, setDefaultTimeframe] = useState("1D")
  const [riskTolerance, setRiskTolerance] = useState("Medium")
  const [positionSize, setPositionSize] = useState("2%")
  const [breakoutAlerts, setBreakoutAlerts] = useState(true)
  const [volumeAlerts, setVolumeAlerts] = useState(true)
  const [priceAlerts, setPriceAlerts] = useState(true)
  const [newsAlerts, setNewsAlerts] = useState(false)
  const [chartType, setChartType] = useState("Candlestick")
  const [colorScheme, setColorScheme] = useState("Green/Red")
  const [density, setDensity] = useState("Compact")
  const [animations, setAnimations] = useState(true)
  const [apiKey, setApiKey] = useState("")
  const [dataProvider, setDataProvider] = useState("NSE Real-time")

  const [nseData, setNseData] = useState(true)
  const [bseData, setBseData] = useState(true)
  const [mcxData, setMcxData] = useState(false)
  const [currencyData, setCurrencyData] = useState(true)

  const navItems = [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "screener", label: "Stock Screener", icon: Target },
    { id: "signals", label: "AI Signals", icon: Zap },
    { id: "sectors", label: "Sectoral Analysis", icon: PieChart },
    { id: "tools", label: "Trading Tools", icon: Activity },
  ]

  const cycleRefreshInterval = () => {
    const intervals = ["1 sec", "5 sec", "10 sec", "30 sec", "1 min"]
    const currentIndex = intervals.indexOf(refreshInterval)
    setRefreshInterval(intervals[(currentIndex + 1) % intervals.length])
  }

  const cycleTimeframe = () => {
    const timeframes = ["1m", "5m", "15m", "1H", "1D", "1W"]
    const currentIndex = timeframes.indexOf(defaultTimeframe)
    setDefaultTimeframe(timeframes[(currentIndex + 1) % timeframes.length])
  }

  const cycleRiskTolerance = () => {
    const risks = ["Low", "Medium", "High", "Aggressive"]
    const currentIndex = risks.indexOf(riskTolerance)
    setRiskTolerance(risks[(currentIndex + 1) % risks.length])
  }

  const cyclePositionSize = () => {
    const sizes = ["1%", "2%", "3%", "5%", "10%"]
    const currentIndex = sizes.indexOf(positionSize)
    setPositionSize(sizes[(currentIndex + 1) % sizes.length])
  }

  const cycleChartType = () => {
    const types = ["Candlestick", "Line", "Bar", "Area"]
    const currentIndex = types.indexOf(chartType)
    setChartType(types[(currentIndex + 1) % types.length])
  }

  const cycleColorScheme = () => {
    const schemes = ["Green/Red", "Blue/Orange", "Dark/Light"]
    const currentIndex = schemes.indexOf(colorScheme)
    setColorScheme(schemes[(currentIndex + 1) % schemes.length])
  }

  const cycleDensity = () => {
    const densities = ["Compact", "Normal", "Comfortable"]
    const currentIndex = densities.indexOf(density)
    setDensity(densities[(currentIndex + 1) % densities.length])
  }

  const cycleDataProvider = () => {
    const providers = ["NSE Real-time", "BSE Live", "Multi-Exchange", "Premium Feed"]
    const currentIndex = providers.indexOf(dataProvider)
    setDataProvider(providers[(currentIndex + 1) % providers.length])
  }

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications)
    setShowUserMenu(false)
    setShowSettings(false)
    setActiveSettingsPanel(null)
  }

  const handleSettingsClick = () => {
    setShowSettings(!showSettings)
    setShowNotifications(false)
    setShowUserMenu(false)
    if (!showSettings) setActiveSettingsPanel(null)
  }

  const handleUserClick = () => {
    setShowUserMenu(!showUserMenu)
    setShowNotifications(false)
    setShowSettings(false)
    setActiveSettingsPanel(null)
    if (showUserMenu) {
      setActiveUserPanel(null)
    }
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    setShowUserMenu(false)
  }

  const handleSettingsOption = (option: string) => {
    setActiveSettingsPanel(option)
  }

  const handleBackToSettings = () => {
    setActiveSettingsPanel(null)
  }

  const handleMarketModeChange = (mode: "live" | "demo" | "offline") => {
    // Assuming marketMode is a state variable that needs to be updated
    // If marketMode is a prop, this logic might need adjustment
    // For now, let's assume it's a prop and we need to update it via a callback if provided,
    // or manage it internally if it's meant to be a local state.
    // Since it's a prop with a default, we'll assume it's managed externally or we need to add a state for it.
    // For the purpose of this merge, let's assume we need to update the prop if it's mutable or manage it internally.
    // Given the context, it's likely intended to be managed internally or via a setter if passed.
    // Let's add a placeholder for updating the marketMode if it were a state variable.
    // If it's a prop, the parent component would need to handle the change.
    // For now, we'll just close the selector.
    setShowMarketModeSelector(false)
    // If marketMode was a state variable: setMarketMode(mode);
    console.log("Market mode changed to:", mode) // Placeholder for actual state update
  }

  const handleUserMenuOption = (option: string) => {
    setActiveUserPanel(option)
  }

  const handleBackToUserMenu = () => {
    setActiveUserPanel(null)
  }

  const renderSettingsPanel = () => {
    switch (activeSettingsPanel) {
      case "trading-preferences":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setActiveSettingsPanel(null)}>
                ← Back
              </Button>
              <h3 className="font-semibold">Trading Preferences</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-refresh data</span>
                <Button variant="outline" size="sm" onClick={cycleRefreshInterval}>
                  {refreshInterval}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Default timeframe</span>
                <Button variant="outline" size="sm" onClick={cycleTimeframe}>
                  {defaultTimeframe}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Risk tolerance</span>
                <Button variant="outline" size="sm" onClick={cycleRiskTolerance}>
                  {riskTolerance}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Position size</span>
                <Button variant="outline" size="sm" onClick={cyclePositionSize}>
                  {positionSize}
                </Button>
              </div>
            </div>
          </div>
        )
      case "alert-settings":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setActiveSettingsPanel(null)}>
                ← Back
              </Button>
              <h3 className="font-semibold">Alert Settings</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Breakout alerts</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBreakoutAlerts(!breakoutAlerts)}
                  className={breakoutAlerts ? "bg-green-500 text-white" : ""}
                >
                  {breakoutAlerts ? "ON" : "OFF"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Volume surge alerts</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVolumeAlerts(!volumeAlerts)}
                  className={volumeAlerts ? "bg-green-500 text-white" : ""}
                >
                  {volumeAlerts ? "ON" : "OFF"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Price alerts</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPriceAlerts(!priceAlerts)}
                  className={priceAlerts ? "bg-green-500 text-white" : ""}
                >
                  {priceAlerts ? "ON" : "OFF"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">News alerts</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNewsAlerts(!newsAlerts)}
                  className={newsAlerts ? "bg-green-500 text-white" : ""}
                >
                  {newsAlerts ? "ON" : "OFF"}
                </Button>
              </div>
            </div>
          </div>
        )
      case "display-options":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setActiveSettingsPanel(null)}>
                ← Back
              </Button>
              <h3 className="font-semibold">Display Options</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Chart type</span>
                <Button variant="outline" size="sm" onClick={cycleChartType}>
                  {chartType}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Color scheme</span>
                <Button variant="outline" size="sm" onClick={cycleColorScheme}>
                  {colorScheme}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Density</span>
                <Button variant="outline" size="sm" onClick={cycleDensity}>
                  {density}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Animations</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAnimations(!animations)}
                  className={animations ? "bg-green-500 text-white" : ""}
                >
                  {animations ? "ON" : "OFF"}
                </Button>
              </div>
            </div>
          </div>
        )
      case "api-configuration":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setActiveSettingsPanel(null)}>
                ← Back
              </Button>
              <h3 className="font-semibold">API Configuration</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">API Key</label>
                <Input
                  placeholder="Enter your API key"
                  className="mt-1"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  type="password"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Data Provider</label>
                <Button variant="outline" size="sm" className="w-full mt-1 bg-transparent" onClick={cycleDataProvider}>
                  {dataProvider}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Connection status</span>
                <Badge variant="default" className="bg-green-500">
                  Connected
                </Badge>
              </div>
              <Button variant="default" size="sm" className="w-full">
                Save Configuration
              </Button>
            </div>
          </div>
        )
      case "data-sources":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setActiveSettingsPanel(null)}>
                ← Back
              </Button>
              <h3 className="font-semibold">Data Sources</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">NSE Data</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNseData(!nseData)}
                  className={nseData ? "bg-green-500 text-white" : ""}
                >
                  {nseData ? "Active" : "Inactive"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">BSE Data</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBseData(!bseData)}
                  className={bseData ? "bg-green-500 text-white" : ""}
                >
                  {bseData ? "Active" : "Inactive"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">MCX Data</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMcxData(!mcxData)}
                  className={mcxData ? "bg-green-500 text-white" : ""}
                >
                  {mcxData ? "Active" : "Inactive"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Currency Data</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrencyData(!currencyData)}
                  className={currencyData ? "bg-green-500 text-white" : ""}
                >
                  {currencyData ? "Active" : "Inactive"}
                </Button>
              </div>
            </div>
          </div>
        )
      case "help-support":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setActiveSettingsPanel(null)}>
                ← Back
              </Button>
              <h3 className="font-semibold">Help & Support</h3>
            </div>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                📚 User Guide
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                🎥 Video Tutorials
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                💬 Live Chat Support
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                📧 Email Support
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                🐛 Report Bug
              </Button>
            </div>
          </div>
        )
      case "about":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setActiveSettingsPanel(null)}>
                ← Back
              </Button>
              <h3 className="font-semibold">About SR ALGO</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">SR ALGO Trading Platform</p>
                <p className="text-muted-foreground">Version 2.1.0</p>
              </div>
              <div>
                <p className="font-medium">Features</p>
                <p className="text-muted-foreground">
                  AI-powered trading signals, Real-time market data, Advanced analytics
                </p>
              </div>
              <div>
                <p className="font-medium">License</p>
                <p className="text-muted-foreground">Premium Trading License</p>
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Check for Updates
              </Button>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleSettingsOption("trading-preferences")}
            >
              Trading Preferences
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleSettingsOption("alert-settings")}
            >
              Alert Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleSettingsOption("display-options")}
            >
              Display Options
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleSettingsOption("api-configuration")}
            >
              API Configuration
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleSettingsOption("data-sources")}
            >
              Data Sources
            </Button>
            <hr className="my-2" />
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleSettingsOption("help-support")}
            >
              Help & Support
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleSettingsOption("about")}
            >
              About SR ALGO
            </Button>
          </div>
        )
    }
  }

  const searchData = [
    // Major Indices
    { symbol: "NIFTY 50", name: "NIFTY 50 Index", type: "Index", price: "24,320.50", tradingViewSymbol: "NSE:NIFTY" },
    {
      symbol: "BANKNIFTY",
      name: "Bank NIFTY Index",
      type: "Index",
      price: "52,180.75",
      tradingViewSymbol: "NSE:BANKNIFTY",
    },
    {
      symbol: "FINNIFTY",
      name: "Financial Services Index",
      type: "Index",
      price: "23,450.20",
      tradingViewSymbol: "NSE:FINNIFTY",
    },
    {
      symbol: "MIDCPNIFTY",
      name: "NIFTY MidCap Select",
      type: "Index",
      price: "12,890.30",
      tradingViewSymbol: "NSE:MIDCPNIFTY",
    },
    { symbol: "NIFTY IT", name: "NIFTY IT Index", type: "Index", price: "42,150.80", tradingViewSymbol: "NSE:CNXIT" },
    {
      symbol: "NIFTY AUTO",
      name: "NIFTY Auto Index",
      type: "Index",
      price: "23,890.45",
      tradingViewSymbol: "NSE:CNXAUTO",
    },
    {
      symbol: "NIFTY PHARMA",
      name: "NIFTY Pharma Index",
      type: "Index",
      price: "21,567.30",
      tradingViewSymbol: "NSE:CNXPHARMA",
    },
    {
      symbol: "NIFTY FMCG",
      name: "NIFTY FMCG Index",
      type: "Index",
      price: "56,234.90",
      tradingViewSymbol: "NSE:CNXFMCG",
    },
    {
      symbol: "NIFTY METAL",
      name: "NIFTY Metal Index",
      type: "Index",
      price: "8,945.60",
      tradingViewSymbol: "NSE:CNXMETAL",
    },
    {
      symbol: "NIFTY ENERGY",
      name: "NIFTY Energy Index",
      type: "Index",
      price: "34,567.80",
      tradingViewSymbol: "NSE:CNXENERGY",
    },
    {
      symbol: "NIFTY REALTY",
      name: "NIFTY Realty Index",
      type: "Index",
      price: "890.45",
      tradingViewSymbol: "NSE:CNXREALTY",
    },
    {
      symbol: "NIFTY MEDIA",
      name: "NIFTY Media Index",
      type: "Index",
      price: "1,789.60",
      tradingViewSymbol: "NSE:CNXMEDIA",
    },
    {
      symbol: "NIFTY PSU BANK",
      name: "NIFTY PSU Bank Index",
      type: "Index",
      price: "4,567.80",
      tradingViewSymbol: "NSE:CNXPSUBANK",
    },
    {
      symbol: "NIFTY PVT BANK",
      name: "NIFTY Private Bank Index",
      type: "Index",
      price: "25,890.30",
      tradingViewSymbol: "NSE:CNXPVTBANK",
    },
    { symbol: "SENSEX", name: "BSE SENSEX", type: "Index", price: "79,890.10", tradingViewSymbol: "BSE:SENSEX" },
    { symbol: "BSE 100", name: "BSE 100 Index", type: "Index", price: "18,456.70", tradingViewSymbol: "BSE:BSE100" },
    { symbol: "BSE 200", name: "BSE 200 Index", type: "Index", price: "12,345.80", tradingViewSymbol: "BSE:BSE200" },
    { symbol: "BSE 500", name: "BSE 500 Index", type: "Index", price: "34,567.90", tradingViewSymbol: "BSE:BSE500" },
    {
      symbol: "BSE MIDCAP",
      name: "BSE MidCap Index",
      type: "Index",
      price: "45,678.20",
      tradingViewSymbol: "BSE:BSEMIDCAP",
    },
    {
      symbol: "BSE SMALLCAP",
      name: "BSE SmallCap Index",
      type: "Index",
      price: "56,789.40",
      tradingViewSymbol: "BSE:BSESMALLCAP",
    },

    // Banking Stocks
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Limited",
      type: "Banking",
      price: "1,635.20",
      tradingViewSymbol: "NSE:HDFCBANK",
    },
    {
      symbol: "ICICIBANK",
      name: "ICICI Bank Limited",
      type: "Banking",
      price: "1,245.60",
      tradingViewSymbol: "NSE:ICICIBANK",
    },
    { symbol: "SBIN", name: "State Bank of India", type: "Banking", price: "825.40", tradingViewSymbol: "NSE:SBIN" },
    {
      symbol: "AXISBANK",
      name: "Axis Bank Limited",
      type: "Banking",
      price: "1,156.80",
      tradingViewSymbol: "NSE:AXISBANK",
    },
    {
      symbol: "KOTAKBANK",
      name: "Kotak Mahindra Bank",
      type: "Banking",
      price: "1,789.30",
      tradingViewSymbol: "NSE:KOTAKBANK",
    },
    {
      symbol: "INDUSINDBK",
      name: "IndusInd Bank Limited",
      type: "Banking",
      price: "1,456.90",
      tradingViewSymbol: "NSE:INDUSINDBK",
    },
    {
      symbol: "FEDERALBNK",
      name: "Federal Bank Limited",
      type: "Banking",
      price: "189.45",
      tradingViewSymbol: "NSE:FEDERALBNK",
    },
    {
      symbol: "BANDHANBNK",
      name: "Bandhan Bank Limited",
      type: "Banking",
      price: "234.60",
      tradingViewSymbol: "NSE:BANDHANBNK",
    },
    {
      symbol: "IDFCFIRSTB",
      name: "IDFC First Bank Limited",
      type: "Banking",
      price: "78.90",
      tradingViewSymbol: "NSE:IDFCFIRSTB",
    },
    { symbol: "PNB", name: "Punjab National Bank", type: "Banking", price: "145.30", tradingViewSymbol: "NSE:PNB" },
    {
      symbol: "BANKBARODA",
      name: "Bank of Baroda",
      type: "Banking",
      price: "234.80",
      tradingViewSymbol: "NSE:BANKBARODA",
    },
    { symbol: "CANBK", name: "Canara Bank", type: "Banking", price: "156.70", tradingViewSymbol: "NSE:CANBK" },
    {
      symbol: "UNIONBANK",
      name: "Union Bank of India",
      type: "Banking",
      price: "123.45",
      tradingViewSymbol: "NSE:UNIONBANK",
    },
    { symbol: "IOB", name: "Indian Overseas Bank", type: "Banking", price: "67.80", tradingViewSymbol: "NSE:IOB" },
    {
      symbol: "CENTRALBK",
      name: "Central Bank of India",
      type: "Banking",
      price: "45.60",
      tradingViewSymbol: "NSE:CENTRALBK",
    },

    // IT Stocks
    { symbol: "TCS", name: "Tata Consultancy Services", type: "IT", price: "3,950.75", tradingViewSymbol: "NSE:TCS" },
    { symbol: "INFY", name: "Infosys Limited", type: "IT", price: "1,789.90", tradingViewSymbol: "NSE:INFY" },
    { symbol: "WIPRO", name: "Wipro Limited", type: "IT", price: "567.25", tradingViewSymbol: "NSE:WIPRO" },
    { symbol: "HCLTECH", name: "HCL Technologies", type: "IT", price: "1,456.80", tradingViewSymbol: "NSE:HCLTECH" },
    { symbol: "TECHM", name: "Tech Mahindra", type: "IT", price: "1,678.45", tradingViewSymbol: "NSE:TECHM" },
    { symbol: "LTI", name: "LTI Mindtree Limited", type: "IT", price: "5,234.60", tradingViewSymbol: "NSE:LTI" },
    { symbol: "MPHASIS", name: "Mphasis Limited", type: "IT", price: "2,890.40", tradingViewSymbol: "NSE:MPHASIS" },
    { symbol: "COFORGE", name: "Coforge Limited", type: "IT", price: "6,789.20", tradingViewSymbol: "NSE:COFORGE" },
    {
      symbol: "PERSISTENT",
      name: "Persistent Systems",
      type: "IT",
      price: "5,456.80",
      tradingViewSymbol: "NSE:PERSISTENT",
    },
    { symbol: "MINDTREE", name: "Mindtree Limited", type: "IT", price: "4,567.30", tradingViewSymbol: "NSE:MINDTREE" },

    // Auto Stocks
    {
      symbol: "MARUTI",
      name: "Maruti Suzuki India",
      type: "Auto",
      price: "12,450.30",
      tradingViewSymbol: "NSE:MARUTI",
    },
    {
      symbol: "TATAMOTORS",
      name: "Tata Motors Limited",
      type: "Auto",
      price: "1,045.60",
      tradingViewSymbol: "NSE:TATAMOTORS",
    },
    { symbol: "M&M", name: "Mahindra & Mahindra", type: "Auto", price: "2,890.75", tradingViewSymbol: "NSE:M&M" },
    {
      symbol: "BAJAJ-AUTO",
      name: "Bajaj Auto Limited",
      type: "Auto",
      price: "9,567.20",
      tradingViewSymbol: "NSE:BAJAJ-AUTO",
    },
    {
      symbol: "HEROMOTOCO",
      name: "Hero MotoCorp Limited",
      type: "Auto",
      price: "4,789.60",
      tradingViewSymbol: "NSE:HEROMOTOCO",
    },
    {
      symbol: "EICHERMOT",
      name: "Eicher Motors Limited",
      type: "Auto",
      price: "4,567.80",
      tradingViewSymbol: "NSE:EICHERMOT",
    },
    {
      symbol: "TVSMOTOR",
      name: "TVS Motor Company",
      type: "Auto",
      price: "2,345.90",
      tradingViewSymbol: "NSE:TVSMOTOR",
    },
    {
      symbol: "ASHOKLEY",
      name: "Ashok Leyland Limited",
      type: "Auto",
      price: "189.45",
      tradingViewSymbol: "NSE:ASHOKLEY",
    },
    {
      symbol: "BHARATFORG",
      name: "Bharat Forge Limited",
      type: "Auto",
      price: "1,456.70",
      tradingViewSymbol: "NSE:BHARATFORG",
    },
    {
      symbol: "MOTHERSUMI",
      name: "Motherson Sumi Systems",
      type: "Auto",
      price: "234.80",
      tradingViewSymbol: "NSE:MOTHERSUMI",
    },

    // FMCG Stocks
    {
      symbol: "HINDUNILVR",
      name: "Hindustan Unilever",
      type: "FMCG",
      price: "2,456.80",
      tradingViewSymbol: "NSE:HINDUNILVR",
    },
    { symbol: "ITC", name: "ITC Limited", type: "FMCG", price: "456.75", tradingViewSymbol: "NSE:ITC" },
    {
      symbol: "NESTLEIND",
      name: "Nestle India Limited",
      type: "FMCG",
      price: "2,234.50",
      tradingViewSymbol: "NSE:NESTLEIND",
    },
    {
      symbol: "BRITANNIA",
      name: "Britannia Industries",
      type: "FMCG",
      price: "4,890.25",
      tradingViewSymbol: "NSE:BRITANNIA",
    },
    { symbol: "DABUR", name: "Dabur India Limited", type: "FMCG", price: "567.80", tradingViewSymbol: "NSE:DABUR" },
    {
      symbol: "GODREJCP",
      name: "Godrej Consumer Products",
      type: "FMCG",
      price: "1,234.60",
      tradingViewSymbol: "NSE:GODREJCP",
    },
    { symbol: "MARICO", name: "Marico Limited", type: "FMCG", price: "589.40", tradingViewSymbol: "NSE:MARICO" },
    {
      symbol: "COLPAL",
      name: "Colgate Palmolive India",
      type: "FMCG",
      price: "2,789.30",
      tradingViewSymbol: "NSE:COLPAL",
    },
    { symbol: "EMAMILTD", name: "Emami Limited", type: "FMCG", price: "456.90", tradingViewSymbol: "NSE:EMAMILTD" },
    { symbol: "VBL", name: "Varun Beverages Limited", type: "FMCG", price: "1,567.80", tradingViewSymbol: "NSE:VBL" },

    // Energy & Oil
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      type: "Energy",
      price: "2,847.50",
      tradingViewSymbol: "NSE:RELIANCE",
    },
    { symbol: "ONGC", name: "Oil & Natural Gas Corp", type: "Energy", price: "245.80", tradingViewSymbol: "NSE:ONGC" },
    { symbol: "IOC", name: "Indian Oil Corporation", type: "Energy", price: "156.90", tradingViewSymbol: "NSE:IOC" },
    { symbol: "BPCL", name: "Bharat Petroleum Corp", type: "Energy", price: "289.45", tradingViewSymbol: "NSE:BPCL" },
    {
      symbol: "HPCL",
      name: "Hindustan Petroleum Corp",
      type: "Energy",
      price: "345.60",
      tradingViewSymbol: "NSE:HPCL",
    },
    { symbol: "GAIL", name: "GAIL India Limited", type: "Energy", price: "189.70", tradingViewSymbol: "NSE:GAIL" },
    { symbol: "NTPC", name: "NTPC Limited", type: "Energy", price: "345.80", tradingViewSymbol: "NSE:NTPC" },
    {
      symbol: "POWERGRID",
      name: "Power Grid Corp of India",
      type: "Energy",
      price: "234.50",
      tradingViewSymbol: "NSE:POWERGRID",
    },
    {
      symbol: "COALINDIA",
      name: "Coal India Limited",
      type: "Energy",
      price: "456.30",
      tradingViewSymbol: "NSE:COALINDIA",
    },
    {
      symbol: "ADANIGREEN",
      name: "Adani Green Energy",
      type: "Energy",
      price: "1,789.60",
      tradingViewSymbol: "NSE:ADANIGREEN",
    },

    // Pharma Stocks
    {
      symbol: "SUNPHARMA",
      name: "Sun Pharmaceutical",
      type: "Pharma",
      price: "1,789.60",
      tradingViewSymbol: "NSE:SUNPHARMA",
    },
    {
      symbol: "DRREDDY",
      name: "Dr. Reddy's Laboratories",
      type: "Pharma",
      price: "6,234.80",
      tradingViewSymbol: "NSE:DRREDDY",
    },
    { symbol: "CIPLA", name: "Cipla Limited", type: "Pharma", price: "1,456.30", tradingViewSymbol: "NSE:CIPLA" },
    {
      symbol: "DIVISLAB",
      name: "Divi's Laboratories",
      type: "Pharma",
      price: "5,678.90",
      tradingViewSymbol: "NSE:DIVISLAB",
    },
    { symbol: "BIOCON", name: "Biocon Limited", type: "Pharma", price: "234.50", tradingViewSymbol: "NSE:BIOCON" },
    { symbol: "LUPIN", name: "Lupin Limited", type: "Pharma", price: "1,234.80", tradingViewSymbol: "NSE:LUPIN" },
    {
      symbol: "AUROPHARMA",
      name: "Aurobindo Pharma",
      type: "Pharma",
      price: "1,089.40",
      tradingViewSymbol: "NSE:AUROPHARMA",
    },
    {
      symbol: "CADILAHC",
      name: "Cadila Healthcare",
      type: "Pharma",
      price: "567.90",
      tradingViewSymbol: "NSE:CADILAHC",
    },
    {
      symbol: "TORNTPHARM",
      name: "Torrent Pharmaceuticals",
      type: "Pharma",
      price: "3,456.70",
      tradingViewSymbol: "NSE:TORNTPHARM",
    },
    { symbol: "ALKEM", name: "Alkem Laboratories", type: "Pharma", price: "5,234.60", tradingViewSymbol: "NSE:ALKEM" },

    // Metals & Mining
    {
      symbol: "TATASTEEL",
      name: "Tata Steel Limited",
      type: "Metals",
      price: "145.60",
      tradingViewSymbol: "NSE:TATASTEEL",
    },
    {
      symbol: "HINDALCO",
      name: "Hindalco Industries",
      type: "Metals",
      price: "567.80",
      tradingViewSymbol: "NSE:HINDALCO",
    },
    {
      symbol: "JSWSTEEL",
      name: "JSW Steel Limited",
      type: "Metals",
      price: "890.45",
      tradingViewSymbol: "NSE:JSWSTEEL",
    },
    { symbol: "VEDL", name: "Vedanta Limited", type: "Metals", price: "456.70", tradingViewSymbol: "NSE:VEDL" },
    {
      symbol: "SAIL",
      name: "Steel Authority of India",
      type: "Metals",
      price: "123.45",
      tradingViewSymbol: "NSE:SAIL",
    },
    {
      symbol: "JINDALSTEL",
      name: "Jindal Steel & Power",
      type: "Metals",
      price: "789.60",
      tradingViewSymbol: "NSE:JINDALSTEL",
    },
    { symbol: "NMDC", name: "NMDC Limited", type: "Metals", price: "234.80", tradingViewSymbol: "NSE:NMDC" },
    { symbol: "MOIL", name: "MOIL Limited", type: "Metals", price: "189.40", tradingViewSymbol: "NSE:MOIL" },
    {
      symbol: "HINDZINC",
      name: "Hindustan Zinc Limited",
      type: "Metals",
      price: "345.70",
      tradingViewSymbol: "NSE:HINDZINC",
    },
    {
      symbol: "NATIONALUM",
      name: "National Aluminium Co",
      type: "Metals",
      price: "156.90",
      tradingViewSymbol: "NSE:NATIONALUM",
    },

    // Telecom Stocks
    {
      symbol: "BHARTIARTL",
      name: "Bharti Airtel Limited",
      type: "Telecom",
      price: "1,567.80",
      tradingViewSymbol: "NSE:BHARTIARTL",
    },
    { symbol: "RJIO", name: "Reliance Jio Infocomm", type: "Telecom", price: "234.50", tradingViewSymbol: "NSE:RJIO" },
    { symbol: "IDEA", name: "Vodafone Idea Limited", type: "Telecom", price: "12.45", tradingViewSymbol: "NSE:IDEA" },
    { symbol: "MTNL", name: "Mahanagar Telephone", type: "Telecom", price: "23.60", tradingViewSymbol: "NSE:MTNL" },
    { symbol: "BSNL", name: "Bharat Sanchar Nigam", type: "Telecom", price: "45.80", tradingViewSymbol: "NSE:BSNL" },

    // Cement Stocks
    {
      symbol: "ULTRACEMCO",
      name: "UltraTech Cement",
      type: "Cement",
      price: "10,234.50",
      tradingViewSymbol: "NSE:ULTRACEMCO",
    },
    {
      symbol: "SHREECEM",
      name: "Shree Cement Limited",
      type: "Cement",
      price: "26,789.60",
      tradingViewSymbol: "NSE:SHREECEM",
    },
    { symbol: "GRASIM", name: "Grasim Industries", type: "Cement", price: "2,456.80", tradingViewSymbol: "NSE:GRASIM" },
    { symbol: "ACC", name: "ACC Limited", type: "Cement", price: "2,234.70", tradingViewSymbol: "NSE:ACC" },
    {
      symbol: "AMBUJACEMENT",
      name: "Ambuja Cements",
      type: "Cement",
      price: "567.90",
      tradingViewSymbol: "NSE:AMBUJACEMENT",
    },
    {
      symbol: "JKCEMENT",
      name: "JK Cement Limited",
      type: "Cement",
      price: "3,789.40",
      tradingViewSymbol: "NSE:JKCEMENT",
    },
    {
      symbol: "RAMCOCEM",
      name: "Ramco Cements Limited",
      type: "Cement",
      price: "1,234.60",
      tradingViewSymbol: "NSE:RAMCOCEM",
    },

    // Infrastructure Stocks
    {
      symbol: "L&TFH",
      name: "L&T Finance Holdings",
      type: "Infrastructure",
      price: "145.60",
      tradingViewSymbol: "NSE:L&TFH",
    },
    { symbol: "LT", name: "Larsen & Toubro", type: "Infrastructure", price: "3,567.80", tradingViewSymbol: "NSE:LT" },
    {
      symbol: "IRCTC",
      name: "Indian Railway Catering",
      type: "Infrastructure",
      price: "789.40",
      tradingViewSymbol: "NSE:IRCTC",
    },
    {
      symbol: "GMRINFRA",
      name: "GMR Infrastructure",
      type: "Infrastructure",
      price: "67.80",
      tradingViewSymbol: "NSE:GMRINFRA",
    },
    {
      symbol: "ADANIPORTS",
      name: "Adani Ports & SEZ",
      type: "Infrastructure",
      price: "1,456.90",
      tradingViewSymbol: "NSE:ADANIPORTS",
    },

    // MCX Commodities
    { symbol: "GOLD", name: "Gold Futures", type: "MCX", price: "72,450.00", tradingViewSymbol: "MCX:GOLD1!" },
    { symbol: "SILVER", name: "Silver Futures", type: "MCX", price: "89,234.00", tradingViewSymbol: "MCX:SILVER1!" },
    { symbol: "CRUDE", name: "Crude Oil Futures", type: "MCX", price: "6,789.00", tradingViewSymbol: "MCX:CRUDEOIL1!" },
    {
      symbol: "NATURALGAS",
      name: "Natural Gas Futures",
      type: "MCX",
      price: "234.50",
      tradingViewSymbol: "MCX:NATURALGAS1!",
    },
    { symbol: "COPPER", name: "Copper Futures", type: "MCX", price: "789.60", tradingViewSymbol: "MCX:COPPER1!" },
    { symbol: "ZINC", name: "Zinc Futures", type: "MCX", price: "267.80", tradingViewSymbol: "MCX:ZINC1!" },
    { symbol: "LEAD", name: "Lead Futures", type: "MCX", price: "189.40", tradingViewSymbol: "MCX:LEAD1!" },
    {
      symbol: "ALUMINIUM",
      name: "Aluminium Futures",
      type: "MCX",
      price: "234.70",
      tradingViewSymbol: "MCX:ALUMINIUM1!",
    },
    { symbol: "NICKEL", name: "Nickel Futures", type: "MCX", price: "1,567.80", tradingViewSymbol: "MCX:NICKEL1!" },
    {
      symbol: "MENTHAOIL",
      name: "Mentha Oil Futures",
      type: "MCX",
      price: "1,234.50",
      tradingViewSymbol: "MCX:MENTHAOIL1!",
    },
    {
      symbol: "CARDAMOM",
      name: "Cardamom Futures",
      type: "MCX",
      price: "2,345.60",
      tradingViewSymbol: "MCX:CARDAMOM1!",
    },
    { symbol: "COTTON", name: "Cotton Futures", type: "MCX", price: "567.80", tradingViewSymbol: "MCX:COTTON1!" },

    // Forex Pairs
    { symbol: "USDINR", name: "USD/INR", type: "Forex", price: "83.55", tradingViewSymbol: "NSE:USDINR" },
    { symbol: "EURINR", name: "EUR/INR", type: "Forex", price: "89.45", tradingViewSymbol: "NSE:EURINR" },
    { symbol: "GBPINR", name: "GBP/INR", type: "Forex", price: "104.60", tradingViewSymbol: "NSE:GBPINR" },
    { symbol: "JPYINR", name: "JPY/INR", type: "Forex", price: "0.56", tradingViewSymbol: "NSE:JPYINR" },
    { symbol: "AUDINR", name: "AUD/INR", type: "Forex", price: "54.80", tradingViewSymbol: "NSE:AUDINR" },
    { symbol: "CADINR", name: "CAD/INR", type: "Forex", price: "61.20", tradingViewSymbol: "NSE:CADINR" },
    { symbol: "CHFINR", name: "CHF/INR", type: "Forex", price: "92.30", tradingViewSymbol: "NSE:CHFINR" },
    { symbol: "SGDINR", name: "SGD/INR", type: "Forex", price: "62.40", tradingViewSymbol: "NSE:SGDINR" },

    // ETFs
    {
      symbol: "NIFTYBEES",
      name: "Nippon India ETF Nifty BeES",
      type: "ETF",
      price: "243.20",
      tradingViewSymbol: "NSE:NIFTYBEES",
    },
    {
      symbol: "JUNIORBEES",
      name: "Nippon India ETF Junior BeES",
      type: "ETF",
      price: "567.80",
      tradingViewSymbol: "NSE:JUNIORBEES",
    },
    {
      symbol: "BANKBEES",
      name: "Nippon India ETF Bank BeES",
      type: "ETF",
      price: "521.80",
      tradingViewSymbol: "NSE:BANKBEES",
    },
    {
      symbol: "GOLDBEES",
      name: "Nippon India ETF Gold BeES",
      type: "ETF",
      price: "56.70",
      tradingViewSymbol: "NSE:GOLDBEES",
    },
    {
      symbol: "LIQUIDBEES",
      name: "Nippon India ETF Liquid BeES",
      type: "ETF",
      price: "1,000.50",
      tradingViewSymbol: "NSE:LIQUIDBEES",
    },
    {
      symbol: "PSUBNKBEES",
      name: "Nippon India ETF PSU Bank BeES",
      type: "ETF",
      price: "45.60",
      tradingViewSymbol: "NSE:PSUBNKBEES",
    },
    {
      symbol: "ITBEES",
      name: "Nippon India ETF IT BeES",
      type: "ETF",
      price: "421.50",
      tradingViewSymbol: "NSE:ITBEES",
    },
    {
      symbol: "PHARMABEES",
      name: "Nippon India ETF Pharma BeES",
      type: "ETF",
      price: "215.67",
      tradingViewSymbol: "NSE:PHARMABEES",
    },
    {
      symbol: "AUTOBEES",
      name: "Nippon India ETF Auto BeES",
      type: "ETF",
      price: "238.90",
      tradingViewSymbol: "NSE:AUTOBEES",
    },
    {
      symbol: "FMCGBEES",
      name: "Nippon India ETF FMCG BeES",
      type: "ETF",
      price: "562.34",
      tradingViewSymbol: "NSE:FMCGBEES",
    },
    {
      symbol: "METALBEES",
      name: "Nippon India ETF Metal BeES",
      type: "ETF",
      price: "89.45",
      tradingViewSymbol: "NSE:METALBEES",
    },
    {
      symbol: "ENERGYBEES",
      name: "Nippon India ETF Energy BeES",
      type: "ETF",
      price: "345.67",
      tradingViewSymbol: "NSE:ENERGYBEES",
    },
    {
      symbol: "REALTYBEES",
      name: "Nippon India ETF Realty BeES",
      type: "ETF",
      price: "89.04",
      tradingViewSymbol: "NSE:REALTYBEES",
    },
    {
      symbol: "MEDIABEES",
      name: "Nippon India ETF Media BeES",
      type: "ETF",
      price: "178.90",
      tradingViewSymbol: "NSE:MEDIABEES",
    },
    {
      symbol: "INFRABEES",
      name: "Nippon India ETF Infra BeES",
      type: "ETF",
      price: "67.80",
      tradingViewSymbol: "NSE:INFRABEES",
    },
  ]

  const filteredSearchResults = searchData
    .filter(
      (item) =>
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(0, 8) // Limit to 8 results

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowSearchResults(value.length > 0)
  }

  const handleSearchSelect = (item: any) => {
    setSearchQuery(item.symbol)
    setShowSearchResults(false)

    // Open TradingView chart in new window
    const tradingViewUrl = `https://in.tradingview.com/chart/?symbol=${item.tradingViewSymbol}`
    window.open(tradingViewUrl, "_blank", "width=1200,height=800,scrollbars=yes,resizable=yes")

    console.log("[v0] Selected search item:", item)
    console.log("[v0] Opening TradingView chart for:", item.tradingViewSymbol)
  }

  const handleSearchBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowSearchResults(false), 200)
  }

  return (
    <nav className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 relative">
      <div className="flex h-16 items-center px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <TrendingUp className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">SR ALGO</span>
          <Badge variant="secondary" className="text-xs">
            Pro
          </Badge>
        </div>

        {/* Navigation Items */}
        <div className="ml-8 flex space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search stocks, sectors..."
              className="w-64 pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
              onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
            />

            {showSearchResults && filteredSearchResults.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-card border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs text-muted-foreground mb-2 px-2">
                    Search Results ({filteredSearchResults.length})
                  </div>
                  {filteredSearchResults.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 hover:bg-accent rounded cursor-pointer transition-colors"
                      onClick={() => handleSearchSelect(item)}
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-medium text-sm">{item.symbol}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-48">{item.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            item.type === "Index"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : item.type === "Banking"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : item.type === "IT"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : item.type === "Auto"
                                    ? "bg-orange-50 text-orange-700 border-orange-200"
                                    : item.type === "FMCG"
                                      ? "bg-pink-50 text-pink-700 border-pink-200"
                                      : item.type === "Energy"
                                        ? "bg-red-50 text-red-700 border-red-200"
                                        : item.type === "Pharma"
                                          ? "bg-cyan-50 text-cyan-700 border-cyan-200"
                                          : item.type === "Metals"
                                            ? "bg-gray-50 text-gray-700 border-gray-200"
                                            : item.type === "MCX"
                                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                              : item.type === "Forex"
                                                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                                : item.type === "ETF"
                                                  ? "bg-teal-50 text-teal-700 border-teal-200"
                                                  : "bg-slate-50 text-slate-700 border-slate-200"
                          }`}
                        >
                          {item.type}
                        </Badge>
                        <div className="text-sm font-medium">₹{item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="relative" onClick={handleNotificationsClick}>
              <Bell className="h-4 w-4" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
            </Button>
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-card border rounded-lg shadow-lg p-4 z-50">
                <h3 className="font-semibold mb-3">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-2 hover:bg-muted rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">RELIANCE breakout alert</p>
                      <p className="text-xs text-muted-foreground">Stock crossed resistance at ₹2,450</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-2 hover:bg-muted rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">NIFTY volume surge</p>
                      <p className="text-xs text-muted-foreground">Unusual volume detected in NIFTY 50</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-2 hover:bg-muted rounded">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">TCS earnings alert</p>
                      <p className="text-xs text-muted-foreground">Q3 results announced - Beat estimates</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                  View All Notifications
                </Button>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative">
            <Button variant="ghost" size="sm" onClick={handleSettingsClick}>
              <Settings className="h-4 w-4" />
            </Button>
            {showSettings && (
              <div className="absolute right-0 top-12 w-80 bg-card border rounded-lg shadow-lg p-4 z-50">
                <h3 className="font-semibold mb-3">Settings</h3>
                {renderSettingsPanel()}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <Button variant="ghost" size="sm" onClick={handleUserClick}>
              <User className="h-4 w-4" />
            </Button>
            {showUserMenu && (
              <div className="absolute right-0 top-12 w-56 bg-card border rounded-lg shadow-lg p-4 z-50">
                {!activeUserPanel ? (
                  <>
                    <div className="flex items-center space-x-3 mb-3 pb-3 border-b">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Trader Pro</p>
                        <p className="text-sm text-muted-foreground">Premium Account</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleUserMenuOption("portfolio")}
                      >
                        My Portfolio
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleUserMenuOption("history")}
                      >
                        Trading History
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleUserMenuOption("watchlists")}
                      >
                        Watchlists
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleUserMenuOption("settings")}
                      >
                        Account Settings
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleUserMenuOption("subscription")}
                      >
                        Subscription
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between p-3 bg-muted rounded-md"
                        onClick={() => setShowMarketModeSelector(!showMarketModeSelector)}
                      >
                        <div className="text-left">
                          <p className="text-xs text-muted-foreground">Market Mode</p>
                          <p className="text-sm font-medium capitalize">{marketMode}</p>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </Button>

                      {showMarketModeSelector && (
                        <div className="space-y-1 pl-4 border-l-2 border-muted">
                          <Button
                            variant={marketMode === "live" ? "default" : "ghost"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => handleMarketModeChange("live")}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Live Market
                            </div>
                          </Button>
                          <Button
                            variant={marketMode === "demo" ? "default" : "ghost"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => handleMarketModeChange("demo")}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Demo Market
                            </div>
                          </Button>
                          <Button
                            variant={marketMode === "offline" ? "default" : "ghost"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => handleMarketModeChange("offline")}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                              Offline
                            </div>
                          </Button>
                        </div>
                      )}

                      <hr className="my-2" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-red-600"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 pb-2 border-b">
                      <Button variant="ghost" size="sm" onClick={handleBackToUserMenu}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="font-medium">
                        {activeUserPanel === "portfolio" && "My Portfolio"}
                        {activeUserPanel === "history" && "Trading History"}
                        {activeUserPanel === "watchlists" && "Watchlists"}
                        {activeUserPanel === "settings" && "Account Settings"}
                        {activeUserPanel === "subscription" && "Subscription"}
                      </h3>
                    </div>

                    {activeUserPanel === "portfolio" && (
                      <div className="space-y-3">
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm font-medium">Total Portfolio Value</p>
                          <p className="text-lg font-bold text-green-600">₹2,45,680</p>
                          <p className="text-xs text-muted-foreground">+₹12,340 (+5.3%) today</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Holdings</span>
                            <span className="font-medium">₹2,20,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Available Cash</span>
                            <span className="font-medium">₹25,680</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          View Full Portfolio
                        </Button>
                      </div>
                    )}

                    {activeUserPanel === "history" && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="bg-muted p-2 rounded text-xs">
                            <div className="flex justify-between">
                              <span>RELIANCE - BUY</span>
                              <span className="text-green-600">+₹450</span>
                            </div>
                            <p className="text-muted-foreground">Today 2:30 PM</p>
                          </div>
                          <div className="bg-muted p-2 rounded text-xs">
                            <div className="flex justify-between">
                              <span>TCS - SELL</span>
                              <span className="text-red-600">-₹120</span>
                            </div>
                            <p className="text-muted-foreground">Yesterday 11:45 AM</p>
                          </div>
                          <div className="bg-muted p-2 rounded text-xs">
                            <div className="flex justify-between">
                              <span>INFY - BUY</span>
                              <span className="text-green-600">+₹280</span>
                            </div>
                            <p className="text-muted-foreground">2 days ago</p>
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          View All Trades
                        </Button>
                      </div>
                    )}

                    {activeUserPanel === "watchlists" && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                            📈 My Favorites (12 stocks)
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                            🏦 Banking Stocks (8 stocks)
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                            💻 IT Sector (15 stocks)
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                            ⚡ Energy Stocks (6 stocks)
                          </Button>
                        </div>
                        <Button size="sm" className="w-full">
                          Create New Watchlist
                        </Button>
                      </div>
                    )}

                    {activeUserPanel === "settings" && !activeSettingsPanel && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-between"
                            onClick={() => handleSettingsOption("profile")}
                          >
                            Profile Information
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-between"
                            onClick={() => handleSettingsOption("trading")}
                          >
                            Trading Preferences
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-between"
                            onClick={() => handleSettingsOption("notifications")}
                          >
                            Notification Settings
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-between"
                            onClick={() => handleSettingsOption("security")}
                          >
                            Security Settings
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-between"
                            onClick={() => handleSettingsOption("api")}
                          >
                            API Configuration
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="pt-2 border-t">
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Export Data
                          </Button>
                        </div>
                      </div>
                    )}

                    {activeUserPanel === "settings" && activeSettingsPanel === "profile" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Button variant="ghost" size="sm" onClick={handleBackToSettings}>
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                          <h3 className="font-medium">Profile Information</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="p-3 bg-muted rounded-md">
                            <p className="text-xs text-muted-foreground">Name</p>
                            <p className="text-sm font-medium">Trader Pro</p>
                          </div>
                          <div className="p-3 bg-muted rounded-md">
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="text-sm font-medium">trader@example.com</p>
                          </div>
                          <div className="p-3 bg-muted rounded-md">
                            <p className="text-xs text-muted-foreground">Account Type</p>
                            <p className="text-sm font-medium">Premium Account</p>
                          </div>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Edit Profile
                          </Button>
                        </div>
                      </div>
                    )}

                    {activeUserPanel === "settings" && activeSettingsPanel === "trading" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Button variant="ghost" size="sm" onClick={handleBackToSettings}>
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                          <h3 className="font-medium">Trading Preferences</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                            <span className="text-sm">Auto-refresh Data</span>
                            <Button variant="outline" size="sm">
                              ON
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                            <span className="text-sm">Sound Alerts</span>
                            <Button variant="outline" size="sm">
                              OFF
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                            <span className="text-sm">Default Chart Type</span>
                            <Button variant="outline" size="sm">
                              Candlestick
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeUserPanel === "settings" && activeSettingsPanel === "notifications" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Button variant="ghost" size="sm" onClick={handleBackToSettings}>
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                          <h3 className="font-medium">Notification Settings</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                            <span className="text-sm">Price Alerts</span>
                            <Button variant="outline" size="sm">
                              ON
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                            <span className="text-sm">News Updates</span>
                            <Button variant="outline" size="sm">
                              ON
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                            <span className="text-sm">Email Notifications</span>
                            <Button variant="outline" size="sm">
                              OFF
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeUserPanel === "settings" && activeSettingsPanel === "security" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Button variant="ghost" size="sm" onClick={handleBackToSettings}>
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                          <h3 className="font-medium">Security Settings</h3>
                        </div>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                            Change Password
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                            Two-Factor Authentication
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                            Login History
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-red-600 bg-transparent"
                          >
                            Revoke All Sessions
                          </Button>
                        </div>
                      </div>
                    )}

                    {activeUserPanel === "settings" && activeSettingsPanel === "api" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Button variant="ghost" size="sm" onClick={handleBackToSettings}>
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                          <h3 className="font-medium">API Configuration</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="p-3 bg-muted rounded-md">
                            <p className="text-xs text-muted-foreground">Angel Broking Status</p>
                            <p className="text-sm font-medium text-green-600">Connected</p>
                          </div>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Update Credentials
                          </Button>
                          <Button variant="outline" size="sm" className="w-full text-red-600 bg-transparent">
                            Disconnect API
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
