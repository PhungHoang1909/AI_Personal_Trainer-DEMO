import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, 
  Brain, 
  TrendingUp, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  Check,
  Play,
  Star
} from "lucide-react";
import heroImage from "@/assets/hero-fitness.jpg";

const features = [
  {
    icon: Brain,
    title: "AI-Personalized Plans",
    description: "Get workouts tailored to your goals, schedule, and fitness level",
  },
  {
    icon: Dumbbell,
    title: "Adaptive Workouts",
    description: "Every session adjusts based on your progress and energy",
  },
  {
    icon: TrendingUp,
    title: "Smart Progress Tracking",
    description: "Visualize your gains with intelligent analytics",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Plans that fit your busy life, not the other way around",
  },
];

const testimonials = [
  {
    name: "Emma R.",
    role: "Busy Professional",
    content: "Lost 6kg in 12 weeks while working 60-hour weeks. The AI adapts to my chaotic schedule perfectly.",
    rating: 5,
  },
  {
    name: "Alex M.",
    role: "Parent of Two",
    content: "Finally a fitness app that understands I only have 20 minutes. Every workout counts.",
    rating: 5,
  },
  {
    name: "Jordan K.",
    role: "Fitness Beginner",
    content: "The AI coach explains everything. It's like having a personal trainer in my pocket.",
    rating: 5,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Dumbbell className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FitAI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/onboarding">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/onboarding">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container relative px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <Badge variant="secondary" className="gap-2 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI-Powered Fitness
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Your AI-Powered
                <span className="text-primary"> Personal Coach</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                12-week personalized plans that adapt to your life. Lose weight, build strength, or boost energy with AI that understands you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="gap-2 text-base">
                  <Link to="/onboarding">
                    Start Free Trial
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2 text-base">
                  <Link to="/dashboard">
                    <Play className="h-5 w-5" />
                    See Demo
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Cancel anytime
                </span>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl" />
              <img
                src={heroImage}
                alt="Person stretching at sunrise in modern home gym"
                className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Fitness that fits your life
            </h2>
            <p className="text-lg text-muted-foreground">
              Our AI creates the perfect workout plan based on your goals, schedule, and equipment. No more guessing.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loved by thousands
            </h2>
            <p className="text-lg text-muted-foreground">
              Join the community of people transforming their fitness with AI
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to transform your fitness?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Start your personalized 12-week plan today. No equipment needed.
            </p>
            <Button size="lg" variant="secondary" asChild className="gap-2 text-base">
              <Link to="/onboarding">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Dumbbell className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">FitAI Coach</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 FitAI Coach. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
