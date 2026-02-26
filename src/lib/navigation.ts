import type { Lesson } from './lessons';

export interface LessonNav {
  prev: Lesson | null;
  next: Lesson | null;
}

export function getLessonNavigation(current: Lesson, all: Lesson[]): LessonNav {
  const sorted = [...all].sort((a, b) => a.data.day - b.data.day);
  const idx = sorted.findIndex(l => l.data.day === current.data.day);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}

export function getWeekForDay(day: number): number {
  return Math.ceil(day / 5);
}
