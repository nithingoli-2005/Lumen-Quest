"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Zap,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  Shield,
  Settings,
  BarChart3,
  UserCheck,
  UserX,
} from "lucide-react"

interface DashboardStats {
  totalUsers: number
  activeSubscriptions: number
  monthlyRevenue: number
  churnRate: number
  averageSpeed: number
  supportTickets: number
  systemUptime: number
  newSignups: number
}

interface RecentActivity {
  id: string
  type: "signup" | "upgrade" | "downgrade" | "cancellation" | "support"
  user: string
  description: string
  timestamp: string
  status: "completed" | "pending" | "failed"
}

interface SystemAlert {
  id: string
  type: "warning" | "error" | "info"
  title: string
  description: string
  timestamp: string
  resolved: boolean
}

const mockStats: DashboardStats = {
  totalUsers: 52847,
  activeSubscriptions: 48392,
  monthlyRevenue: 2847392,
  churnRate: 3.2,
  averageSpeed: 187.5,
  supportTickets: 127,
  systemUptime: 99.97,
  newSignups: 1247,
}

const mockRecentActivity: RecentActivity[] = [
  {
    id: "1",
    type: "signup",
    user: "john.doe@email.com",
    description: "New user signed up for Home Pro plan",
    timestamp: "2025-01-13T14:30:00Z",
    status: "completed",
  },
  {
    id: "2",
    type: "upgrade",
    user: "sarah.smith@email.com",
    description: "Upgraded from Starter to Ultra Speed",
    timestamp: "2025-01-13T13:45:00Z",
    status: "completed",
  },
  {
    id: "3",
    type: "support",
    user: "mike.johnson@email.com",
    description: "Speed issue reported and resolved",
    timestamp: "2025-01-13T12:20:00Z",
    status: "completed",
  },
  {
    id: "4",
    type: "cancellation",
    user: "lisa.brown@email.com",
    description: "Cancelled subscription - moving",
    timestamp: "2025-01-13T11:15:00Z",
    status: "completed",
  },
  {
    id: "5",
    type: "downgrade",
    user: "alex.wilson@email.com",
    description: "Downgraded from Ultra to Home Pro",
    timestamp: "2025-01-13T10:30:00Z",
    status: "pending",
  },
]

const mockSystemAlerts: SystemAlert[] = [
  {
    id: "1",
    type: "warning",
    title: "High Server Load",
    description: "Server load is at 85% capacity in Region East",
    timestamp: "2025-01-13T15:00:00Z",
    resolved: false,
  },
  {
    id: "2",
    type: "info",
    title: "Maintenance Scheduled",
    description: "Routine maintenance scheduled for January 20, 2025",
    timestamp: "2025-01-13T09:00:00Z",
    resolved: false,
  },
  {
    id: "3",
    type: "error",
    title: "Payment Gateway Issue",
    description: "Temporary payment processing delays resolved",
    timestamp: "2025-01-12T16:30:00Z",
    resolved: true,
  },
]

export default function AdminDashboard() {
  const [stats] = useState<DashboardStats>(mockStats)
  const [recentActivity] = useState<RecentActivity[]>(mockRecentActivity)
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>(mockSystemAlerts)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "signup":
        return <UserCheck className="w-4 h-4 text-green-500" />
      case "upgrade":
        return <TrendingUp className="w-4 h-4 text-blue-500" />
      case "downgrade":
        return <TrendingDown className="w-4 h-4 text-orange-500" />
      case "cancellation":
        return <UserX className="w-4 h-4 text-red-500" />
      case "support":
        return <Shield className="w-4 h-4 text-purple-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500">
            Completed
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "info":
        return <Activity className="w-5 h-5 text-blue-500" />
      default:
        return <Activity className="w-5 h-5 text-gray-500" />
    }
  }

  const resolveAlert = (alertId: string) => {
    setSystemAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, resolved: true } : alert)))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="admin" />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Admin Dashboard</h1>
            <p className="text-xl text-muted-foreground">Monitor and manage your LUMEN Quest platform</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-scale-in hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{stats.newSignups}</span> new this month
              </p>
            </CardContent>
          </Card>

          <Card
            className="animate-scale-in hover:shadow-lg transition-shadow duration-300"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.activeSubscriptions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.activeSubscriptions / stats.totalUsers) * 100).toFixed(1)}% conversion rate
              </p>
            </CardContent>
          </Card>

          <Card
            className="animate-scale-in hover:shadow-lg transition-shadow duration-300"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${stats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card
            className="animate-scale-in hover:shadow-lg transition-shadow duration-300"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.systemUptime}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">Excellent</span> performance
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 animate-scale-in">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Stats */}
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle>Quick Statistics</CardTitle>
                  <CardDescription>Key performance indicators at a glance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Churn Rate</span>
                      <span className="font-medium">{stats.churnRate}%</span>
                    </div>
                    <Progress value={stats.churnRate} max={10} className="h-2" />
                    <p className="text-xs text-muted-foreground">Target: &lt;5%</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Average Speed</span>
                      <span className="font-medium">{stats.averageSpeed} Mbps</span>
                    </div>
                    <Progress value={(stats.averageSpeed / 500) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">Network performance</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Support Tickets</span>
                      <span className="font-medium">{stats.supportTickets} open</span>
                    </div>
                    <Progress value={(stats.supportTickets / 200) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">Response time: 2.3 hours avg</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start animate-pulse-glow">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Zap className="w-4 h-4 mr-2" />
                    Create New Plan
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Audit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest user actions and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-3">
                        {getActivityIcon(activity.type)}
                        <div>
                          <div className="font-medium">{activity.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.user} • {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(activity.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Monitor system health and resolve issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert, index) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border animate-slide-in-right ${
                        alert.resolved
                          ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                          : alert.type === "error"
                            ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                            : alert.type === "warning"
                              ? "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
                              : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {alert.resolved ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          ) : (
                            getAlertIcon(alert.type)
                          )}
                          <div>
                            <div className="font-medium">{alert.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">{alert.description}</div>
                            <div className="text-xs text-muted-foreground mt-2">
                              {new Date(alert.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        {!alert.resolved && (
                          <Button size="sm" variant="outline" onClick={() => resolveAlert(alert.id)}>
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle>Network Performance</CardTitle>
                  <CardDescription>Real-time network statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-primary" />
                      <span className="text-sm">Average Speed</span>
                    </div>
                    <span className="font-medium">{stats.averageSpeed} Mbps</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-accent" />
                      <span className="text-sm">Uptime</span>
                    </div>
                    <span className="font-medium">{stats.systemUptime}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-chart-3" />
                      <span className="text-sm">Response Time</span>
                    </div>
                    <span className="font-medium">12ms</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle>Business Metrics</CardTitle>
                  <CardDescription>Key business performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm">ARPU</span>
                    </div>
                    <span className="font-medium">$58.73</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Growth Rate</span>
                    </div>
                    <span className="font-medium">+12.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Customer Satisfaction</span>
                    </div>
                    <span className="font-medium">4.7/5</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
