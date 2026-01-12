import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ExerciseItem } from "@/components/workout/ExerciseItem";
import { 
  ArrowLeft, 
  Clock, 
  Flame, 
  Pause, 
  Play, 
  SkipForward,
  CheckCircle2,
  Sparkles,
  Volume2
} from "lucide-react";
import { todaysWorkout, type Exercise } from "@/lib/mockData";

export default function WorkoutPlayer() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>(todaysWorkout.exercises);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const completedCount = exercises.filter(e => e.completed).length;
  const progressPercent = (completedCount / exercises.length) * 100;

  const handleCompleteExercise = (id: string) => {
    const updated = exercises.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    );
    setExercises(updated);

    // Auto-advance to next incomplete exercise
    if (!exercises.find(e => e.id === id)?.completed) {
      const nextIndex = updated.findIndex((e, idx) => idx > currentExerciseIndex && !e.completed);
      if (nextIndex !== -1) {
        setCurrentExerciseIndex(nextIndex);
      }
    }

    // Check if all complete
    if (updated.every(e => e.completed)) {
      setIsWorkoutComplete(true);
    }
  };

  const handleSelectExercise = (id: string) => {
    const index = exercises.findIndex(e => e.id === id);
    if (index !== -1) {
      setCurrentExerciseIndex(index);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handleStartWorkout = () => {
    setIsWorkoutStarted(true);
    setIsPaused(false);
  };

  const handleCompleteWorkout = () => {
    navigate('/dashboard');
  };

  if (isWorkoutComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        <div className="container px-4 py-12 md:py-20">
          <div className="max-w-md mx-auto text-center animate-scale-in">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-success/10 mb-6">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Workout Complete! 🎉
            </h1>
            <p className="text-muted-foreground mb-8">
              Great job! You crushed {todaysWorkout.title} and burned approximately {todaysWorkout.estCalories} calories.
            </p>
            
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{todaysWorkout.duration}</p>
                    <p className="text-sm text-muted-foreground">Minutes</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{todaysWorkout.estCalories}</p>
                    <p className="text-sm text-muted-foreground">Calories</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{exercises.length}</p>
                    <p className="text-sm text-muted-foreground">Exercises</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button size="lg" onClick={handleCompleteWorkout}>
                Back to Dashboard
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/chat')}>
                Chat with AI Coach
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      
      <main className="container px-4 py-6">
        {/* Back button and title */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">{todaysWorkout.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {todaysWorkout.duration} min
              </span>
              <span className="flex items-center gap-1">
                <Flame className="h-4 w-4" />
                {todaysWorkout.estCalories} cal
              </span>
              <Badge variant="outline">{todaysWorkout.difficulty}</Badge>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedCount}/{exercises.length} exercises
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </CardContent>
        </Card>

        {/* AI Suggestion */}
        {isWorkoutStarted && currentExerciseIndex === 2 && !exercises[2].completed && (
          <Card className="mb-6 border-primary/20 bg-primary/5 animate-fade-in">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">AI Tip</p>
                  <p className="text-sm text-muted-foreground">
                    Keep your core tight during push-ups. If 10 reps feel too hard, try doing them on your knees – quality over quantity!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Start workout overlay */}
        {!isWorkoutStarted && (
          <Card className="mb-6 text-center">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-foreground mb-2">Ready to begin?</h2>
              <p className="text-muted-foreground mb-6">
                {exercises.length} exercises • {todaysWorkout.duration} minutes
              </p>
              <Button size="lg" className="gap-2" onClick={handleStartWorkout}>
                <Play className="h-5 w-5" />
                Start Workout
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Exercise list */}
        <section className="mb-24">
          <CardHeader className="px-0 pb-4">
            <CardTitle className="text-lg">Exercises</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                index={index}
                isActive={isWorkoutStarted && index === currentExerciseIndex}
                onComplete={handleCompleteExercise}
                onSelect={handleSelectExercise}
              />
            ))}
          </div>
        </section>

        {/* Floating controls */}
        {isWorkoutStarted && (
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 animate-slide-up">
            <div className="container flex items-center justify-between gap-4">
              <Button variant="outline" size="icon">
                <Volume2 className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <Button 
                  size="lg" 
                  className="gap-2 min-w-32"
                  onClick={() => setIsPaused(!isPaused)}
                >
                  {isPaused ? (
                    <>
                      <Play className="h-5 w-5" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="h-5 w-5" />
                      Pause
                    </>
                  )}
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleNextExercise}
                disabled={currentExerciseIndex >= exercises.length - 1}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
