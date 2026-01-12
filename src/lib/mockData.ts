// Mock data for AI Fitness Coach demo

export interface User {
  id: string;
  name: string;
  age: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: string;
  sessionsPerWeek: number;
  currentStreak: number;
  totalWorkouts: number;
  caloriesBurned: number;
  weeklyGoal: number;
  avatar?: string;
}

export interface Exercise {
  id: string;
  name: string;
  reps: string;
  duration: number;
  equipment: string[];
  image?: string;
  completed: boolean;
  videoPlaceholder?: string;
}

export interface Workout {
  id: string;
  title: string;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estCalories: number;
  exercises: Exercise[];
  type: string;
  completed: boolean;
  day: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface WeeklyStats {
  day: string;
  calories: number;
  duration: number;
  workouts: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  achieved: boolean;
  date?: Date;
  icon: string;
}

// Emma - Primary Persona
export const mockUser: User = {
  id: 'u1',
  name: 'Emma',
  age: 30,
  level: 'Beginner',
  goal: 'Lose 6 kg',
  sessionsPerWeek: 4,
  currentStreak: 7,
  totalWorkouts: 23,
  caloriesBurned: 4850,
  weeklyGoal: 4,
};

export const todaysWorkout: Workout = {
  id: 'w1',
  title: 'Full Body Strength',
  duration: 30,
  difficulty: 'Medium',
  estCalories: 220,
  type: 'Strength',
  completed: false,
  day: 'Today',
  exercises: [
    {
      id: 'e1',
      name: 'Warm-up Dynamic Stretches',
      reps: '5 minutes',
      duration: 300,
      equipment: [],
      completed: false,
    },
    {
      id: 'e2',
      name: 'Bodyweight Squats',
      reps: '3 x 12',
      duration: 180,
      equipment: [],
      completed: false,
    },
    {
      id: 'e3',
      name: 'Push-ups',
      reps: '3 x 10',
      duration: 150,
      equipment: [],
      completed: false,
    },
    {
      id: 'e4',
      name: 'Dumbbell Rows',
      reps: '3 x 12 each arm',
      duration: 240,
      equipment: ['Dumbbells'],
      completed: false,
    },
    {
      id: 'e5',
      name: 'Plank Hold',
      reps: '3 x 30 seconds',
      duration: 120,
      equipment: [],
      completed: false,
    },
    {
      id: 'e6',
      name: 'Lunges',
      reps: '3 x 10 each leg',
      duration: 180,
      equipment: [],
      completed: false,
    },
    {
      id: 'e7',
      name: 'Cool-down Stretches',
      reps: '5 minutes',
      duration: 300,
      equipment: [],
      completed: false,
    },
  ],
};

export const weeklyPlan: Workout[] = [
  todaysWorkout,
  {
    id: 'w2',
    title: 'HIIT Cardio Blast',
    duration: 25,
    difficulty: 'Hard',
    estCalories: 280,
    type: 'Cardio',
    completed: false,
    day: 'Tuesday',
    exercises: [],
  },
  {
    id: 'w3',
    title: 'Rest Day',
    duration: 0,
    difficulty: 'Easy',
    estCalories: 0,
    type: 'Rest',
    completed: true,
    day: 'Wednesday',
    exercises: [],
  },
  {
    id: 'w4',
    title: 'Upper Body Focus',
    duration: 35,
    difficulty: 'Medium',
    estCalories: 200,
    type: 'Strength',
    completed: false,
    day: 'Thursday',
    exercises: [],
  },
  {
    id: 'w5',
    title: 'Core & Flexibility',
    duration: 30,
    difficulty: 'Easy',
    estCalories: 150,
    type: 'Flexibility',
    completed: false,
    day: 'Friday',
    exercises: [],
  },
  {
    id: 'w6',
    title: 'Lower Body Power',
    duration: 40,
    difficulty: 'Hard',
    estCalories: 300,
    type: 'Strength',
    completed: false,
    day: 'Saturday',
    exercises: [],
  },
  {
    id: 'w7',
    title: 'Active Recovery Yoga',
    duration: 20,
    difficulty: 'Easy',
    estCalories: 80,
    type: 'Recovery',
    completed: false,
    day: 'Sunday',
    exercises: [],
  },
];

export const weeklyStats: WeeklyStats[] = [
  { day: 'Mon', calories: 220, duration: 30, workouts: 1 },
  { day: 'Tue', calories: 280, duration: 25, workouts: 1 },
  { day: 'Wed', calories: 0, duration: 0, workouts: 0 },
  { day: 'Thu', calories: 200, duration: 35, workouts: 1 },
  { day: 'Fri', calories: 150, duration: 30, workouts: 1 },
  { day: 'Sat', calories: 0, duration: 0, workouts: 0 },
  { day: 'Sun', calories: 0, duration: 0, workouts: 0 },
];

export const milestones: Milestone[] = [
  {
    id: 'm1',
    title: 'First Workout',
    description: 'Completed your first workout!',
    achieved: true,
    date: new Date('2024-01-01'),
    icon: '🎯',
  },
  {
    id: 'm2',
    title: 'Week Warrior',
    description: '7-day streak achieved',
    achieved: true,
    date: new Date('2024-01-08'),
    icon: '🔥',
  },
  {
    id: 'm3',
    title: 'Strength Builder',
    description: 'Complete 10 strength workouts',
    achieved: true,
    date: new Date('2024-01-15'),
    icon: '💪',
  },
  {
    id: 'm4',
    title: 'Calorie Crusher',
    description: 'Burn 5,000 calories total',
    achieved: false,
    icon: '🔥',
  },
  {
    id: 'm5',
    title: 'Consistency King',
    description: '30-day streak',
    achieved: false,
    icon: '👑',
  },
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'c1',
    role: 'assistant',
    content: "Hi Emma! 👋 I'm your AI fitness coach. I've analyzed your goals and fitness level to create a personalized 12-week plan. Ready to crush today's workout?",
    timestamp: new Date(),
    suggestions: ['Start today\'s workout', 'Show my plan', 'Why this workout?'],
  },
];

