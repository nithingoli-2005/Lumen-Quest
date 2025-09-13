"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingDown,
  Users,
  DollarSign,
  Zap,
  Activity,
  Download,
  PieChartIcon,
  LineChartIcon,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

// Mock data for analytics
const subscriptionTrends = [
  { month: "Jul", active: 42000, cancelled: 1200, new: 3500 },
  { month: "Aug", active: 44300, cancelled: 1100, new: 3800 },
  { month: "Sep", active: 46800, cancelled: 1300, new: 4200 },
  { month: "Oct", active: 48200, cancelled: 1000, new: 3900 },
  { month: "Nov", active: 49800, cancelled: 1400, new: 4100 },
  { month: "Dec", active: 51200, cancelled: 1200, new: 4300 },
  { month: "Jan", active: 52800, cancelled: 1100, new: 4500 },
]

const planDistribution = [
  { name: "Home Pro", value: 24680, percentage: 51.0, color: "#059669" },
  { name: "Ultra Speed", value: 12340, percentage: 25.5, color: "#10b981" },
  { name: "Starter Connect", value: 8420, percentage: 17.4, color: "#34d399" },
  { name: "Business Elite", value: 2952, percentage: 6.1, color: "#6ee7b7" },
]

const revenueData = [
  { month: "Jul", revenue: 2456000, growth: 8.2 },
  { month: "Aug", revenue: 2587000, growth: 5.3 },
  { month: "Sep", revenue: 2698000, growth: 4.3 },
  { month: "Oct", revenue: 2734000, growth: 1.3 },
  { month: "Nov", revenue: 2789000, growth: 2.0 },
  { month: "Dec", revenue: 2823000, growth: 1.2 },
  { month: "Jan", revenue: 2847000, growth: 0.8 },
]

const churnAnalysis = [
  { reason: "Moving", count: 145, percentage: 32.1 },
  { reason: "Price", count: 98, percentage: 21.7 },
  { reason: "Speed Issues", count: 76, percentage: 16.8 },
  { reason: "Customer Service", count: 54, percentage: 12.0 },
  { reason: "Competition", count: 43, percentage: 9.5 },
  { reason: "Other", count: 36, percentage: 8.0 },
]

const performanceMetrics = [
  { metric: "Average Speed", value: 187.5, unit: "Mbps", change: 2.3, target: 180 },
  { metric: "Uptime", value: 99.97, unit: "%", change: 0.02, target: 99.9 },
  { metric: "Customer Satisfaction", value: 4.7, unit: "/5", change: 0.1, target: 4.5 },
  { metric: "Support Response", value: 2.3, unit: "hours", change: -0.5, target: 4.0 },
]

