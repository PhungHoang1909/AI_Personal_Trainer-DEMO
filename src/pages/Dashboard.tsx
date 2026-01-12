import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkoutCard } from "@/components/workout/WorkoutCard";
import { WeeklyChart } from "@/components/charts/WeeklyChart";
import { 
  Flame, 
  Target, 
  Calendar, 
  Trophy,
  TrendingUp,
  Zap,
  MessageCircle,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { mockUser, todaysWorkout, weeklyPlan, weeklyStats, milestones } from "@/lib/mockData";

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const completedThisWeek = weeklyStats.filter(d => d.workouts > 0).length;
  const progressPercent = (completedThisWeek / mockUser.weeklyGoal) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      
      <main className="container px-4 py-6 md:py-8">
        {/* Greeting */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Good morning, {mockUser.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            You're on a {mockUser.currentStreak}-day streak! Keep it going.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Flame className="h-5 w-5 text-accent" />
                <Badge variant="secondary" className="text-xs">This week</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {weeklyStats.reduce((sum, d) => sum + d.calories, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Calories burned</p>
            </CardContent>
          </Card>
          <Card className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-5 w-5 text-primary" />
                <Badge variant="secondary" className="text-xs">Goal</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {completedThisWeek}/{mockUser.weeklyGoal}
              </p>
              <p className="text-sm text-muted-foreground">Workouts done</p>
            </CardContent>
          </Card>
          <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Zap className="h-5 w-5 text-warning" />
                <Badge variant="secondary" className="text-xs">Streak</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{mockUser.currentStreak}</p>
              <p className="text-sm text-muted-foreground">Days in a row</p>
            </CardContent>
          </Card>
          <Card className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="h-5 w-5 text-chart-4" />
                <Badge variant="secondary" className="text-xs">Total</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{mockUser.totalWorkouts}</p>
              <p className="text-sm text-muted-foreground">Workouts completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Workout */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Today's Workout</h2>
            <Button variant="ghost" size="sm" asChild className="gap-1 text-muted-foreground">
              <Link to="/workout">
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <WorkoutCard 
            workout={todaysWorkout} 
            progress={progressPercent}
            variant="featured" 
          />
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weekly Calendar */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  This Week
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {weeklyPlan.slice(0, 4).map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} variant="compact" />
                ))}
              </div>
            </section>

            {/* Charts */}
            <section>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5" />
                Weekly Progress
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <WeeklyChart 
                  data={weeklyStats} 
                  title="Calories Burned" 
                  dataKey="calories"
                  color="hsl(var(--chart-1))"
                />
                <WeeklyChart 
                  data={weeklyStats} 
                  title="Workout Duration (min)" 
                  dataKey="duration"
                  color="hsl(var(--chart-3))"
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Coach Quick Access */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Coach</h3>
                    <p className="text-sm opacity-80">Ask anything</p>
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  asChild
                >
                  <Link to="/chat">Start Conversation</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-warning" />
                  Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {milestones.slice(0, 4).map((milestone) => (
                  <div 
                    key={milestone.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="text-2xl">{milestone.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${milestone.achieved ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {milestone.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {milestone.description}
                      </p>
                    </div>
                    {milestone.achieved && (
                      <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                        Done
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
