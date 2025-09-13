"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Send, Bell, Users, Mail, MessageSquare, Calendar, Eye, Trash2, Edit } from "lucide-react"

interface NotificationTemplate {
  id: string
  title: string
  content: string
  type: "email" | "sms" | "push" | "in-app"
  category: "promotional" | "service" | "billing" | "maintenance"
  active: boolean
  createdAt: string
  lastUsed?: string
  recipients: number
}

interface NotificationCampaign {
  id: string
  name: string
  template: string
  targetAudience: string
  scheduledDate: string
  status: "draft" | "scheduled" | "sent" | "cancelled"
  recipients: number
  openRate?: number
  clickRate?: number
}

const mockTemplates: NotificationTemplate[] = [
  {
    id: "1",
    title: "Welcome New Customer",
    content: "Welcome to LUMEN Quest! Your broadband service is now active.",
    type: "email",
    category: "service",
    active: true,
    createdAt: "2024-01-15",
    lastUsed: "2025-01-13",
    recipients: 1247,
  },
  {
    id: "2",
    title: "Payment Reminder",
    content: "Your payment is due in 3 days. Please update your payment method.",
    type: "email",
    category: "billing",
    active: true,
    createdAt: "2024-02-01",
    lastUsed: "2025-01-12",
    recipients: 892,
  },
  {
    id: "3",
    title: "Maintenance Notice",
    content: "Scheduled maintenance will occur on {date} from {start_time} to {end_time}.",
    type: "sms",
    category: "maintenance",
    active: true,
    createdAt: "2024-03-10",
    lastUsed: "2025-01-10",
    recipients: 48392,
  },
  {
    id: "4",
    title: "Upgrade Offer",
    content: "Upgrade to Ultra Speed for just $20 more per month!",
    type: "push",
    category: "promotional",
    active: true,
    createdAt: "2024-04-05",
    lastUsed: "2025-01-08",
    recipients: 12340,
  },
]

const mockCampaigns: NotificationCampaign[] = [
  {
    id: "1",
    name: "January Upgrade Promotion",
    template: "Upgrade Offer",
    targetAudience: "Home Pro Users",
    scheduledDate: "2025-01-15T10:00:00Z",
    status: "scheduled",
    recipients: 24680,
  },
  {
    id: "2",
    name: "Maintenance Alert - Region East",
    template: "Maintenance Notice",
    targetAudience: "Region East Users",
    scheduledDate: "2025-01-20T08:00:00Z",
    status: "scheduled",
    recipients: 15420,
  },
  {
    id: "3",
    name: "Payment Reminder Batch",
    template: "Payment Reminder",
    targetAudience: "Overdue Payments",
    scheduledDate: "2025-01-12T09:00:00Z",
    status: "sent",
    recipients: 892,
    openRate: 78.5,
    clickRate: 23.1,
  },
]

