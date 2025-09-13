"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubscriptionActions } from "@/components/subscription-actions"
import { usePortal } from "@/components/portal-provider"
import {
  Wifi,
  Calendar,
  Download,
  Upload,
  Activity,
  CreditCard,
  RefreshCw,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react"

interface Subscription {
  id: string
  planName: string
  status: "active" | "suspended" | "cancelled"
  speed: string
  dataQuota: string
  price: number
  nextBilling: string
  usageData: number
  usagePercent: number
  downloadSpeed: number
  uploadSpeed: number
  features: string[]
}

interface UsageHistory {
  month: string
  usage: number
  limit: number
}

const mockSubscription: Subscription = {
  id: "sub_001",
  planName: "Home Pro",
  status: "active",
  speed: "100 Mbps",
  dataQuota: "Unlimited",
  price: 59.99,
  nextBilling: "2025-02-15",
  usageData: 847.5,
  usagePercent: 0, // Unlimited
  downloadSpeed: 98.5,
  uploadSpeed: 19.2,
  features: ["24/7 Support", "Advanced Security", "5 Devices", "Free Router"],
}

const mockUsageHistory: UsageHistory[] = [
  { month: "Jan 2025", usage: 847.5, limit: 0 },
  { month: "Dec 2024", usage: 923.2, limit: 0 },
  { month: "Nov 2024", usage: 756.8, limit: 0 },
  { month: "Oct 2024", usage: 892.1, limit: 0 },
  { month: "Sep 2024", usage: 678.9, limit: 0 },
  { month: "Aug 2024", usage: 834.7, limit: 0 },
]

export default function SubscriptionsPage() {
  const { userType } = usePortal()
  const [subscription] = useState<Subscription>(mockSubscription)
  const [usageHistory] = useState<UsageHistory[]>(mockUsageHistory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500" // Changed from green to blue
      case "suspended":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "suspended":
        return "Suspended"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  const handleUpgrade = (planId: string) => {
    console.log("Upgrading to plan:", planId)
    // Here you would typically make an API call to upgrade the plan
  }

  const handleDowngrade = (planId: string) => {
    console.log("Downgrading to plan:", planId)
    // Here you would typically make an API call to schedule a downgrade
  }

  const handleCancel = (reason: string) => {
    console.log("Cancelling subscription with reason:", reason)
    // Here you would typically make an API call to cancel the subscription
  }

  const handleRenew = () => {
    console.log("Renewing subscription")
    // Here you would typically make an API call to renew the subscription
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType={userType} />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">My Subscriptions</h1>
            <p className="text-xl text-muted-foreground">Manage your broadband plans and monitor your usage</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 animate-scale-in">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage Details</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Current Plan */}
            <Card className="animate-fade-in-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{subscription.planName}</CardTitle>
                    <CardDescription>Your current broadband plan</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(subscription.status)} animate-pulse`} />
                    <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                      {getStatusText(subscription.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Speed Test */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-muted/50 rounded-lg animate-slide-in-left">
                    <div className="flex items-center gap-2 mb-2">
                      <Download className="w-5 h-5 text-primary" />
                      <span className="font-medium">Download Speed</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{subscription.downloadSpeed} Mbps</div>
                    <div className="text-sm text-muted-foreground">of {subscription.speed}</div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg animate-slide-in-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Upload className="w-5 h-5 text-accent" />
                      <span className="font-medium">Upload Speed</span>
                    </div>
                    <div className="text-2xl font-bold text-accent">{subscription.uploadSpeed} Mbps</div>
                    <div className="text-sm text-muted-foreground">Current speed</div>
                  </div>
                </div>

                {/* Usage */}
                <div className="space-y-4 animate-fade-in-up">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Data Usage This Month</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Activity className="w-4 h-4" />
                      {subscription.usageData} GB used
                    </div>
                  </div>
                  {subscription.dataQuota === "Unlimited" ? (
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      {" "}
                      {/* Changed from green to blue */}
                      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                        {" "}
                        {/* Changed from green to blue */}
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Unlimited Data</span>
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-500 mt-1">
                        {" "}
                        {/* Changed from green to blue */}
                        No data limits on your current plan
                      </p>
                    </div>
                  ) : (
                    <Progress value={subscription.usagePercent} className="h-3" />
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2 animate-fade-in-up">
                  <h3 className="text-lg font-semibold">Plan Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {subscription.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-4">
                <SubscriptionActions
                  currentPlan={{
                    id: "home-pro",
                    name: subscription.planName,
                    speed: subscription.speed,
                    downloadSpeed: subscription.downloadSpeed,
                    uploadSpeed: subscription.uploadSpeed,
                    price: subscription.price,
                    features: subscription.features,
                    category: "premium",
                  }}
                  onUpgrade={handleUpgrade}
                  onDowngrade={handleDowngrade}
                  onCancel={handleCancel}
                  onRenew={handleRenew}
                />
              </CardFooter>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="animate-slide-in-left hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-primary" />
                    Speed Test
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Test your current connection speed</p>
                  <Button className="w-full">Run Test</Button>
                </CardContent>
              </Card>

              <Card
                className="animate-fade-in-up hover:shadow-lg transition-shadow duration-300"
                style={{ animationDelay: "0.1s" }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-accent" />
                    Billing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Next billing: {new Date(subscription.nextBilling).toLocaleDateString()}
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Bills
                  </Button>
                </CardContent>
              </Card>

              <Card
                className="animate-slide-in-right hover:shadow-lg transition-shadow duration-300"
                style={{ animationDelay: "0.2s" }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-chart-3" />
                    Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Get help with your connection</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-8">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>Usage History</CardTitle>
                <CardDescription>Your data usage over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usageHistory.map((month, index) => (
                    <div
                      key={month.month}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">{month.month}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold">{month.usage} GB</div>
                          <div className="text-sm text-muted-foreground">
                            {month.limit === 0 ? "Unlimited" : `of ${month.limit} GB`}
                          </div>
                        </div>
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-8">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Manage your payment and billing details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <span className="font-medium">Current Plan</span>
                    </div>
                    <div className="text-2xl font-bold">${subscription.price}</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-accent" />
                      <span className="font-medium">Next Billing</span>
                    </div>
                    <div className="text-lg font-semibold">
                      {new Date(subscription.nextBilling).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Auto-renewal enabled</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button>Update Payment Method</Button>
                <Button variant="outline">Download Invoice</Button>
                <Button variant="outline">Billing History</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
