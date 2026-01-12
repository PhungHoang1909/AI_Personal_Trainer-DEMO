import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Clock, Flame, Dumbbell, Play, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Workout } from "@/lib/mockData";

interface WorkoutCardProps {
  workout: Workout;
  progress?: number;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

const difficultyColors = {
  Easy: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Hard: "bg-accent/10 text-accent border-accent/20",
};

export function WorkoutCard({
  workout,
  progress = 0,
  variant = "default",
  className,
}: WorkoutCardProps) {
  if (variant === "compact") {
    return (
      <Card className={cn(
        "transition-all duration-200 hover:shadow-md",
        workout.completed && "opacity-60",
        className
      )}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                workout.completed ? "bg-success/10" : "bg-primary/10"
              )}>
                {workout.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <Dumbbell className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground truncate">{workout.title}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {workout.duration}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5" />
                    {workout.estCalories} cal
                  </span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className={cn("shrink-0", difficultyColors[workout.difficulty])}>
              {workout.difficulty}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "featured") {
    return (
      <Card className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg animate-scale-in",
        className
      )}>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <ProgressRing progress={progress} size={80} strokeWidth={6}>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-foreground">{Math.round(progress)}%</span>
                  <span className="text-xs text-muted-foreground">done</span>
                </div>
              </ProgressRing>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs">
                    {workout.type}
                  </Badge>
                  <Badge variant="outline" className={cn("text-xs", difficultyColors[workout.difficulty])}>
                    {workout.difficulty}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{workout.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {workout.duration} min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Flame className="h-4 w-4" />
                    {workout.estCalories} cal
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Dumbbell className="h-4 w-4" />
                    {workout.exercises.length} exercises
                  </span>
                </div>
              </div>
            </div>
            <Button asChild size="lg" className="w-full sm:w-auto gap-2">
              <Link to="/workout">
                <Play className="h-4 w-4" />
                {progress > 0 ? "Continue" : "Start Workout"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      className
    )}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge variant="secondary" className="mb-2 text-xs">
              {workout.type}
            </Badge>
            <h3 className="font-semibold text-foreground">{workout.title}</h3>
          </div>
          <Badge variant="outline" className={difficultyColors[workout.difficulty]}>
            {workout.difficulty}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {workout.duration}m
            </span>
            <span className="flex items-center gap-1">
              <Flame className="h-4 w-4" />
              {workout.estCalories} cal
            </span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/workout">View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