const topPlans = [
  { name: "Home Pro", subscribers: 24680, revenue: 1467192, growth: 12.5 },
  { name: "Ultra Speed", subscribers: 12340, revenue: 1233966, growth: 8.7 },
  { name: "Starter Connect", subscribers: 8420, revenue: 252479, growth: -2.1 },
  { name: "Business Elite", subscribers: 2952, revenue: 590448, growth: 15.3 },
]

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("subscribers")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <ArrowUpRight className="w-4 h-4 text-green-500" />
    ) : (
      <ArrowDownRight className="w-4 h-4 text-red-500" />
    )
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="admin" />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between animate-fade-in-up">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Analytics Dashboard</h1>
              <p className="text-xl text-muted-foreground">Comprehensive insights and performance metrics</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-scale-in hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatCurrency(2847392)}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {getChangeIcon(12.5)}
                <span className={getChangeColor(12.5)}>+12.5%</span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="animate-scale-in hover:shadow-lg transition-shadow duration-300"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{formatNumber(48392)}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {getChangeIcon(8.7)}
                <span className={getChangeColor(8.7)}>+8.7%</span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="animate-scale-in hover:shadow-lg transition-shadow duration-300"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">3.2%</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {getChangeIcon(-0.8)}
                <span className={getChangeColor(-0.8)}>-0.8%</span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="animate-scale-in hover:shadow-lg transition-shadow duration-300"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Revenue Per User</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">${58.73}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {getChangeIcon(3.2)}
                <span className={getChangeColor(3.2)}>+3.2%</span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 animate-scale-in">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="churn">Churn Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Subscription Trends */}
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="w-5 h-5 text-primary" />
                    Subscription Trends
                  </CardTitle>
                  <CardDescription>Monthly active, new, and cancelled subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={subscriptionTrends}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="active"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                        name="Active"
                      />
                      <Line
                        type="monotone"
                        dataKey="new"
                        stroke="hsl(var(--accent))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 3 }}
                        name="New"
                      />
                      <Line
                        type="monotone"
                        dataKey="cancelled"
                        stroke="hsl(var(--destructive))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 3 }}
                        name="Cancelled"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Plan Distribution */}
              <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5 text-accent" />
                    Plan Distribution
                  </CardTitle>
                  <CardDescription>Current subscriber distribution by plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col lg:flex-row items-center gap-6">
                    <div className="w-full lg:w-1/2">
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={planDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {planDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-3">
                      {planDistribution.map((plan, index) => (
                        <div key={plan.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                            <span className="text-sm font-medium">{plan.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold">{formatNumber(plan.value)}</div>
                            <div className="text-xs text-muted-foreground">{plan.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Plans */}
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>Top Performing Plans</CardTitle>
                <CardDescription>Plans ranked by subscriber count and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPlans.map((plan, index) => (
                    <div
                      key={plan.name}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Zap className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{plan.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatNumber(plan.subscribers)} subscribers
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(plan.revenue)}</div>
                        <div className="flex items-center gap-1 text-sm">
                          {getChangeIcon(plan.growth)}
                          <span className={getChangeColor(plan.growth)}>
                            {plan.growth > 0 ? "+" : ""}
                            {plan.growth}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-8">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>Subscriber Growth</CardTitle>
                <CardDescription>Monthly subscriber acquisition and retention</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={subscriptionTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="active"
                      stackId="1"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.6}
                      name="Active Subscribers"
                    />
                    <Area
                      type="monotone"
                      dataKey="new"
                      stackId="2"
                      stroke="hsl(var(--accent))"
                      fill="hsl(var(--accent))"
                      fillOpacity={0.6}
                      name="New Subscribers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-8">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Monthly revenue trends and growth rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any) => [formatCurrency(value), "Revenue"]}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Monthly Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {performanceMetrics.map((metric, index) => (
                <Card
                  key={metric.metric}
                  className="animate-scale-in hover:shadow-lg transition-shadow duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{metric.metric}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{metric.value}</span>
                      <span className="text-muted-foreground">{metric.unit}</span>
                      <div className="flex items-center gap-1 ml-auto">
                        {getChangeIcon(metric.change)}
                        <span className={`text-sm ${getChangeColor(metric.change)}`}>
                          {metric.change > 0 ? "+" : ""}
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          Target: {metric.target}
                          {metric.unit}
                        </span>
                        <span>{((metric.value / metric.target) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(metric.value / metric.target) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="churn" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle>Churn Reasons</CardTitle>
                  <CardDescription>Why customers are cancelling their subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={churnAnalysis} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis type="number" />
                      <YAxis dataKey="reason" type="category" width={100} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="hsl(var(--destructive))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle>Churn Prevention Actions</CardTitle>
                  <CardDescription>Recommended actions to reduce churn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 text-red-700 dark:text-red-400 mb-2">
                      <TrendingDown className="w-4 h-4" />
                      <span className="font-medium">High Priority</span>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-500">
                      32% of churn is due to moving. Consider portable/transferable plans.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400 mb-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">Price Sensitivity</span>
                    </div>
                    <p className="text-sm text-yellow-600 dark:text-yellow-500">
                      22% cite price as reason. Review competitive pricing and value propositions.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
                      <Activity className="w-4 h-4" />
                      <span className="font-medium">Service Quality</span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-500">
                      17% report speed issues. Focus on network infrastructure improvements.
                    </p>
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
