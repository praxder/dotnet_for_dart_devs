const STORAGE_KEY = 'cs-learning-progress';

export interface ProgressData {
  completedDays: number[];
  startDate: string | null;
  bookmarks: number[];
}

const DEFAULT: ProgressData = {
  completedDays: [],
  startDate: null,
  bookmarks: [],
};

export function loadProgress(): ProgressData {
  if (typeof localStorage === 'undefined') return { ...DEFAULT };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : { ...DEFAULT };
  } catch {
    return { ...DEFAULT };
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function markComplete(day: number): ProgressData {
  const data = loadProgress();
  if (!data.completedDays.includes(day)) {
    data.completedDays = [...data.completedDays, day].sort((a, b) => a - b);
  }
  if (!data.startDate) {
    data.startDate = new Date().toISOString();
  }
  saveProgress(data);
  return data;
}

export function markIncomplete(day: number): ProgressData {
  const data = loadProgress();
  data.completedDays = data.completedDays.filter(d => d !== day);
  saveProgress(data);
  return data;
}

export function toggleBookmark(day: number): ProgressData {
  const data = loadProgress();
  if (data.bookmarks.includes(day)) {
    data.bookmarks = data.bookmarks.filter(d => d !== day);
  } else {
    data.bookmarks = [...data.bookmarks, day];
  }
  saveProgress(data);
  return data;
}

export function isComplete(day: number): boolean {
  return loadProgress().completedDays.includes(day);
}

export function getNextLesson(completedDays: number[], totalLessons = 130): number {
  for (let d = 1; d <= totalLessons; d++) {
    if (!completedDays.includes(d)) return d;
  }
  return totalLessons;
}

export function exportProgress(): string {
  return JSON.stringify(loadProgress(), null, 2);
}

export function importProgress(json: string): boolean {
  try {
    const data = JSON.parse(json);
    saveProgress({ ...DEFAULT, ...data });
    return true;
  } catch {
    return false;
  }
}
