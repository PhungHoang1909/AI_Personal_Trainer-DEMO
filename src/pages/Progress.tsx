import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeeklyChart } from "@/components/charts/WeeklyChart";
import { ProgressRing } from "@/components/ui/progress-ring";
import { 
  TrendingUp, 
  Flame, 
  Dumbbell, 
  Clock, 
  Trophy,
  Target,
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { mockUser, weeklyStats, milestones } from "@/lib/mockData";

export default function Progress() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const totalCalories = weeklyStats.reduce((sum, d) => sum + d.calories, 0);
  const totalDuration = weeklyStats.reduce((sum, d) => sum + d.duration, 0);
  const totalWorkouts = weeklyStats.reduce((sum, d) => sum + d.workouts, 0);
  const goalProgress = (mockUser.totalWorkouts / 48) * 100; // 12 weeks * 4 workouts/week = 48

  return (
    <div className="min-h-screen bg-background">
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      
      <main className="container px-4 py-6 md:py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Your Progress
          </h1>
          <p className="text-muted-foreground">
            Track your fitness journey and celebrate your wins
          </p>
        </div>

        {/* Main Goal Progress */}
        <Card className="mb-8 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <ProgressRing progress={goalProgress} size={160} strokeWidth={12}>
                <div className="text-center">
                  <span className="text-3xl font-bold text-foreground">{Math.round(goalProgress)}%</span>
                  <p className="text-xs text-muted-foreground">of goal</p>
                </div>
              </ProgressRing>
              <div className="flex-1 text-center md:text-left">
                <Badge variant="secondary" className="mb-2">12-Week Goal</Badge>
                <h2 className="text-2xl font-bold text-foreground mb-2">{mockUser.goal}</h2>
                <p className="text-muted-foreground mb-4">
                  You've completed {mockUser.totalWorkouts} of 48 planned workouts. Keep going!
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                      <ArrowUp className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">+12%</p>
                      <p className="text-xs text-muted-foreground">vs last week</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Flame className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{mockUser.caloriesBurned.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Total calories</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="week" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-6">
            {/* Weekly Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{totalWorkouts}</p>
                      <p className="text-sm text-muted-foreground">Workouts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Flame className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{totalCalories}</p>
                      <p className="text-sm text-muted-foreground">Calories</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{totalDuration}</p>
                      <p className="text-sm text-muted-foreground">Minutes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{mockUser.currentStreak}</p>
                      <p className="text-sm text-muted-foreground">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
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
          </TabsContent>

          <TabsContent value="month">
            <Card className="p-12 text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Monthly Analytics</h3>
              <p className="text-muted-foreground">Complete more workouts to see your monthly trends</p>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">All Time Stats</h3>
              <p className="text-muted-foreground">Your complete fitness history will appear here</p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Milestones */}
        <section>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-6">
            <Trophy className="h-5 w-5 text-warning" />
            Achievements
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((milestone) => (
              <Card 
                key={milestone.id}
                className={`transition-all duration-200 ${milestone.achieved ? '' : 'opacity-60'}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl ${
                      milestone.achieved ? 'bg-warning/10' : 'bg-muted'
                    }`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                        {milestone.achieved && (
                          <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      {milestone.date && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Achieved {milestone.date.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
