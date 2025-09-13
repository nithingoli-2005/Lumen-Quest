"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, Download, Upload, Check, Star, ArrowRight, Zap } from "lucide-react"

interface PlanCardProps {
  plan: {
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
  onSubscribe?: (planId: string) => void
  className?: string
}

export function PlanCard({ plan, onSubscribe, className = "" }: PlanCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer ${
        plan.popular ? "ring-2 ring-primary shadow-lg" : ""
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg animate-pulse-glow">
          <Zap className="w-3 h-3 inline mr-1" />
          Most Popular
        </div>
      )}

      {/* Discount Badge */}
      {plan.originalPrice && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="destructive" className="animate-scale-in">
            Save ${(plan.originalPrice - plan.price).toFixed(2)}
          </Badge>
        </div>
      )}

      {/* Animated Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <CardHeader className="relative pb-4">
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
        <CardTitle className={`text-2xl transition-colors duration-300 ${isHovered ? "text-primary" : ""}`}>
          {plan.name}
        </CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Speed Info with Animation */}
        <div
          className={`flex items-center justify-between p-3 bg-muted/50 rounded-lg transition-all duration-300 ${
            isHovered ? "bg-primary/10 scale-105" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <Wifi
              className={`w-5 h-5 transition-colors duration-300 ${
                isHovered ? "text-primary" : "text-muted-foreground"
              }`}
            />
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

        {/* Features with Staggered Animation */}
        <div className="space-y-2">
          {plan.features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                isHovered ? "translate-x-2" : ""
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <Check
                className={`w-4 h-4 transition-colors duration-300 ${
                  isHovered ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Price with Animation */}
        <div className="pt-4 border-t">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-3xl font-bold transition-all duration-300 ${
                isHovered ? "text-primary scale-110" : "text-foreground"
              }`}
            >
              ${plan.price}
            </span>
            <span className="text-muted-foreground">/month</span>
            {plan.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${plan.originalPrice}</span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative pt-0">
        <Button
          className={`w-full transition-all duration-300 ${isHovered ? "animate-pulse-glow scale-105" : ""}`}
          size="lg"
          onClick={() => onSubscribe?.(plan.id)}
        >
          Subscribe Now
          <ArrowRight
            className={`w-4 h-4 ml-2 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
          />
        </Button>
      </CardFooter>
    </Card>
  )
}
