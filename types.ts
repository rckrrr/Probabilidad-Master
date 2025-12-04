export interface Question {
  id: number;
  q: string;
  opts: string[];
  c: number; // Index of correct answer
  exp: string; // Explanation
  category: string; // For analytics (e.g., "Combinatoria", "Lógica")
}

export interface StudySlide {
  title: string;
  content: string;
  example: string;
}

export interface LevelData {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  questions: Question[];
  studyMaterial: StudySlide[];
}

export enum GameState {
  MENU = 'MENU',
  STUDY = 'STUDY',
  PLAYING = 'PLAYING',
  RESULTS = 'RESULTS'
}