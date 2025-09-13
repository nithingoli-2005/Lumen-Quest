"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Zap,
  User,
  BarChart3,
  CreditCard,
  Bell,
  Shield,
  UserIcon,
  ToggleLeft,
  ToggleRight,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react"
import { usePortal } from "@/components/portal-provider"

interface NavigationProps {
  isAuthenticated?: boolean
  onLogout?: () => void
}

export function Navigation({ isAuthenticated = false, onLogout }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { userType, toggleUserType } = usePortal()
  const router = useRouter()

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
    { href: "/admin/users", label: "Users", icon: UserIcon },
    { href: "/admin/notifications", label: "Notifications", icon: Bell },
  ]

  const navItems = userType === "admin" ? adminNavItems : userNavItems

  const handleToggle = () => {
    toggleUserType()
    console.log("[v0] Portal toggled to:", userType === "user" ? "admin" : "user")
  }

  const handleLogout = () => {
    onLogout?.()
    router.push("/")
  }

  const handleLogin = () => {
    router.push("/auth/login")
  }

  const handleSignup = () => {
    router.push("/auth/signup")
  }

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
          {isAuthenticated && (
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
          )}

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-6 px-6 py-4 bg-muted/50 rounded-lg animate-scale-in">
                  <div className="flex flex-col items-center space-y-2">
                    <UserIcon
                      className={`w-4 h-4 ${userType === "user" ? "text-primary" : "text-muted-foreground"} transition-colors`}
                    />
                    <span className="text-xs font-medium text-muted-foreground">User</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleToggle} className="p-2 h-auto hover:bg-transparent">
                    {userType === "user" ? (
                      <ToggleLeft className="w-6 h-6 text-primary hover:text-primary/80 transition-colors" />
                    ) : (
                      <ToggleRight className="w-6 h-6 text-primary hover:text-primary/80 transition-colors" />
                    )}
                  </Button>
                  <div className="flex flex-col items-center space-y-2">
                    <Shield
                      className={`w-4 h-4 ${userType === "admin" ? "text-primary" : "text-muted-foreground"} transition-colors`}
                    />
                    <span className="text-xs font-medium text-muted-foreground">Admin</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="animate-scale-in bg-transparent">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button variant="outline" size="sm" className="animate-scale-in bg-transparent" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="animate-scale-in bg-transparent" onClick={handleLogin}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" className="animate-scale-in" onClick={handleSignup}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </>
            )}
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
              {isAuthenticated ? (
                <>
                  <div className="flex items-center justify-center px-4 py-4 mb-2 bg-muted/30 rounded-md">
                    <div className="flex items-center space-x-8">
                      <div className="flex flex-col items-center space-y-2">
                        <UserIcon
                          className={`w-3 h-3 ${userType === "user" ? "text-primary" : "text-muted-foreground"} transition-colors`}
                        />
                        <span className="text-xs font-medium text-muted-foreground">User</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleToggle} className="p-2 h-auto">
                        {userType === "user" ? (
                          <ToggleLeft className="w-5 h-5 text-primary" />
                        ) : (
                          <ToggleRight className="w-5 h-5 text-primary" />
                        )}
                      </Button>
                      <div className="flex flex-col items-center space-y-2">
                        <Shield
                          className={`w-3 h-3 ${userType === "admin" ? "text-primary" : "text-muted-foreground"} transition-colors`}
                        />
                        <span className="text-xs font-medium text-muted-foreground">Admin</span>
                      </div>
                    </div>
                  </div>

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
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        handleLogout()
                      }}
                      className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-md transition-colors duration-200 w-full text-left"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      handleLogin()
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-md transition-colors duration-200 w-full text-left"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      handleSignup()
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-md transition-colors duration-200 w-full text-left"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
