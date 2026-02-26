import { useState, useEffect } from 'preact/hooks';
import { loadProgress, getNextLesson } from './ProgressStore';
import { TOTAL_LESSONS } from '../../lib/curriculum';

export default function ContinueButton() {
  const [nextDay, setNextDay] = useState<number | null>(null);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const data = loadProgress();
    setCompleted(data.completedDays.length);
    if (data.completedDays.length < TOTAL_LESSONS) {
      setNextDay(getNextLesson(data.completedDays));
    }
  }, []);

  if (nextDay === null) return null;

  const isStart = completed === 0;
  const dayStr = String(nextDay).padStart(3, '0');

  return (
    <a
      href={`/lessons/day-${dayStr}`}
      class={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-100 shadow-lg ${
        isStart
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50'
          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50'
      }`}
    >
      <span class="text-2xl">{isStart ? '🚀' : '▶️'}</span>
      <span>{isStart ? 'Start Learning' : `Continue — Day ${nextDay}`}</span>
    </a>
  );
}
