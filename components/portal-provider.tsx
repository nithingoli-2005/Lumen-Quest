"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface PortalContextType {
  userType: "user" | "admin"
  setUserType: (type: "user" | "admin") => void
  toggleUserType: () => void
}

const PortalContext = createContext<PortalContextType | undefined>(undefined)

export function PortalProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<"user" | "admin">("user")

  const toggleUserType = () => {
    setUserType((prev) => (prev === "user" ? "admin" : "user"))
  }

  return <PortalContext.Provider value={{ userType, setUserType, toggleUserType }}>{children}</PortalContext.Provider>
}

export function usePortal() {
  const context = useContext(PortalContext)
  if (context === undefined) {
    throw new Error("usePortal must be used within a PortalProvider")
  }
  return context
}
