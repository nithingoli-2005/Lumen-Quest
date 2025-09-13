"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (userData: any) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("lumen-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Demo authentication logic
    const demoUsers = [
      {
        id: "1",
        email: "user@lumenquest.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        role: "user" as const,
      },
      {
        id: "2",
        email: "admin@lumenquest.com",
        password: "admin123",
        firstName: "Admin",
        lastName: "User",
        role: "admin" as const,
      },
    ]

    const foundUser = demoUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      localStorage.setItem("lumen-user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const signup = async (userData: any): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: "user",
    }

    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem("lumen-user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("lumen-user")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
