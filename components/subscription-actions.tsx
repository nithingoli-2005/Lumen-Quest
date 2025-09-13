"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowUpCircle,
  ArrowDownCircle,
  XCircle,
  RefreshCw,
  Zap,
  Wifi,
  Download,
  Upload,
  Check,
  AlertTriangle,
  Calendar,
  CreditCard,
} from "lucide-react"

interface Plan {
  id: string
  name: string
  speed: string
  downloadSpeed: number
  uploadSpeed: number
  price: number
  features: string[]
  category: "basic" | "premium" | "enterprise"
}

interface SubscriptionActionsProps {
  currentPlan: Plan
  onUpgrade?: (planId: string) => void
  onDowngrade?: (planId: string) => void
  onCancel?: (reason: string) => void
  onRenew?: () => void
}

const availablePlans: Plan[] = [
  {
    id: "starter",
    name: "Starter Connect",
    speed: "25 Mbps",
    downloadSpeed: 25,
    uploadSpeed: 5,
    price: 29.99,
    features: ["Email Support", "Basic Security", "1 Device"],
    category: "basic",
  },
  {
    id: "home-pro",
    name: "Home Pro",
    speed: "100 Mbps",
    downloadSpeed: 100,
    uploadSpeed: 20,
    price: 59.99,
    features: ["24/7 Support", "Advanced Security", "5 Devices", "Free Router"],
    category: "premium",
  },
  {
    id: "ultra-speed",
    name: "Ultra Speed",
    speed: "500 Mbps",
    downloadSpeed: 500,
    uploadSpeed: 100,
    price: 99.99,
    features: ["Priority Support", "Premium Security", "10 Devices", "Mesh Router", "Static IP"],
    category: "premium",
  },
  {
    id: "business-elite",
    name: "Business Elite",
    speed: "1 Gbps",
    downloadSpeed: 1000,
    uploadSpeed: 500,
    price: 199.99,
    features: ["Dedicated Support", "Enterprise Security", "Unlimited Devices", "SLA Guarantee"],
    category: "enterprise",
  },
]

export function SubscriptionActions({
  currentPlan,
  onUpgrade,
  onDowngrade,
  onCancel,
  onRenew,
}: SubscriptionActionsProps) {
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState<string>("")
  const [selectedDowngradePlan, setSelectedDowngradePlan] = useState<string>("")
  const [cancellationReason, setCancellationReason] = useState<string>("")
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false)
  const [isDowngradeOpen, setIsDowngradeOpen] = useState(false)

  const upgradePlans = availablePlans.filter((plan) => plan.price > currentPlan.price)
  const downgradePlans = availablePlans.filter((plan) => plan.price < currentPlan.price)

  const handleUpgrade = () => {
    if (selectedUpgradePlan) {
      onUpgrade?.(selectedUpgradePlan)
      setIsUpgradeOpen(false)
      setSelectedUpgradePlan("")
    }
  }

  const handleDowngrade = () => {
    if (selectedDowngradePlan) {
      onDowngrade?.(selectedDowngradePlan)
      setIsDowngradeOpen(false)
      setSelectedDowngradePlan("")
    }
  }

  const handleCancel = () => {
    if (cancellationReason.trim()) {
      onCancel?.(cancellationReason)
      setCancellationReason("")
    }
  }

  return (
    <div className="flex flex-wrap gap-4">
      {/* Upgrade Dialog */}
      <Dialog open={isUpgradeOpen} onOpenChange={setIsUpgradeOpen}>
        <DialogTrigger asChild>
          <Button className="animate-pulse-glow" disabled={upgradePlans.length === 0}>
            <ArrowUpCircle className="w-4 h-4 mr-2" />
            Upgrade Plan
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto animate-scale-in">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Upgrade Your Plan
            </DialogTitle>
            <DialogDescription>
              Choose a higher-tier plan to get more speed and features. Changes take effect immediately.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <RadioGroup value={selectedUpgradePlan} onValueChange={setSelectedUpgradePlan}>
              {upgradePlans.map((plan) => (
                <div key={plan.id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={plan.id} id={plan.id} />
                    <Label htmlFor={plan.id} className="cursor-pointer flex-1">
                      <Card className="hover:shadow-md transition-shadow duration-200 hover:bg-accent/5">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{plan.name}</CardTitle>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Wifi className="w-3 h-3" />
                                  {plan.speed}
                                </div>
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
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">${plan.price}</div>
                              <div className="text-sm text-muted-foreground">per month</div>
                              <Badge variant="secondary" className="mt-1">
                                +${(plan.price - currentPlan.price).toFixed(2)}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-2 gap-2">
                            {plan.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-xs">
                                <Check className="w-3 h-3 text-primary" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpgradeOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpgrade} disabled={!selectedUpgradePlan} className="animate-pulse-glow">
              <CreditCard className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Downgrade Dialog */}
      <Dialog open={isDowngradeOpen} onOpenChange={setIsDowngradeOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" disabled={downgradePlans.length === 0}>
            <ArrowDownCircle className="w-4 h-4 mr-2" />
            Downgrade
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto animate-scale-in">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowDownCircle className="w-5 h-5 text-orange-500" />
              Downgrade Your Plan
            </DialogTitle>
            <DialogDescription>
              Choose a lower-tier plan to reduce your monthly cost. Changes take effect at your next billing cycle.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800 mb-4">
            <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Important Notice</span>
            </div>
            <p className="text-sm text-orange-600 dark:text-orange-500">
              Downgrading may result in reduced speeds and features. Your current billing cycle will continue until the
              next renewal date.
            </p>
          </div>

          <div className="space-y-4">
            <RadioGroup value={selectedDowngradePlan} onValueChange={setSelectedDowngradePlan}>
              {downgradePlans.map((plan) => (
                <div key={plan.id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={plan.id} id={`downgrade-${plan.id}`} />
                    <Label htmlFor={`downgrade-${plan.id}`} className="cursor-pointer flex-1">
                      <Card className="hover:shadow-md transition-shadow duration-200 hover:bg-accent/5">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{plan.name}</CardTitle>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Wifi className="w-3 h-3" />
                                  {plan.speed}
                                </div>
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
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">${plan.price}</div>
                              <div className="text-sm text-muted-foreground">per month</div>
                              <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700">
                                Save ${(currentPlan.price - plan.price).toFixed(2)}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-2 gap-2">
                            {plan.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-xs">
                                <Check className="w-3 h-3 text-primary" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDowngradeOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDowngrade} disabled={!selectedDowngradePlan} variant="secondary">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Downgrade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Renew Button */}
      <Button variant="outline" onClick={onRenew}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Renew
      </Button>

      {/* Cancel Subscription Dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="ml-auto">
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              Cancel Subscription
            </AlertDialogTitle>
            <AlertDialogDescription>
              We're sorry to see you go! Your subscription will remain active until the end of your current billing
              period.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">What happens next?</span>
              </div>
              <ul className="text-sm text-red-600 dark:text-red-500 space-y-1">
                <li>• Your service will continue until your next billing date</li>
                <li>• You'll lose access to premium features</li>
                <li>• No refunds for the current billing period</li>
                <li>• You can reactivate anytime before the end date</li>
              </ul>
            </div>

            <div>
              <Label htmlFor="cancellation-reason" className="text-sm font-medium">
                Help us improve - Why are you cancelling? (Optional)
              </Label>
              <Textarea
                id="cancellation-reason"
                placeholder="Tell us why you're cancelling..."
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel} className="bg-destructive hover:bg-destructive/90">
              Cancel Subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