export const mockChatResponses: Record<string, ChatMessage> = {
  'Why this workout?': {
    id: 'c2',
    role: 'assistant',
    content: "Great question! Today's Full Body Strength workout focuses on compound movements that maximize calorie burn and build lean muscle. At your beginner-intermediate level, these exercises will help you:\n\n• Build foundational strength\n• Boost metabolism for fat loss\n• Improve posture and balance\n\nThe 30-minute duration fits your schedule, and I've kept it equipment-minimal since you mentioned limited home gym access.",
    timestamp: new Date(),
    suggestions: ['Got it, let\'s start!', 'Can I modify exercises?', 'What about nutrition?'],
  },
  'Can I swap cardio for yoga?': {
    id: 'c3',
    role: 'assistant',
    content: "Absolutely! Here's the trade-off:\n\n**Swapping Tuesday's HIIT for Yoga:**\n✅ Better for recovery and flexibility\n✅ Lower impact on joints\n✅ Great for stress relief\n\n⚠️ Consideration:\n• You'd burn ~100 fewer calories\n• Less cardio conditioning\n\n**My suggestion:** Keep 1 HIIT session weekly and add yoga on rest days. Want me to update your plan?",
    timestamp: new Date(),
    suggestions: ['Yes, update my plan', 'Keep original plan', 'Show alternatives'],
  },
  'What about nutrition?': {
    id: 'c4',
    role: 'assistant',
    content: "For your goal of losing 6 kg in 12 weeks, here's my guidance:\n\n🍽️ **Daily Target:** ~1,600-1,800 calories\n🥗 **Protein:** 1.6g per kg body weight\n💧 **Water:** 2-3 liters daily\n\n**Post-workout tip:** Have a protein-rich snack within 30 min of finishing. Greek yogurt with berries is perfect!\n\nWant me to suggest meal ideas that complement today's workout?",
    timestamp: new Date(),
    suggestions: ['Show meal ideas', 'Track my nutrition', 'Back to workout'],
  },
};

export const onboardingSteps = [
  {
    id: 'goals',
    title: 'What\'s your main fitness goal?',
    subtitle: 'This helps us create the perfect plan for you',
    options: [
      { id: 'lose', label: 'Lose weight', icon: '⚖️' },
      { id: 'gain', label: 'Build muscle', icon: '💪' },
      { id: 'tone', label: 'Get toned', icon: '✨' },
      { id: 'health', label: 'Improve health', icon: '❤️' },
      { id: 'energy', label: 'Boost energy', icon: '⚡' },
    ],
  },
  {
    id: 'level',
    title: 'What\'s your fitness level?',
    subtitle: 'Be honest - we\'ll adjust as you progress',
    options: [
      { id: 'beginner', label: 'Beginner', description: 'New to exercise or returning after a break' },
      { id: 'intermediate', label: 'Intermediate', description: 'Regular exercise 1-3 times per week' },
      { id: 'advanced', label: 'Advanced', description: 'Consistent training 4+ times per week' },
    ],
  },
  {
    id: 'days',
    title: 'How many days can you train?',
    subtitle: 'Quality over quantity - consistency is key',
    options: [
      { id: '2', label: '2 days' },
      { id: '3', label: '3 days' },
      { id: '4', label: '4 days' },
      { id: '5', label: '5+ days' },
    ],
  },
  {
    id: 'time',
    title: 'How long per session?',
    subtitle: 'We\'ll optimize every minute',
    options: [
      { id: '15', label: '15-20 min' },
      { id: '30', label: '30-40 min' },
      { id: '45', label: '45-60 min' },
      { id: '60', label: '60+ min' },
    ],
  },
  {
    id: 'equipment',
    title: 'What equipment do you have?',
    subtitle: 'Select all that apply',
    multiSelect: true,
    options: [
      { id: 'none', label: 'No equipment', icon: '🏠' },
      { id: 'dumbbells', label: 'Dumbbells', icon: '🏋️' },
      { id: 'bands', label: 'Resistance bands', icon: '🎗️' },
      { id: 'kettlebell', label: 'Kettlebell', icon: '⚫' },
      { id: 'pullup', label: 'Pull-up bar', icon: '📏' },
      { id: 'gym', label: 'Full gym access', icon: '🏢' },
    ],
  },
];

export const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    features: [
      '3 workouts per week',
      'Basic AI coaching',
      'Progress tracking',
      'Community access',
    ],
    cta: 'Current Plan',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 14.99,
    period: 'month',
    features: [
      'Unlimited workouts',
      'Advanced AI coaching',
      'Personalized meal plans',
      'Wearable sync',
      'Video exercise guides',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    id: 'annual',
    name: 'Pro Annual',
    price: 99.99,
    period: 'year',
    features: [
      'Everything in Pro',
      '2 months free',
      'Exclusive challenges',
      '1-on-1 coach check-ins',
    ],
    cta: 'Best Value',
    popular: false,
  },
];