export default function AdminNotificationsPage() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>(mockTemplates)
  const [campaigns, setCampaigns] = useState<NotificationCampaign[]>(mockCampaigns)
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false)
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false)
  const [templateForm, setTemplateForm] = useState({
    title: "",
    content: "",
    type: "email" as "email" | "sms" | "push" | "in-app",
    category: "service" as "promotional" | "service" | "billing" | "maintenance",
    active: true,
  })
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    template: "",
    targetAudience: "",
    scheduledDate: "",
  })

  const resetTemplateForm = () => {
    setTemplateForm({
      title: "",
      content: "",
      type: "email",
      category: "service",
      active: true,
    })
  }

  const resetCampaignForm = () => {
    setCampaignForm({
      name: "",
      template: "",
      targetAudience: "",
      scheduledDate: "",
    })
  }

  const handleCreateTemplate = () => {
    const newTemplate: NotificationTemplate = {
      id: Date.now().toString(),
      title: templateForm.title,
      content: templateForm.content,
      type: templateForm.type,
      category: templateForm.category,
      active: templateForm.active,
      createdAt: new Date().toISOString().split("T")[0],
      recipients: 0,
    }

    setTemplates([...templates, newTemplate])
    setIsCreateTemplateOpen(false)
    resetTemplateForm()
  }

  const handleCreateCampaign = () => {
    const newCampaign: NotificationCampaign = {
      id: Date.now().toString(),
      name: campaignForm.name,
      template: campaignForm.template,
      targetAudience: campaignForm.targetAudience,
      scheduledDate: campaignForm.scheduledDate,
      status: "draft",
      recipients: Math.floor(Math.random() * 50000) + 1000,
    }

    setCampaigns([...campaigns, newCampaign])
    setIsCreateCampaignOpen(false)
    resetCampaignForm()
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="w-4 h-4" />
      case "sms":
        return <MessageSquare className="w-4 h-4" />
      case "push":
        return <Bell className="w-4 h-4" />
      case "in-app":
        return <Bell className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "promotional":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Promotional</Badge>
      case "service":
        return <Badge variant="default">Service</Badge>
      case "billing":
        return <Badge className="bg-orange-500 hover:bg-orange-600">Billing</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Maintenance</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Scheduled</Badge>
      case "sent":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            Sent
          </Badge>
        )
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="admin" />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Notification Center</h1>
            <p className="text-xl text-muted-foreground">Manage customer communications and campaigns</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-scale-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Templates</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{templates.filter((t) => t.active).length}</div>
              <p className="text-xs text-muted-foreground">Ready to use</p>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Campaigns</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {campaigns.filter((c) => c.status === "scheduled").length}
              </div>
              <p className="text-xs text-muted-foreground">Upcoming sends</p>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {campaigns.reduce((sum, campaign) => sum + campaign.recipients, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">78.5%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="templates" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 animate-scale-in">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Notification Templates</h2>
                <p className="text-muted-foreground">Create and manage reusable notification templates</p>
              </div>
              <Dialog open={isCreateTemplateOpen} onOpenChange={setIsCreateTemplateOpen}>
                <DialogTrigger asChild>
                  <Button className="animate-pulse-glow">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl animate-scale-in">
                  <DialogHeader>
                    <DialogTitle>Create Notification Template</DialogTitle>
                    <DialogDescription>Design a reusable template for customer communications</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="template-title">Template Title</Label>
                      <Input
                        id="template-title"
                        value={templateForm.title}
                        onChange={(e) => setTemplateForm({ ...templateForm, title: e.target.value })}
                        placeholder="e.g., Welcome New Customer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template-type">Type</Label>
                      <Select
                        value={templateForm.type}
                        onValueChange={(value: any) => setTemplateForm({ ...templateForm, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="push">Push Notification</SelectItem>
                          <SelectItem value="in-app">In-App</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template-category">Category</Label>
                      <Select
                        value={templateForm.category}
                        onValueChange={(value: any) => setTemplateForm({ ...templateForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="promotional">Promotional</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="template-active"
                        checked={templateForm.active}
                        onCheckedChange={(checked) => setTemplateForm({ ...templateForm, active: checked })}
                      />
                      <Label htmlFor="template-active">Active Template</Label>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="template-content">Content</Label>
                      <Textarea
                        id="template-content"
                        value={templateForm.content}
                        onChange={(e) => setTemplateForm({ ...templateForm, content: e.target.value })}
                        placeholder="Enter your notification content here..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateTemplateOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateTemplate}>Create Template</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="animate-fade-in-up">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map((template, index) => (
                      <TableRow
                        key={template.id}
                        className="animate-slide-in-left"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium">{template.title}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-xs">{template.content}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(template.type)}
                            <span className="capitalize">{template.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryBadge(template.category)}</TableCell>
                        <TableCell>{template.recipients.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={template.active ? "default" : "secondary"}>
                            {template.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {template.lastUsed ? new Date(template.lastUsed).toLocaleDateString() : "Never"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Notification Campaigns</h2>
                <p className="text-muted-foreground">Schedule and manage notification campaigns</p>
              </div>
              <Dialog open={isCreateCampaignOpen} onOpenChange={setIsCreateCampaignOpen}>
                <DialogTrigger asChild>
                  <Button className="animate-pulse-glow">
                    <Send className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl animate-scale-in">
                  <DialogHeader>
                    <DialogTitle>Create Notification Campaign</DialogTitle>
                    <DialogDescription>Schedule a notification to be sent to your customers</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="campaign-name">Campaign Name</Label>
                      <Input
                        id="campaign-name"
                        value={campaignForm.name}
                        onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                        placeholder="e.g., January Promotion"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="campaign-template">Template</Label>
                      <Select
                        value={campaignForm.template}
                        onValueChange={(value) => setCampaignForm({ ...campaignForm, template: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates
                            .filter((t) => t.active)
                            .map((template) => (
                              <SelectItem key={template.id} value={template.title}>
                                {template.title}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="campaign-audience">Target Audience</Label>
                      <Select
                        value={campaignForm.targetAudience}
                        onValueChange={(value) => setCampaignForm({ ...campaignForm, targetAudience: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="starter">Starter Connect Users</SelectItem>
                          <SelectItem value="home-pro">Home Pro Users</SelectItem>
                          <SelectItem value="ultra">Ultra Speed Users</SelectItem>
                          <SelectItem value="business">Business Elite Users</SelectItem>
                          <SelectItem value="new">New Customers</SelectItem>
                          <SelectItem value="inactive">Inactive Users</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="campaign-date">Scheduled Date</Label>
                      <Input
                        id="campaign-date"
                        type="datetime-local"
                        value={campaignForm.scheduledDate}
                        onChange={(e) => setCampaignForm({ ...campaignForm, scheduledDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateCampaignOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateCampaign}>Create Campaign</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="animate-fade-in-up">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Template</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Scheduled</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign, index) => (
                      <TableRow
                        key={campaign.id}
                        className="animate-slide-in-left"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <TableCell>
                          <div className="font-medium">{campaign.name}</div>
                        </TableCell>
                        <TableCell>{campaign.template}</TableCell>
                        <TableCell>{campaign.targetAudience}</TableCell>
                        <TableCell>{campaign.recipients.toLocaleString()}</TableCell>
                        <TableCell>{new Date(campaign.scheduledDate).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                        <TableCell>
                          {campaign.openRate && campaign.clickRate ? (
                            <div className="text-sm">
                              <div>Open: {campaign.openRate}%</div>
                              <div>Click: {campaign.clickRate}%</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
