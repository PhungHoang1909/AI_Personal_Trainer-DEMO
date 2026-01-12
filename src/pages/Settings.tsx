import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Bell, 
  Watch, 
  Shield, 
  CreditCard, 
  HelpCircle,
  ChevronRight,
  Pencil,
  Smartphone,
  Mail,
  LogOut
} from "lucide-react";
import { mockUser, pricingPlans } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    progressUpdates: true,
    aiTips: true,
    marketing: false,
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      
      <main className="container px-4 py-6 md:py-8 max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Settings
        </h1>

        {/* Profile Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {mockUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{mockUser.name}</h3>
                  <p className="text-sm text-muted-foreground">emma@example.com</p>
                  <Badge variant="secondary" className="mt-1">{mockUser.level}</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-foreground">Fitness Goal</p>
                  <p className="text-sm text-muted-foreground">{mockUser.goal}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-foreground">Sessions per Week</p>
                  <p className="text-sm text-muted-foreground">{mockUser.sessionsPerWeek} days</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="workout-reminders" className="text-base">Workout Reminders</Label>
                <p className="text-sm text-muted-foreground">Daily reminder before your scheduled workout</p>
              </div>
              <Switch 
                id="workout-reminders"
                checked={notifications.workoutReminders}
                onCheckedChange={(checked) => setNotifications({...notifications, workoutReminders: checked})}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="progress-updates" className="text-base">Progress Updates</Label>
                <p className="text-sm text-muted-foreground">Weekly summary of your achievements</p>
              </div>
              <Switch 
                id="progress-updates"
                checked={notifications.progressUpdates}
                onCheckedChange={(checked) => setNotifications({...notifications, progressUpdates: checked})}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ai-tips" className="text-base">AI Coach Tips</Label>
                <p className="text-sm text-muted-foreground">Personalized suggestions from your AI coach</p>
              </div>
              <Switch 
                id="ai-tips"
                checked={notifications.aiTips}
                onCheckedChange={(checked) => setNotifications({...notifications, aiTips: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Connected Devices */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Watch className="h-5 w-5" />
              Connected Devices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <Watch className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Apple Watch</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Fitbit</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium text-foreground">Free Plan</p>
                <p className="text-sm text-muted-foreground">Basic features with 3 workouts/week</p>
              </div>
              <Badge variant="secondary">Current</Badge>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Upgrade to Pro</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Choose Your Plan</DialogTitle>
                  <DialogDescription>
                    Unlock unlimited workouts and advanced AI coaching
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {pricingPlans.map((plan) => (
                    <Card 
                      key={plan.id}
                      className={`cursor-pointer transition-all ${plan.popular ? 'ring-2 ring-primary' : ''}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{plan.name}</h3>
                              {plan.popular && (
                                <Badge className="bg-primary">Most Popular</Badge>
                              )}
                            </div>
                            <p className="text-2xl font-bold text-foreground mt-1">
                              ${plan.price}
                              <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                            </p>
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-success">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className="w-full mt-4" 
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Other */}
        <Card className="mb-6">
          <CardContent className="py-2">
            <Button variant="ghost" className="w-full justify-between py-6" asChild>
              <a href="#">
                <span className="flex items-center gap-3">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
            <Separator />
            <Button variant="ghost" className="w-full justify-between py-6" asChild>
              <a href="#">
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5" />
                  Help & Support
                </span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
            <Separator />
            <Button variant="ghost" className="w-full justify-between py-6" asChild>
              <a href="#">
                <span className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  Contact Us
                </span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive">
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </main>
    </div>
  );
}
