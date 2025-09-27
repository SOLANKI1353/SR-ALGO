import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
<<<<<<< HEAD
import "./fixes.css"
import { Suspense } from "react"
import LiveStatus from "@/components/live-status"
=======
import { Suspense } from "react"
>>>>>>> ee02208e6802b6d45fea51f8c286e01b8b6d364c

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SR ALGO - Advanced Trading Platform",
  description: "Professional stock screening, market analysis, and AI-powered trading signals for Indian markets",
  generator: "SR ALGO",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
<<<<<<< HEAD
            <LiveStatus/>
=======
>>>>>>> ee02208e6802b6d45fea51f8c286e01b8b6d364c
            {children}
          </ThemeProvider>
          {/* Analytics component removed */}
        </Suspense>
      </body>
    </html>
  )
}
