"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Edit, Trash2, MoreHorizontal, Wifi, Download, Users, Eye, EyeOff } from "lucide-react"

interface Plan {
  id: string
  name: string
  description: string
  speed: string
  downloadSpeed: number
  uploadSpeed: number
  dataQuota: string
  price: number
  features: string[]
  category: "basic" | "premium" | "enterprise"
  active: boolean
  subscribers: number
  createdAt: string
  updatedAt: string
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
    features: ["Email Support", "Basic Security", "1 Device"],
    category: "basic",
    active: true,
    subscribers: 8420,
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01",
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
    features: ["24/7 Support", "Advanced Security", "5 Devices", "Free Router"],
    category: "premium",
    active: true,
    subscribers: 24680,
    createdAt: "2024-01-15",
    updatedAt: "2024-11-15",
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
    category: "premium",
    active: true,
    subscribers: 12340,
    createdAt: "2024-02-01",
    updatedAt: "2024-10-20",
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
    category: "enterprise",
    active: true,
    subscribers: 2952,
    createdAt: "2024-03-01",
    updatedAt: "2024-09-10",
  },
  {
    id: "5",
    name: "Legacy Basic",
    description: "Discontinued basic plan",
    speed: "10 Mbps",
    downloadSpeed: 10,
    uploadSpeed: 2,
    dataQuota: "100 GB",
    price: 19.99,
    features: ["Email Support", "Basic Security"],
    category: "basic",
    active: false,
    subscribers: 156,
    createdAt: "2023-01-01",
    updatedAt: "2024-06-01",
  },
]

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>(mockPlans)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    downloadSpeed: "",
    uploadSpeed: "",
    dataQuota: "",
    price: "",
    features: "",
    category: "basic" as "basic" | "premium" | "enterprise",
    active: true,
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      downloadSpeed: "",
      uploadSpeed: "",
      dataQuota: "",
      price: "",
      features: "",
      category: "basic",
      active: true,
    })
  }

  const handleCreate = () => {
    const newPlan: Plan = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      speed: `${formData.downloadSpeed} Mbps`,
      downloadSpeed: Number.parseInt(formData.downloadSpeed),
      uploadSpeed: Number.parseInt(formData.uploadSpeed),
      dataQuota: formData.dataQuota,
      price: Number.parseFloat(formData.price),
      features: formData.features.split(",").map((f) => f.trim()),
      category: formData.category,
      active: formData.active,
      subscribers: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setPlans([...plans, newPlan])
    setIsCreateOpen(false)
    resetForm()
  }

  const handleEdit = (plan: Plan) => {
    setSelectedPlan(plan)
    setFormData({
      name: plan.name,
      description: plan.description,
      downloadSpeed: plan.downloadSpeed.toString(),
      uploadSpeed: plan.uploadSpeed.toString(),
      dataQuota: plan.dataQuota,
      price: plan.price.toString(),
      features: plan.features.join(", "),
      category: plan.category,
      active: plan.active,
    })
    setIsEditOpen(true)
  }

  const handleUpdate = () => {
    if (!selectedPlan) return

    const updatedPlan: Plan = {
      ...selectedPlan,
      name: formData.name,
      description: formData.description,
      speed: `${formData.downloadSpeed} Mbps`,
      downloadSpeed: Number.parseInt(formData.downloadSpeed),
      uploadSpeed: Number.parseInt(formData.uploadSpeed),
      dataQuota: formData.dataQuota,
      price: Number.parseFloat(formData.price),
      features: formData.features.split(",").map((f) => f.trim()),
      category: formData.category,
      active: formData.active,
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setPlans(plans.map((plan) => (plan.id === selectedPlan.id ? updatedPlan : plan)))
    setIsEditOpen(false)
    setSelectedPlan(null)
    resetForm()
  }

  const handleDelete = (planId: string) => {
    setPlans(plans.filter((plan) => plan.id !== planId))
  }

  const togglePlanStatus = (planId: string) => {
    setPlans(
      plans.map((plan) =>
        plan.id === planId
          ? { ...plan, active: !plan.active, updatedAt: new Date().toISOString().split("T")[0] }
          : plan,
      ),
    )
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "basic":
        return <Badge variant="secondary">Basic</Badge>
      case "premium":
        return <Badge variant="default">Premium</Badge>
      case "enterprise":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Enterprise</Badge>
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
          <div className="flex items-center justify-between animate-fade-in-up">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Plan Management</h1>
              <p className="text-xl text-muted-foreground">Create and manage broadband service plans</p>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="animate-pulse-glow">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl animate-scale-in">
                <DialogHeader>
                  <DialogTitle>Create New Plan</DialogTitle>
                  <DialogDescription>Add a new broadband plan to your offerings</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Plan Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Home Pro"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of the plan"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="downloadSpeed">Download Speed (Mbps)</Label>
                    <Input
                      id="downloadSpeed"
                      type="number"
                      value={formData.downloadSpeed}
                      onChange={(e) => setFormData({ ...formData, downloadSpeed: e.target.value })}
                      placeholder="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="uploadSpeed">Upload Speed (Mbps)</Label>
                    <Input
                      id="uploadSpeed"
                      type="number"
                      value={formData.uploadSpeed}
                      onChange={(e) => setFormData({ ...formData, uploadSpeed: e.target.value })}
                      placeholder="20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataQuota">Data Quota</Label>
                    <Input
                      id="dataQuota"
                      value={formData.dataQuota}
                      onChange={(e) => setFormData({ ...formData, dataQuota: e.target.value })}
                      placeholder="Unlimited or 500 GB"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="59.99"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="features">Features (comma-separated)</Label>
                    <Textarea
                      id="features"
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      placeholder="24/7 Support, Advanced Security, 5 Devices"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={formData.active}
                      onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                    />
                    <Label htmlFor="active">Active Plan</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreate}>Create Plan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plans Table */}
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle>All Plans</CardTitle>
            <CardDescription>Manage your broadband service offerings</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Speed</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Subscribers</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan, index) => (
                  <TableRow
                    key={plan.id}
                    className="animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">{plan.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(plan.category)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Wifi className="w-3 h-3" />
                        {plan.speed}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <Download className="w-3 h-3 inline mr-1" />
                        {plan.downloadSpeed} ↑{plan.uploadSpeed}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${plan.price}</div>
                      <div className="text-xs text-muted-foreground">per month</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {plan.subscribers.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {plan.active ? (
                          <Eye className="w-4 h-4 text-green-500" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-500" />
                        )}
                        <Badge variant={plan.active ? "default" : "secondary"}>
                          {plan.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(plan)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Plan
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => togglePlanStatus(plan.id)}>
                            {plan.active ? (
                              <>
                                <EyeOff className="w-4 h-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(plan.id)}
                            className="text-destructive"
                            disabled={plan.subscribers > 0}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Plan
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-2xl animate-scale-in">
            <DialogHeader>
              <DialogTitle>Edit Plan</DialogTitle>
              <DialogDescription>Update plan details and settings</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Plan Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-downloadSpeed">Download Speed (Mbps)</Label>
                <Input
                  id="edit-downloadSpeed"
                  type="number"
                  value={formData.downloadSpeed}
                  onChange={(e) => setFormData({ ...formData, downloadSpeed: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-uploadSpeed">Upload Speed (Mbps)</Label>
                <Input
                  id="edit-uploadSpeed"
                  type="number"
                  value={formData.uploadSpeed}
                  onChange={(e) => setFormData({ ...formData, uploadSpeed: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-dataQuota">Data Quota</Label>
                <Input
                  id="edit-dataQuota"
                  value={formData.dataQuota}
                  onChange={(e) => setFormData({ ...formData, dataQuota: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="edit-features">Features (comma-separated)</Label>
                <Textarea
                  id="edit-features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
                <Label htmlFor="edit-active">Active Plan</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Update Plan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
