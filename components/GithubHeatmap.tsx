'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitBranch, Flame } from 'lucide-react';

// Types mirroring lib/github.ts (client-safe copy, no env access)
type GithubApiDay = {
  date: string;
  count: number;
  level: number;
  color: string;
};

type GithubApiWeek = {
  contributionDays: GithubApiDay[];
};

type GithubApiData = {
  totalContributions: number;
  weeks: GithubApiWeek[];
  streak: number;
  longestStreak: number;
  prs: number;
  repos: number;
};

// Generates a mock realistic GitHub heatmap matrix for the last 52 weeks
const generateHeatmap = () => {
  const weeks = 52;
  const daysPerWeek = 7;
  const matrix = [];
  
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < daysPerWeek; d++) {
      // Deterministic pseudo-randomness for high activity aesthetic
      const seed = Math.sin(w * 7 + d) * 10000;
      const rand = seed - Math.floor(seed);
      let level = 0;
      if (rand > 0.75) level = 4;
      else if (rand > 0.5) level = 3;
      else if (rand > 0.3) level = 2;
      else if (rand > 0.15) level = 1;
      
      week.push({
        day: d,
        week: w,
        level,
        count: level === 0 ? 0 : Math.floor(rand * 8) + 1,
      });
    }
    matrix.push(week);
  }
  return matrix;
};

const heatmapData = generateHeatmap();

const levelColorsDark = [
  'bg-white/5',           // Level 0
  'bg-primary/30',        // Level 1
  'bg-primary/60',        // Level 2
  'bg-primary',           // Level 3
  'bg-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]', // Level 4
];

const levelColorsLight = [
  'bg-slate-200/80',      // Level 0
  'bg-primary/30',        // Level 1
  'bg-primary/60',        // Level 2
  'bg-primary',           // Level 3
  'bg-cyan shadow-sm',    // Level 4
];

export default function GithubHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<{ count: number; date?: string; week: number; day: number } | null>(null);
  const [data, setData] = useState<GithubApiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/github')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d && !d.error && typeof d.totalContributions === 'number') {
          setData(d as GithubApiData);
        }
      })
      .catch(() => {
        // keep mock fallback
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Header total: live or fallback mock "3,399"
  const totalLabel = data ? data.totalContributions.toLocaleString() : '3,399';

  // Chips: live or fallback hardcoded. For streak, show weeks derived from days (Math.ceil(streak/7)) when >=7, else days.
  const streakLabel = (() => {
    if (!data || typeof data.streak !== 'number') return '38 Week Streak';
    if (data.streak === 0) return '0 Day Streak';
    if (data.streak >= 7) {
      const weeks = Math.ceil(data.streak / 7);
      return `${weeks} Week Streak`;
    }
    return `${data.streak} Day Streak`;
  })();

  const prsLabel =
    data && typeof data.prs === 'number' ? `${data.prs.toLocaleString()} PRs Merged` : '120+ PRs Merged';

  const reposLabel = data && typeof data.repos === 'number' ? `${data.repos} Repos` : '50+ Repos';

  return (
    <section className="py-16 px-6 sm:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-8 rounded-3xl glow-border"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                <GitCommit size={20} />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                  Continuous Engineering Activity
                </h3>
                <p className="text-xs text-slate-600 dark:text-white/60 font-mono">
                  {totalLabel} contributions in the last year
                </p>
              </div>
            </div>

            {/* Quick stats chips */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan">
                <Flame size={13} className="text-orange-500" />
                <span>{streakLabel}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-primary">
                <GitPullRequest size={13} />
                <span>{prsLabel}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-secondary">
                <GitBranch size={13} />
                <span>{reposLabel}</span>
              </div>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto pb-3 pt-2" data-lenis-prevent>
            <div className={`min-w-[700px] flex gap-1.5 ${loading ? 'opacity-90' : ''}`}>
              {data?.weeks && data.weeks.length > 0 ? (
                data.weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5">
                    {week.contributionDays.map((day, dIdx) => {
                      const bgClass =
                        day.level === 0
                          ? 'bg-slate-200 dark:bg-white/5'
                          : day.level === 1
                            ? 'bg-primary/30'
                            : day.level === 2
                              ? 'bg-primary/60'
                              : day.level === 3
                                ? 'bg-primary'
                                : 'bg-cyan shadow-sm dark:shadow-[0_0_8px_rgba(6,182,212,0.6)]';
                      return (
                        <div
                          key={dIdx}
                          onMouseEnter={() =>
                            setHoveredCell({ count: day.count, date: day.date, week: wIdx, day: dIdx })
                          }
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`w-3 h-3 rounded-[3px] transition-all duration-150 cursor-pointer ${bgClass} hover:scale-125 hover:z-10`}
                          title={`${day.date}: ${day.count} contributions`}
                        />
                      );
                    })}
                  </div>
                ))
              ) : (
                // Fallback mock heatmap (also shown during loading)
                heatmapData.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5">
                    {week.map((cell, dIdx) => {
                      const bgClass =
                        cell.level === 0
                          ? 'bg-slate-200 dark:bg-white/5'
                          : cell.level === 1
                            ? 'bg-primary/30'
                            : cell.level === 2
                              ? 'bg-primary/60'
                              : cell.level === 3
                                ? 'bg-primary'
                                : 'bg-cyan shadow-sm dark:shadow-[0_0_8px_rgba(6,182,212,0.6)]';
                      return (
                        <div
                          key={dIdx}
                          onMouseEnter={() => setHoveredCell({ count: cell.count, week: wIdx, day: dIdx })}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`w-3 h-3 rounded-[3px] transition-all duration-150 cursor-pointer ${bgClass} hover:scale-125 hover:z-10`}
                        />
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer & Legend */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-white/40 pt-4 mt-2 border-t border-slate-200 dark:border-white/5">
            <div className="font-mono">
              {hoveredCell ? (
                <span className="text-slate-900 dark:text-white font-medium">
                  {hoveredCell.count === 0 ? 'No' : hoveredCell.count} contributions
                  {hoveredCell.date ? ` on ${hoveredCell.date}` : ` on Day ${hoveredCell.day + 1}`}
                </span>
              ) : (
                <span>Hover over squares to inspect daily velocity</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-slate-200 dark:bg-white/5" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/30" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/60" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-primary" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-cyan" />
              </div>
              <span>More</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
