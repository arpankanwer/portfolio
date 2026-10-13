'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitBranch, Flame, ExternalLink } from 'lucide-react';

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

const GITHUB_PROFILE_URL = 'https://github.com/arpankanwer';

// Neutral grid shown while loading or when GitHub is unavailable; never fake activity
const PLACEHOLDER_WEEKS = Array.from({ length: 53 });

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Year-in-review numbers derived from the calendar the API already returns.
// Dates are plain YYYY-MM-DD, so they're read as UTC to keep the weekday/month exact.
function summarize(weeks: GithubApiWeek[]) {
  const days = weeks.flatMap((w) => w.contributionDays);
  const total = days.reduce((sum, d) => sum + d.count, 0);
  const activeDays = days.filter((d) => d.count > 0).length;
  const byWeekday = Array<number>(7).fill(0);
  const byMonth = new Map<string, number>();
  for (const d of days) {
    byWeekday[new Date(`${d.date}T00:00:00Z`).getUTCDay()] += d.count;
    const month = d.date.slice(0, 7);
    byMonth.set(month, (byMonth.get(month) ?? 0) + d.count);
  }
  const busiest = byWeekday.indexOf(Math.max(...byWeekday));
  const [bestMonthKey, bestMonthCount] = [...byMonth].reduce((best, m) => (m[1] > best[1] ? m : best), ['', 0]);
  return {
    total,
    activeDays,
    totalDays: days.length,
    avgPerActiveDay: activeDays ? total / activeDays : 0,
    busiestWeekday: WEEKDAYS[busiest],
    busiestWeekdayCount: byWeekday[busiest],
    bestMonth: bestMonthKey
      ? new Date(`${bestMonthKey}-01T00:00:00Z`).toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
      : '',
    bestMonthCount,
  };
}

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
  const [hoveredCell, setHoveredCell] = useState<{ count: number; date: string } | null>(null);
  const [data, setData] = useState<GithubApiData | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const gridScrollRef = useRef<HTMLDivElement>(null);

  // On narrow screens the grid overflows; show the most recent weeks first
  useEffect(() => {
    const el = gridScrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [status]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/github')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d && !d.error && typeof d.totalContributions === 'number') {
          setData(d as GithubApiData);
          setStatus('ready');
        } else {
          setStatus('error');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Labels only exist for live data; loading and error states render placeholders instead.
  // For streak, show weeks derived from days (Math.ceil(streak/7)) when >=7, else days.
  const streakLabel = (() => {
    if (!data || typeof data.streak !== 'number') return null;
    if (data.streak === 0) return '0 Day Streak';
    if (data.streak >= 7) {
      const weeks = Math.ceil(data.streak / 7);
      return `${weeks} Week Streak`;
    }
    return `${data.streak} Day Streak`;
  })();

  const prsLabel =
    data && typeof data.prs === 'number' ? `${data.prs.toLocaleString()} PRs Merged` : null;

  const reposLabel = data && typeof data.repos === 'number' ? `${data.repos} Repos` : null;

  const summary = useMemo(() => (data?.weeks?.length ? summarize(data.weeks) : null), [data]);
  const statTiles = summary && summary.total > 0 && data
    ? [
        { label: 'Active days', value: `${summary.activeDays} / ${summary.totalDays}`, sub: `~${Math.round(summary.avgPerActiveDay)} per active day` },
        { label: 'Longest streak', value: `${data.longestStreak} ${data.longestStreak === 1 ? 'day' : 'days'}`, sub: 'in a row' },
        // busiestWeekdayCount is the sum over every such weekday in the year, so show it as a share, not a raw count
        { label: 'Busiest weekday', value: `${summary.busiestWeekday}s`, sub: `${Math.round((summary.busiestWeekdayCount / summary.total) * 100)}% of activity` },
        { label: 'Best month', value: summary.bestMonth, sub: `${summary.bestMonthCount.toLocaleString()} contributions` },
      ]
    : null;

  return (
    <section id="activity" className="py-16 px-6 sm:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-8 rounded-3xl glow-border"
          aria-busy={status === 'loading'}
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
                  {status === 'ready' && data ? (
                    `${data.totalContributions.toLocaleString()} contributions in the last year`
                  ) : status === 'loading' ? (
                    <>
                      <span aria-hidden className="inline-block h-3 w-44 rounded bg-slate-200 dark:bg-white/10 animate-pulse align-middle" />
                      <span className="sr-only">Loading GitHub activity</span>
                    </>
                  ) : (
                    'Live GitHub stats are unavailable right now'
                  )}
                </p>
              </div>
            </div>

            {/* Quick stats chips — liquid glass */}
            {status === 'ready' ? (
              <div className="flex items-center gap-3">
                {streakLabel && (
                  <div className="liquid-glass-subtle flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-cyan-700 dark:text-cyan">
                    <Flame size={13} className="text-orange-500" />
                    <span>{streakLabel}</span>
                  </div>
                )}
                {prsLabel && (
                  <div className="liquid-glass-subtle flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-primary">
                    <GitPullRequest size={13} />
                    <span>{prsLabel}</span>
                  </div>
                )}
                {reposLabel && (
                  <div className="liquid-glass-subtle flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-secondary">
                    <GitBranch size={13} />
                    <span>{reposLabel}</span>
                  </div>
                )}
              </div>
            ) : status === 'loading' ? (
              <div aria-hidden className="flex items-center gap-3 animate-pulse">
                <div className="h-6 w-24 rounded-full bg-slate-200 dark:bg-white/10" />
                <div className="h-6 w-28 rounded-full bg-slate-200 dark:bg-white/10" />
                <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-white/10" />
              </div>
            ) : (
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass py-2 px-4 rounded-full text-slate-800 dark:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <span>View on GitHub</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>

          {/* Heatmap Grid */}
          <div ref={gridScrollRef} className="overflow-x-auto pb-3 pt-2" data-lenis-prevent>
            <div className={`min-w-[700px] flex gap-1.5 ${status === 'loading' ? 'animate-pulse' : ''} ${status === 'error' ? 'opacity-60' : ''}`}>
              {status === 'ready' && data?.weeks && data.weeks.length > 0 ? (
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
                            setHoveredCell({ count: day.count, date: day.date })
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
                PLACEHOLDER_WEEKS.map((_, wIdx) => (
                  <div key={wIdx} aria-hidden className="flex flex-col gap-1.5">
                    {Array.from({ length: 7 }, (_, dIdx) => (
                      <div key={dIdx} className="w-3 h-3 rounded-[3px] bg-slate-200 dark:bg-white/5" />
                    ))}
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
                  {` on ${hoveredCell.date}`}
                </span>
              ) : (
                <span className="hidden sm:inline">Hover over squares to inspect daily velocity</span>
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

          {/* Year in review — live data only; skeleton while loading, hidden if GitHub is unavailable */}
          {status === 'ready' && statTiles ? (
            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {statTiles.map((t) => (
                <div key={t.label} className="px-3 py-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 min-w-0">
                  <p className="text-xs text-slate-500 dark:text-white/50">{t.label}</p>
                  <p className="text-[15px] sm:text-lg font-display font-bold text-slate-900 dark:text-white mt-1">{t.value}</p>
                  <p className="text-[11px] text-slate-500 dark:text-white/40 mt-0.5">{t.sub}</p>
                </div>
              ))}
            </div>
          ) : status === 'loading' ? (
            <div aria-hidden className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-4 gap-3 mt-6 animate-pulse">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-[78px] sm:h-[86px] rounded-xl bg-slate-100 dark:bg-white/5" />
              ))}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
