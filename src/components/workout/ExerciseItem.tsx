import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Exercise } from "@/lib/mockData";

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  isActive?: boolean;
  onComplete: (id: string) => void;
  onSelect?: (id: string) => void;
}

export function ExerciseItem({
  exercise,
  index,
  isActive = false,
  onComplete,
  onSelect,
}: ExerciseItemProps) {
  const [isExpanded, setIsExpanded] = useState(isActive);
  const [isPaused, setIsPaused] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(exercise.duration);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleTimer = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setTimeRemaining(exercise.duration);
    setIsPaused(true);
  };

  return (
    <Card 
      className={cn(
        "transition-all duration-200",
        isActive && "ring-2 ring-primary shadow-lg",
        exercise.completed && "bg-muted/50"
      )}
    >
      <CardContent className="p-4">
        <div 
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => onSelect?.(exercise.id)}
        >
          <Checkbox
            checked={exercise.completed}
            onCheckedChange={() => onComplete(exercise.id)}
            className="h-5 w-5"
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
            {index + 1}
          </div>

          {/* Exercise thumbnail placeholder */}
          <div className="hidden sm:flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-muted">
            <span className="text-2xl">🏋️</span>
          </div>

          <div className="flex-1 min-w-0">
            <p className={cn(
              "font-medium text-foreground",
              exercise.completed && "line-through text-muted-foreground"
            )}>
              {exercise.name}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">{exercise.reps}</span>
              {exercise.equipment.length > 0 && (
                <div className="flex gap-1">
                  {exercise.equipment.map((eq) => (
                    <Badge key={eq} variant="outline" className="text-xs">
                      {eq}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border animate-fade-in">
            {/* Video placeholder */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <span className="text-4xl mb-2 block">🎬</span>
                <p className="text-sm text-muted-foreground">Exercise Demo Video</p>
              </div>
            </div>

            {/* Timer controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant={isPaused ? "default" : "secondary"}
                  size="sm"
                  onClick={handleToggleTimer}
                  className="gap-2"
                >
                  {isPaused ? (
                    <>
                      <Play className="h-4 w-4" />
                      Start
                    </>
                  ) : (
                    <>
                      <Pause className="h-4 w-4" />
                      Pause
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-2xl font-mono font-bold text-foreground">
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
