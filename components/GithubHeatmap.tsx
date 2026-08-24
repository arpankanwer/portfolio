'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitBranch, Flame } from 'lucide-react';

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
  const [hoveredCell, setHoveredCell] = useState<{ count: number; week: number; day: number } | null>(null);

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
                  1,480+ contributions across repositories in the last year
                </p>
              </div>
            </div>

            {/* Quick stats chips */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan">
                <Flame size={13} className="text-orange-500" />
                <span>38 Week Streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-primary">
                <GitPullRequest size={13} />
                <span>120+ PRs Merged</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-secondary">
                <GitBranch size={13} />
                <span>50+ Repos</span>
              </div>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto pb-3 pt-2">
            <div className="min-w-[700px] flex gap-1.5">
              {heatmapData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((cell, dIdx) => {
                    const bgClass = cell.level === 0 
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
              ))}
            </div>
          </div>

          {/* Footer & Legend */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-white/40 pt-4 mt-2 border-t border-slate-200 dark:border-white/5">
            <div className="font-mono">
              {hoveredCell ? (
                <span className="text-slate-900 dark:text-white font-medium">
                  {hoveredCell.count === 0 ? 'No' : hoveredCell.count} contributions on Day {hoveredCell.day + 1}
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
