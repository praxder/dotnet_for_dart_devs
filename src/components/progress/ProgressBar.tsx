import { useState, useEffect } from 'preact/hooks';
import { loadProgress, getNextLesson } from './ProgressStore';
import { MODULES, TOTAL_LESSONS } from '../../lib/curriculum';

interface Props {
  compact?: boolean;
}

export default function ProgressBar({ compact = false }: Props) {
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const data = loadProgress();
    setCompleted(data.completedDays);

    const handler = () => {
      setCompleted(loadProgress().completedDays);
    };
    window.addEventListener('progress-updated', handler);
    return () => window.removeEventListener('progress-updated', handler);
  }, []);

  const pct = Math.round((completed.length / TOTAL_LESSONS) * 100);

  if (compact) {
    return (
      <div class="flex items-center gap-3 text-sm">
        <div class="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden min-w-[100px]">
          <div
            class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span class="text-slate-400 whitespace-nowrap tabular-nums">
          {completed.length}/{TOTAL_LESSONS}
        </span>
      </div>
    );
  }

  return (
    <div class="space-y-6">
      {/* Overall */}
      <div>
        <div class="flex justify-between items-end mb-2">
          <span class="text-sm font-medium text-slate-300">Overall Progress</span>
          <span class="text-2xl font-bold text-white tabular-nums">{pct}%</span>
        </div>
        <div class="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p class="text-xs text-slate-500 mt-1">{completed.length} of {TOTAL_LESSONS} lessons complete</p>
      </div>

      {/* Per-module */}
      <div class="grid grid-cols-1 gap-3">
        {MODULES.map(mod => {
          const total = mod.days[1] - mod.days[0] + 1;
          const done = completed.filter(d => d >= mod.days[0] && d <= mod.days[1]).length;
          const modPct = Math.round((done / total) * 100);
          return (
            <a
              key={mod.id}
              href={`${import.meta.env.BASE_URL}modules/${mod.slug}`}
              class="group flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
            >
              <span class="text-xl">{mod.icon}</span>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-baseline mb-1">
                  <span class="text-xs font-medium text-slate-300 truncate">{mod.shortName}</span>
                  <span class="text-xs text-slate-500 tabular-nums ml-2">{done}/{total}</span>
                </div>
                <div class="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-500"
                    style={{ width: `${modPct}%`, backgroundColor: mod.color }}
                  />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
