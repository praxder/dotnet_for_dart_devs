import { useState, useEffect } from 'preact/hooks';
import { isComplete, markComplete, markIncomplete } from './ProgressStore';

interface Props {
  day: number;
  nextUrl?: string;
}

export default function LessonComplete({ day, nextUrl }: Props) {
  const [done, setDone] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setDone(isComplete(day));
  }, [day]);

  function toggle() {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    if (done) {
      markIncomplete(day);
      setDone(false);
    } else {
      markComplete(day);
      setDone(true);
    }
    window.dispatchEvent(new Event('progress-updated'));
  }

  return (
    <div class="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-slate-800/50 border border-slate-700 mt-8">
      <button
        onClick={toggle}
        class={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
          done
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
            : 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95'
        } ${animating ? 'scale-95' : ''}`}
      >
        <span class={`text-lg transition-transform duration-300 ${animating ? 'scale-125' : ''}`}>
          {done ? '✅' : '⬜'}
        </span>
        {done ? 'Lesson Complete!' : 'Mark as Complete'}
      </button>

      {done && nextUrl && (
        <a
          href={nextUrl}
          class="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 transition-colors"
        >
          Next Lesson →
        </a>
      )}

      <p class="text-xs text-slate-500 text-center sm:text-left">
        {done
          ? `Day ${day} marked complete. Progress saved.`
          : 'Mark complete to track your progress'}
      </p>
    </div>
  );
}
