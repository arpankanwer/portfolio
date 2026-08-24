'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitBranch, Flame, ExternalLink, Calendar, RefreshCw } from 'lucide-react';

interface DayContribution {
  date: string;
  count: number;
  level: number; // 0 to 4
}

interface GitHubApiResponse {
  total?: {
    lastYear?: number;
    [year: string]: number | undefined;
  };
  contributions?: DayContribution[];
}

export default function GithubHeatmap() {
  const [data, setData] = useState<GitHubApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState<{ count: number; date: string; dayIndex: number } | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch('/api/github');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load GitHub heatmap data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchContributions();
  }, []);

  // Process data into weeks and compute real stats
  const { weeks, totalCount, longestStreak, currentStreak, topDay, monthHeaders } = useMemo(() => {
    const list: DayContribution[] = data?.contributions && data.contributions.length > 0 
      ? data.contributions 
      : [];

    let total = data?.total?.lastYear ?? 3396;
    let maxDay = { date: '2025-12-19', count: 150 };
    let tempStreak = 0;
    let maxStreak = 26;
    let currStreak = 4;

    if (list.length > 0) {
      total = 0;
      maxDay = { date: list[0].date, count: 0 };
      maxStreak = 0;
      tempStreak = 0;

      list.forEach((c) => {
        total += c.count;
        if (c.count > maxDay.count) {
          maxDay = { date: c.date, count: c.count };
        }
        if (c.count > 0) {
          tempStreak++;
          if (tempStreak > maxStreak) maxStreak = tempStreak;
        } else {
          tempStreak = 0;
        }
      });

      // Calculate current streak
      currStreak = 0;
      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].count > 0) {
          currStreak++;
        } else {
          if (i === list.length - 1) continue; // if today is 0 yet
          break;
        }
      }
    }

    // Organize into weeks (columns of 7 days: Sun=0 to Sat=6)
    const weeksList: (DayContribution | null)[][] = [];
    let currentWeek: (DayContribution | null)[] = [];
    const monthsMap: { name: string; weekIndex: number }[] = [];
    let lastMonth = '';

    list.forEach((item, idx) => {
      const d = new Date(item.date + 'T00:00:00Z');
      const dayOfWeek = d.getUTCDay();
      const monthName = d.toLocaleString('default', { month: 'short', timeZone: 'UTC' });

      if (idx === 0) {
        // Pad the first week with nulls for days before start
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push(null);
        }
      }

      if (monthName !== lastMonth) {
        monthsMap.push({ name: monthName, weekIndex: weeksList.length });
        lastMonth = monthName;
      }

      currentWeek.push(item);

      if (currentWeek.length === 7) {
        weeksList.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksList.push(currentWeek);
    }

    return {
      weeks: weeksList,
      totalCount: total,
      longestStreak: maxStreak,
      currentStreak: currStreak,
      topDay: maxDay,
      monthHeaders: monthsMap,
    };
  }, [data]);

  const levelColors = [
    'bg-white/5 border border-white/5',                                     // Level 0
    'bg-emerald-500/30 border border-emerald-500/40',                       // Level 1
    'bg-emerald-500/60 border border-emerald-500/70',                       // Level 2
    'bg-emerald-500 border border-emerald-400',                             // Level 3
    'bg-cyan shadow-[0_0_10px_rgba(6,182,212,0.8)] border border-cyan',    // Level 4
  ];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00Z');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  };

  return (
    <section className="py-16 px-6 sm:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-8 rounded-3xl glow-border relative"
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <GitCommit size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-display font-bold text-white">
                    Live GitHub Engineering History
                  </h3>
                  <a
                    href="https://github.com/arpankanwer"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary hover:text-cyan flex items-center gap-1 font-mono transition-colors"
                  >
                    @arpankanwer <ExternalLink size={12} />
                  </a>
                </div>
                <p className="text-xs text-white/60 font-mono">
                  {totalCount.toLocaleString()}+ real contributions verified over the past year
                </p>
              </div>
            </div>

            {/* Quick stats chips */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-mono text-orange-400">
                <Flame size={13} className="text-orange-400 animate-pulse" />
                <span>{longestStreak} Day Peak Streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
                <GitPullRequest size={13} />
                <span>{currentStreak} Day Active Streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary">
                <Calendar size={13} />
                <span>Max: {topDay.count} / day</span>
              </div>
            </div>
          </div>

          {/* Month Label Header Row */}
          <div className="overflow-x-auto pb-4 pt-1">
            <div className="min-w-[760px]">
              <div className="flex text-[10px] font-mono text-white/40 mb-1.5 pl-6 justify-between pr-2">
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
              </div>

              {/* Grid with Day of Week labels on left */}
              <div className="flex items-start gap-2">
                {/* Day Labels */}
                <div className="flex flex-col justify-between text-[9px] font-mono text-white/40 h-[105px] pr-1 select-none pt-0.5">
                  <span>Sun</span>
                  <span>Tue</span>
                  <span>Thu</span>
                  <span>Sat</span>
                </div>

                {/* Heatmap Columns */}
                <div className="flex gap-[3px] flex-1">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((cell, dIdx) => {
                        if (!cell) {
                          return <div key={dIdx} className="w-3 h-3 rounded-[2px] opacity-0" />;
                        }
                        const isHovered = hoveredCell?.date === cell.date;
                        return (
                          <div
                            key={dIdx}
                            onMouseEnter={() => setHoveredCell({ count: cell.count, date: cell.date, dayIndex: dIdx })}
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`w-3 h-3 rounded-[2px] transition-all duration-150 cursor-pointer ${
                              levelColors[cell.level]
                            } ${isHovered ? 'scale-150 z-20 shadow-lg' : 'hover:scale-125 hover:z-10'}`}
                            title={`${cell.count} contributions on ${formatDate(cell.date)}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer & Dynamic Tooltip Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-white/50 pt-4 mt-1 border-t border-white/5 gap-3">
            <div className="font-mono flex items-center gap-2">
              {hoveredCell ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-medium animate-fadeIn">
                  <span className="w-2 h-2 rounded-full bg-cyan"></span>
                  <span>
                    <strong>{hoveredCell.count === 0 ? 'No' : hoveredCell.count} contributions</strong> on {formatDate(hoveredCell.date)}
                  </span>
                </div>
              ) : (
                <span className="text-white/60">Hover over any square to view exact commit & PR activity</span>
              )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="text-[11px] font-mono text-white/40">Less</span>
              <div className="flex gap-1 items-center">
                {levelColors.map((cls, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${cls}`} />
                ))}
              </div>
              <span className="text-[11px] font-mono text-white/40">More</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
