"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, ArrowRight, Wifi, Download, Upload, Sparkles, TrendingUp, LogOut } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { usePortal } from "@/components/portal-provider"

export default function HomePage() {
  const { userType } = usePortal()
  const [isVisible, setIsVisible] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  console.log("[v0] Auth state - user:", user, "isAuthenticated:", isAuthenticated)
  console.log("[v0] Portal state - userType:", userType)

  const handleLogin = () => {
    router.push("/auth/login")
  }

  const handleLogout = () => {
    logout()
    // User will stay on landing page after logout
  }

  const handleViewPlans = () => {
    router.push("/plans")
  }

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full animate-pulse-glow" />
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full animate-pulse-glow"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-accent/3 rounded-full animate-rotate-slow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 animate-bounce-subtle hover-glow">
              <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
              Version 2.0 Now Live
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance animate-fade-in-up">
              Welcome to <span className="text-secondary animate-pulse-glow">LUMEN Quest</span>
            </h1>

            <p
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty animate-slide-up-fade"
              style={{ animationDelay: "0.2s" }}
            >
              The ultimate subscription management platform for broadband services. Manage your plans, track usage, and
              optimize your connectivity with ease.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-fade"
              style={{ animationDelay: "0.4s" }}
            >
              {isAuthenticated ? (
                <>
                  <Button size="lg" className="animate-pulse-glow hover-scale group">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleViewPlans}
                    className="hover-glow hover-lift bg-transparent"
                  >
                    View Plans
                    <Zap className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="destructive" size="lg" onClick={handleLogout} className="hover-glow hover-lift">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleViewPlans}
                  className="hover-glow hover-lift bg-transparent"
                >
                  View Plans
                  <Zap className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Enhanced Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float hover-glow" />
          <div
            className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-float hover-glow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary/20 rounded-full animate-float hover-glow"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-60 right-1/4 w-8 h-8 bg-secondary/15 rounded-full animate-bounce-subtle"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute bottom-40 right-10 w-14 h-14 bg-chart-3/10 rounded-full animate-float"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {userType === "admin" ? "Admin Features" : "User Features"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {userType === "admin"
                ? "Powerful tools to manage your broadband service offerings and monitor performance."
                : "Everything you need to manage your broadband subscriptions in one place."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {userType === "admin" ? (
              <>
                <Card
                  className="scroll-reveal hover-lift hover-glow transition-all duration-300 group"
                  style={{ "--index": 0 } as React.CSSProperties}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Plan Management</CardTitle>
                    <CardDescription>
                      Create, update, and manage broadband plans with flexible pricing and features.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="scroll-reveal hover-lift hover-glow transition-all duration-300 group"
                  style={{ "--index": 1 } as React.CSSProperties}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle>User Analytics</CardTitle>
                    <CardDescription>
                      Monitor user behavior, subscription trends, and service performance metrics.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="scroll-reveal hover-lift hover-glow transition-all duration-300 group"
                  style={{ "--index": 2 } as React.CSSProperties}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Shield className="w-6 h-6 text-chart-3" />
                    </div>
                    <CardTitle>Security & Control</CardTitle>
                    <CardDescription>
                      Advanced security features and administrative controls for platform management.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </>
            ) : (
              <>
                <Card
                  className="scroll-reveal hover-lift hover-glow transition-all duration-300 group"
                  style={{ "--index": 0 } as React.CSSProperties}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Wifi className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Browse Plans</CardTitle>
                    <CardDescription>
                      Explore available broadband plans with detailed specifications and pricing.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="scroll-reveal hover-lift hover-glow transition-all duration-300 group"
                  style={{ "--index": 1 } as React.CSSProperties}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Download className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle>Usage Tracking</CardTitle>
                    <CardDescription>
                      Monitor your data usage, speed tests, and connection quality in real-time.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="scroll-reveal hover-lift hover-glow transition-all duration-300 group"
                  style={{ "--index": 2 } as React.CSSProperties}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-chart-3" />
                    </div>
                    <CardTitle>Easy Management</CardTitle>
                    <CardDescription>
                      Upgrade, downgrade, or cancel subscriptions with just a few clicks.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 stagger-children">
            <div
              className="text-center scroll-reveal hover-scale group"
              style={{ "--index": 0 } as React.CSSProperties}
            >
              <div className="text-4xl font-bold text-primary mb-2 group-hover:animate-pulse">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div
              className="text-center scroll-reveal hover-scale group"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              <div className="text-4xl font-bold text-accent mb-2 group-hover:animate-pulse">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div
              className="text-center scroll-reveal hover-scale group"
              style={{ "--index": 2 } as React.CSSProperties}
            >
              <div className="text-4xl font-bold text-chart-3 mb-2 group-hover:animate-pulse">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
            <div
              className="text-center scroll-reveal hover-scale group"
              style={{ "--index": 3 } as React.CSSProperties}
            >
              <div className="text-4xl font-bold text-chart-4 mb-2 group-hover:animate-pulse">1Gbps</div>
              <div className="text-muted-foreground">Max Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4 hover-scale">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center animate-pulse-glow">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">LUMEN Quest 2.0</span>
            </div>
            <p className="text-muted-foreground">© 2025 Lumen Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
