"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Gift,
  Percent,
  Clock,
  Star,
  Zap,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react"

interface Offer {
  id: string
  title: string
  description: string
  type: "discount" | "upgrade" | "bonus" | "limited"
  discount?: number
  originalPrice?: number
  newPrice?: number
  validUntil: string
  terms: string[]
  featured: boolean
  category: "new-customer" | "existing-customer" | "loyalty" | "seasonal"
}

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "promotion"
  timestamp: string
  read: boolean
}

const mockOffers: Offer[] = [
  {
    id: "1",
    title: "New Customer Special",
    description: "Get 50% off your first 3 months with any premium plan",
    type: "discount",
    discount: 50,
    originalPrice: 59.99,
    newPrice: 29.99,
    validUntil: "2025-03-31",
    terms: ["Valid for new customers only", "Premium plans only", "Auto-renewal at regular price"],
    featured: true,
    category: "new-customer",
  },
  {
    id: "2",
    title: "Free Speed Upgrade",
    description: "Upgrade to Ultra Speed for the same price as Home Pro",
    type: "upgrade",
    validUntil: "2025-02-28",
    terms: ["Existing Home Pro customers", "12-month commitment", "Limited time offer"],
    featured: true,
    category: "existing-customer",
  },
  {
    id: "3",
    title: "Loyalty Reward",
    description: "2 months free for customers with 2+ years of service",
    type: "bonus",
    validUntil: "2025-04-15",
    terms: ["Minimum 2 years continuous service", "Applied to next billing cycle", "One-time offer"],
    featured: false,
    category: "loyalty",
  },
  {
    id: "4",
    title: "Student Discount",
    description: "20% off any plan with valid student ID",
    type: "discount",
    discount: 20,
    validUntil: "2025-08-31",
    terms: ["Valid student ID required", "Renewable annually", "Cannot combine with other offers"],
    featured: false,
    category: "seasonal",
  },
  {
    id: "5",
    title: "Refer a Friend",
    description: "Get $25 credit for each friend who signs up",
    type: "bonus",
    validUntil: "2025-12-31",
    terms: ["Friend must remain active for 3 months", "Maximum 5 referrals per year", "Credit applied to account"],
    featured: false,
    category: "existing-customer",
  },
]

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Offer Available",
    message: "You're eligible for our New Customer Special - 50% off for 3 months!",
    type: "promotion",
    timestamp: "2025-01-13T10:30:00Z",
    read: false,
  },
  {
    id: "2",
    title: "Speed Test Completed",
    message: "Your recent speed test shows optimal performance at 98.5 Mbps download.",
    type: "success",
    timestamp: "2025-01-12T15:45:00Z",
    read: false,
  },
  {
    id: "3",
    title: "Billing Reminder",
    message: "Your next billing date is February 15, 2025. Payment method: **** 1234",
    type: "info",
    timestamp: "2025-01-11T09:00:00Z",
    read: true,
  },
  {
    id: "4",
    title: "Maintenance Notice",
    message: "Scheduled maintenance on January 20, 2025 from 2:00 AM - 4:00 AM EST.",
    type: "warning",
    timestamp: "2025-01-10T14:20:00Z",
    read: true,
  },
]

export default function OffersPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredOffers = mockOffers.filter((offer) => selectedCategory === "all" || offer.category === selectedCategory)

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif)))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-blue-500" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "promotion":
        return <Gift className="w-5 h-5 text-purple-500" />
      default:
        return <Bell className="w-5 h-5 text-blue-500" />
    }
  }

  const getOfferIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <Percent className="w-6 h-6 text-blue-500" />
      case "upgrade":
        return <Zap className="w-6 h-6 text-blue-500" />
      case "bonus":
        return <Gift className="w-6 h-6 text-purple-500" />
      default:
        return <Sparkles className="w-6 h-6 text-yellow-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="user" />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Offers & Notifications</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover exclusive deals and stay updated with important service notifications
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="offers" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 animate-scale-in">
            <TabsTrigger value="offers" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Special Offers
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
              {notifications.filter((n) => !n.read).length > 0 && (
                <Badge variant="destructive" className="ml-1 px-1.5 py-0.5 text-xs">
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="offers" className="space-y-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 animate-fade-in-up">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All Offers
              </Button>
              <Button
                variant={selectedCategory === "new-customer" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("new-customer")}
              >
                <Users className="w-3 h-3 mr-1" />
                New Customer
              </Button>
              <Button
                variant={selectedCategory === "existing-customer" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("existing-customer")}
              >
                <Star className="w-3 h-3 mr-1" />
                Existing Customer
              </Button>
              <Button
                variant={selectedCategory === "loyalty" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("loyalty")}
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Loyalty
              </Button>
              <Button
                variant={selectedCategory === "seasonal" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("seasonal")}
              >
                <Calendar className="w-3 h-3 mr-1" />
                Seasonal
              </Button>
            </div>

            {/* Featured Offers */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Featured Offers</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredOffers
                  .filter((offer) => offer.featured)
                  .map((offer, index) => (
                    <Card
                      key={offer.id}
                      className="relative overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg animate-pulse-glow">
                        Featured
                      </div>
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          {getOfferIcon(offer.type)}
                          <Badge variant="secondary">{offer.category.replace("-", " ")}</Badge>
                        </div>
                        <CardTitle className="text-xl">{offer.title}</CardTitle>
                        <CardDescription>{offer.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {offer.discount && (
                          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center justify-between">
                              <span className="text-blue-700 dark:text-blue-400 font-medium">
                                {offer.discount}% OFF
                              </span>
                              {offer.originalPrice && offer.newPrice && (
                                <div className="text-right">
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${offer.originalPrice}
                                  </span>
                                  <span className="text-lg font-bold text-blue-600 ml-2">${offer.newPrice}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          Valid until {new Date(offer.validUntil).toLocaleDateString()}
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm font-medium">Terms & Conditions:</span>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {offer.terms.map((term, idx) => (
                              <li key={idx}>• {term}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full animate-pulse-glow">
                          Claim Offer
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>

            {/* All Offers */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">All Offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffers.map((offer, index) => (
                  <Card
                    key={offer.id}
                    className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        {getOfferIcon(offer.type)}
                        <Badge variant="outline">{offer.category.replace("-", " ")}</Badge>
                      </div>
                      <CardTitle className="text-lg">{offer.title}</CardTitle>
                      <CardDescription className="text-sm">{offer.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {offer.discount && (
                        <div className="text-center p-2 bg-accent/10 rounded-lg">
                          <span className="text-2xl font-bold text-accent">{offer.discount}% OFF</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        Until {new Date(offer.validUntil).toLocaleDateString()}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <Card
                  key={notification.id}
                  className={`transition-all duration-300 hover:shadow-md animate-slide-in-right ${
                    !notification.read ? "border-l-4 border-l-primary bg-primary/5" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getNotificationIcon(notification.type)}
                        <div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                          <CardDescription className="text-sm text-muted-foreground">
                            {new Date(notification.timestamp).toLocaleString()}
                          </CardDescription>
                        </div>
                      </div>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs"
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{notification.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {notifications.length === 0 && (
              <div className="text-center py-16 animate-fade-in-up">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">You're all caught up!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
