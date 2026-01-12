import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check, Sparkles, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";
import { onboardingSteps } from "@/lib/mockData";

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [showPlanPreview, setShowPlanPreview] = useState(false);

  const step = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  const handleSelect = (optionId: string) => {
    const current = selections[step.id] || [];
    if (step.multiSelect) {
      if (current.includes(optionId)) {
        setSelections({
          ...selections,
          [step.id]: current.filter((id) => id !== optionId),
        });
      } else {
        setSelections({
          ...selections,
          [step.id]: [...current, optionId],
        });
      }
    } else {
      setSelections({
        ...selections,
        [step.id]: [optionId],
      });
    }
  };

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowPlanPreview(true);
    }
  };

  const handleBack = () => {
    if (showPlanPreview) {
      setShowPlanPreview(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isSelected = (optionId: string) => {
    return (selections[step?.id] || []).includes(optionId);
  };

  const canProceed = !step || (selections[step.id] || []).length > 0;

  if (showPlanPreview) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="container flex h-16 items-center px-4">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 text-center">
              <span className="font-semibold text-foreground">Your Personalized Plan</span>
            </div>
            <div className="w-10" />
          </div>
        </header>

        {/* Plan Preview */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Your AI Plan is Ready! 🎉
              </h1>
              <p className="text-muted-foreground">
                Based on your goals, here's your personalized 4-week preview
              </p>
            </div>

            {/* AI Personalization Card */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">AI Personalization Active</h3>
                    <p className="text-sm text-muted-foreground">
                      Your plan adapts in real-time based on your progress, energy levels, and feedback. Every workout is optimized for your success.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plan Summary */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Your 12-Week Journey</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-muted-foreground">Weekly Sessions</p>
                    <p className="text-2xl font-bold text-foreground">4</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-muted-foreground">Session Duration</p>
                    <p className="text-2xl font-bold text-foreground">30m</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-muted-foreground">Primary Goal</p>
                    <p className="text-2xl font-bold text-foreground">Lose 6kg</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-muted-foreground">Difficulty</p>
                    <p className="text-2xl font-bold text-foreground">Beginner</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Week Preview */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Week 1 Preview</h3>
                <div className="space-y-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                    const hasWorkout = [0, 1, 3, 4].includes(idx);
                    return (
                      <div key={day} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <span className="font-medium text-foreground">{day}</span>
                        {hasWorkout ? (
                          <Badge variant="secondary" className="gap-1">
                            <Dumbbell className="h-3 w-3" />
                            {idx === 0 && "Full Body Strength"}
                            {idx === 1 && "HIIT Cardio"}
                            {idx === 3 && "Upper Body"}
                            {idx === 4 && "Core & Flexibility"}
                          </Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">Rest Day</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Button 
              size="lg" 
              className="w-full gap-2"
              onClick={() => navigate('/dashboard')}
            >
              Start My Journey
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => currentStep > 0 ? handleBack() : navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 px-4">
            <Progress value={progress} className="h-2" />
          </div>
          <span className="text-sm text-muted-foreground">
            {currentStep + 1}/{onboardingSteps.length}
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4 md:p-8">
        <div className="flex-1 flex flex-col max-w-xl mx-auto w-full">
          <div className="flex-1 flex flex-col justify-center animate-fade-in" key={currentStep}>
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {step.title}
              </h1>
              <p className="text-muted-foreground">
                {step.subtitle}
              </p>
            </div>

            {/* Options */}
            <div className={cn(
              "grid gap-3",
              step.options.length > 4 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"
            )}>
              {step.options.map((option) => (
                <Card
                  key={option.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md",
                    isSelected(option.id) && "ring-2 ring-primary bg-primary/5"
                  )}
                  onClick={() => handleSelect(option.id)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    {step.multiSelect ? (
                      <Checkbox checked={isSelected(option.id)} className="shrink-0" />
                    ) : (
                      <div className={cn(
                        "h-5 w-5 rounded-full border-2 shrink-0 flex items-center justify-center",
                        isSelected(option.id) ? "border-primary bg-primary" : "border-muted-foreground"
                      )}>
                        {isSelected(option.id) && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {'icon' in option && (
                          <span className="text-xl">{option.icon}</span>
                        )}
                        <span className="font-medium text-foreground">{option.label}</span>
                      </div>
                      {'description' in option && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {option.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6">
            <Button
              size="lg"
              className="w-full gap-2"
              disabled={!canProceed}
              onClick={handleNext}
            >
              {currentStep === onboardingSteps.length - 1 ? "Create My Plan" : "Continue"}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
