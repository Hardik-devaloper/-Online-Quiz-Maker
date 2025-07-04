export interface User {
  id: string;
  name: string;
  email: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  createdBy: string;
  createdAt: Date;
  category: string;
}

export interface QuizAttempt {
  quizId: string;
  userId: string;
  answers: number[];
  score: number;
  completedAt: Date;
}