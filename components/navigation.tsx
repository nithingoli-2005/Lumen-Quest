"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Zap, User, Settings, BarChart3, CreditCard, Bell, Shield } from "lucide-react"

interface NavigationProps {
  userType: "user" | "admin"
}

export function Navigation({ userType }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const userNavItems = [
    { href: "/", label: "Dashboard", icon: BarChart3 },
    { href: "/plans", label: "Browse Plans", icon: Zap },
    { href: "/subscriptions", label: "My Subscriptions", icon: CreditCard },
    { href: "/offers", label: "Offers", icon: Bell },
  ]

  const adminNavItems = [
    { href: "/admin", label: "Overview", icon: BarChart3 },
    { href: "/admin/plans", label: "Manage Plans", icon: Zap },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/users", label: "Users", icon: User },
    { href: "/admin/notifications", label: "Notifications", icon: Bell },
  ]

  const navItems = userType === "admin" ? adminNavItems : userNavItems

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 animate-fade-in-up">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse-glow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">LUMEN Quest</span>
              <span className="text-xs text-muted-foreground">2.0</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {userType === "admin" && (
              <Badge variant="secondary" className="animate-scale-in">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            )}
            <Button variant="outline" size="sm" className="animate-scale-in bg-transparent">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button size="sm" className="animate-scale-in">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="animate-scale-in">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-in-right">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 border">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-md transition-colors duration-200 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <div className="border-t pt-2 mt-2">
                {userType === "admin" && (
                  <div className="px-3 py-2">
                    <Badge variant="secondary">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  </div>
                )}
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
