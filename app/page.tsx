"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Users, Shield, ArrowRight, Wifi, Download, Upload } from "lucide-react"

export default function HomePage() {
  const [userType, setUserType] = useState<"user" | "admin">("user")

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType={userType} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fade-in-up">
            <Badge variant="secondary" className="mb-4 animate-scale-in">
              <Zap className="w-3 h-3 mr-1" />
              Version 2.0 Now Live
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Welcome to <span className="text-primary animate-pulse-glow">LUMEN Quest</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              The ultimate subscription management platform for broadband services. Manage your plans, track usage, and
              optimize your connectivity with ease.
            </p>

            {/* User Type Selector */}
            <div className="flex justify-center gap-4 mb-8 animate-scale-in">
              <Button
                variant={userType === "user" ? "default" : "outline"}
                onClick={() => setUserType("user")}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                End User Portal
              </Button>
              <Button
                variant={userType === "admin" ? "default" : "outline"}
                onClick={() => setUserType("admin")}
                className="flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Admin Portal
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Button size="lg" className="animate-pulse-glow">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                View Plans
                <Zap className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
          <div
            className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary/20 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {userType === "admin" ? "Admin Features" : "User Features"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {userType === "admin"
                ? "Powerful tools to manage your broadband service offerings and monitor performance."
                : "Everything you need to manage your broadband subscriptions in one place."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userType === "admin" ? (
              <>
                <Card className="animate-slide-in-left hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Plan Management</CardTitle>
                    <CardDescription>
                      Create, update, and manage broadband plans with flexible pricing and features.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="animate-slide-in-left hover:shadow-lg transition-shadow duration-300"
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle>User Analytics</CardTitle>
                    <CardDescription>
                      Monitor user behavior, subscription trends, and service performance metrics.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="animate-slide-in-left hover:shadow-lg transition-shadow duration-300"
                  style={{ animationDelay: "0.4s" }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4">
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
                <Card className="animate-slide-in-left hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Wifi className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Browse Plans</CardTitle>
                    <CardDescription>
                      Explore available broadband plans with detailed specifications and pricing.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="animate-slide-in-left hover:shadow-lg transition-shadow duration-300"
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Download className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle>Usage Tracking</CardTitle>
                    <CardDescription>
                      Monitor your data usage, speed tests, and connection quality in real-time.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card
                  className="animate-slide-in-left hover:shadow-lg transition-shadow duration-300"
                  style={{ animationDelay: "0.4s" }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4">
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

      {/* Stats Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center animate-scale-in">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl font-bold text-accent mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold text-chart-3 mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl font-bold text-chart-4 mb-2">1Gbps</div>
              <div className="text-muted-foreground">Max Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
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
