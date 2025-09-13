"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Wifi, Zap, Download, Upload, Clock, Shield, Star, Search, Filter, Check, ArrowRight } from "lucide-react"
import { usePortal } from "@/components/portal-provider"

interface Plan {
  id: string
  name: string
  description: string
  speed: string
  downloadSpeed: number
  uploadSpeed: number
  dataQuota: string
  price: number
  originalPrice?: number
  features: string[]
  popular: boolean
  category: "basic" | "premium" | "enterprise"
  rating: number
  reviews: number
}

const mockPlans: Plan[] = [
  {
    id: "1",
    name: "Starter Connect",
    description: "Perfect for light browsing and email",
    speed: "25 Mbps",
    downloadSpeed: 25,
    uploadSpeed: 5,
    dataQuota: "500 GB",
    price: 29.99,
    originalPrice: 39.99,
    features: ["Email Support", "Basic Security", "1 Device"],
    popular: false,
    category: "basic",
    rating: 4.2,
    reviews: 1250,
  },
  {
    id: "2",
    name: "Home Pro",
    description: "Ideal for streaming and working from home",
    speed: "100 Mbps",
    downloadSpeed: 100,
    uploadSpeed: 20,
    dataQuota: "Unlimited",
    price: 59.99,
    originalPrice: 79.99,
    features: ["24/7 Support", "Advanced Security", "5 Devices", "Free Router"],
    popular: true,
    category: "premium",
    rating: 4.7,
    reviews: 3420,
  },
  {
    id: "3",
    name: "Ultra Speed",
    description: "Maximum performance for power users",
    speed: "500 Mbps",
    downloadSpeed: 500,
    uploadSpeed: 100,
    dataQuota: "Unlimited",
    price: 99.99,
    features: ["Priority Support", "Premium Security", "10 Devices", "Mesh Router", "Static IP"],
    popular: false,
    category: "premium",
    rating: 4.8,
    reviews: 890,
  },
  {
    id: "4",
    name: "Business Elite",
    description: "Enterprise-grade connectivity",
    speed: "1 Gbps",
    downloadSpeed: 1000,
    uploadSpeed: 500,
    dataQuota: "Unlimited",
    price: 199.99,
    features: ["Dedicated Support", "Enterprise Security", "Unlimited Devices", "SLA Guarantee", "Backup Connection"],
    popular: false,
    category: "enterprise",
    rating: 4.9,
    reviews: 245,
  },
  {
    id: "5",
    name: "Family Plus",
    description: "Great value for families",
    speed: "200 Mbps",
    downloadSpeed: 200,
    uploadSpeed: 50,
    dataQuota: "Unlimited",
    price: 79.99,
    features: ["Family Controls", "Multiple Profiles", "8 Devices", "Parental Controls"],
    popular: false,
    category: "premium",
    rating: 4.5,
    reviews: 2100,
  },
  {
    id: "6",
    name: "Student Special",
    description: "Affordable option for students",
    speed: "50 Mbps",
    downloadSpeed: 50,
    uploadSpeed: 10,
    dataQuota: "1 TB",
    price: 39.99,
    originalPrice: 49.99,
    features: ["Student Discount", "Flexible Terms", "3 Devices"],
    popular: false,
    category: "basic",
    rating: 4.3,
    reviews: 680,
  },
]

export default function PlansPage() {
  const { userType } = usePortal()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [speedFilter, setSpeedFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const filteredPlans = useMemo(() => {
    return mockPlans.filter((plan) => {
      const matchesSearch =
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || plan.category === categoryFilter
      const matchesPrice = plan.price >= priceRange[0] && plan.price <= priceRange[1]
      const matchesSpeed =
        speedFilter === "all" ||
        (speedFilter === "fast" && plan.downloadSpeed >= 100) ||
        (speedFilter === "ultra" && plan.downloadSpeed >= 500)

      return matchesSearch && matchesCategory && matchesPrice && matchesSpeed
    })
  }, [searchTerm, categoryFilter, priceRange, speedFilter])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Choose Your Perfect Plan</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find the ideal broadband plan that matches your needs and budget. All plans include our reliability
              guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md animate-slide-in-left">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="animate-scale-in">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-card rounded-lg border animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Speed</label>
                  <Select value={speedFilter} onValueChange={setSpeedFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Speeds</SelectItem>
                      <SelectItem value="fast">100+ Mbps</SelectItem>
                      <SelectItem value="ultra">500+ Mbps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    min={0}
                    step={10}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan, index) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fade-in-up ${
                  plan.popular ? "ring-2 ring-primary shadow-lg" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg animate-pulse-glow">
                    Most Popular
                  </div>
                )}

                {plan.originalPrice && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="destructive" className="animate-scale-in">
                      Save ${(plan.originalPrice - plan.price).toFixed(2)}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={plan.category === "enterprise" ? "default" : "secondary"}>
                      {plan.category.charAt(0).toUpperCase() + plan.category.slice(1)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">
                        {plan.rating} ({plan.reviews})
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Speed Info */}
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-primary" />
                      <span className="font-medium">{plan.speed}</span>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {plan.downloadSpeed} Mbps
                      </div>
                      <div className="flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        {plan.uploadSpeed} Mbps
                      </div>
                    </div>
                  </div>

                  {/* Data Quota */}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-sm">Data: {plan.dataQuota}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                      {plan.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${plan.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button className="w-full animate-pulse-glow" size="lg">
                    Subscribe Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredPlans.length === 0 && (
            <div className="text-center py-16 animate-fade-in-up">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No plans found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-foreground mb-4">Need Help Choosing?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our experts are here to help you find the perfect plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline">
              <Shield className="w-4 h-4 mr-2" />
              Chat with Expert
            </Button>
            <Button size="lg">
              <Zap className="w-4 h-4 mr-2" />
              Compare Plans
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
