import { getCollection, type CollectionEntry } from 'astro:content';
import { MODULES } from './curriculum';

export type Lesson = CollectionEntry<'lessons'>;

export async function getAllLessons(): Promise<Lesson[]> {
  const lessons = await getCollection('lessons');
  return lessons.sort((a, b) => a.data.day - b.data.day);
}

export async function getLessonByDay(day: number): Promise<Lesson | undefined> {
  const lessons = await getAllLessons();
  return lessons.find(l => l.data.day === day);
}

export async function getLessonsByModule(moduleId: number): Promise<Lesson[]> {
  const lessons = await getAllLessons();
  return lessons.filter(l => l.data.module === moduleId);
}

export async function getLessonsByPhase(phase: 'csharp' | 'dotnet'): Promise<Lesson[]> {
  const lessons = await getAllLessons();
  return lessons.filter(l => l.data.phase === phase);
}

export function getDaySlug(day: number): string {
  return `day-${String(day).padStart(3, '0')}`;
}

export function getDayFromSlug(slug: string): number {
  const match = slug.match(/day-(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export function getLessonUrl(lesson: Lesson): string {
  return `/lessons/${lesson.slug}`;
}

export interface ModuleProgress {
  moduleId: number;
  total: number;
  completed: number;
  percent: number;
}

export function calcModuleProgress(
  completedDays: number[],
  moduleId: number
): ModuleProgress {
  const mod = MODULES.find(m => m.id === moduleId)!;
  const total = mod.days[1] - mod.days[0] + 1;
  const completed = completedDays.filter(
    d => d >= mod.days[0] && d <= mod.days[1]
  ).length;
  return { moduleId, total, completed, percent: Math.round((completed / total) * 100) };
}
