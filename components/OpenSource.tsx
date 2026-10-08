'use client';
import { motion } from 'framer-motion';
import { GitMerge, Users, Calendar, ExternalLink, Code2 } from 'lucide-react';

interface Contribution {
  project: string;
  repoUrl: string;
  language: string;
  pr: string;
  prUrl: string;
  status: 'Merged' | 'Co-authored';
  date: string;
  summary: string;
}

const contributions: Contribution[] = [
  {
    project: 'Microsoft VS Code',
    repoUrl: 'https://github.com/microsoft/vscode',
    language: 'TypeScript',
    pr: 'PR #334129',
    prUrl: 'https://github.com/microsoft/vscode/pull/334129',
    status: 'Merged',
    date: 'Sep 2026',
    summary: 'Once a pasted image expired, Copilot Chat got stuck: every later request failed with a 400 error, even text-only ones, and the chat kept auto-retrying the same broken payload. I stopped the retries for that error, replaced them with a clear message telling users to remove the image or start a new chat, and added regression tests.'
  },
  {
    project: 'OpenUsage',
    repoUrl: 'https://github.com/robinebers/openusage',
    language: 'Swift',
    pr: 'PR #1323',
    prUrl: 'https://github.com/robinebers/openusage/pull/1323',
    status: 'Co-authored',
    date: 'Sep 2026',
    summary: "OpenUsage tracks spending across AI subscriptions. After the OpenCode 2 upgrade, its OpenCode card stopped reporting spend correctly and missed Go logins. In PR #1243 I traced it to OpenCode 2's new session_message table and credential store, and the maintainers merged the fix in #1323 with me as co-author."
  },
  {
    project: 'oh-my-opencode-slim',
    repoUrl: 'https://github.com/alvinunreal/oh-my-opencode-slim',
    language: 'TypeScript',
    pr: 'PR #1058',
    prUrl: 'https://github.com/alvinunreal/oh-my-opencode-slim/pull/1058',
    status: 'Merged',
    date: 'Aug 2026',
    summary: 'oh-my-opencode-slim is a lean multi-agent suite for OpenCode. On the OpenCode v2 beta it failed to load at all, because v2 expects a different plugin shape. I shipped a dual-contract TUI module that works with both v1 and v2, with tests covering both.'
  }
];

export default function OpenSource() {
  return (
    <section id="open-source" className="py-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[130px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center md:text-left"
        >
          <div className="liquid-glass-subtle inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan uppercase tracking-wider mb-3">
            <span>Open Source</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Open Source <span className="text-gradient">Contributions</span>.
          </h2>
          <p className="text-slate-600 dark:text-white/70 text-base sm:text-lg max-w-2xl">
            Bug fixes merged into developer tools, including Microsoft VS Code.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributions.map((c, index) => {
            const isMerged = c.status === 'Merged';
            return (
              <motion.div
                key={c.prUrl}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 sm:p-7 rounded-3xl glow-border flex flex-col justify-between"
              >
                <div>
                  {/* Status & Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                        isMerged
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                          : 'bg-secondary/10 dark:bg-secondary/20 border-secondary/30 text-primary dark:text-cyan'
                      }`}
                    >
                      {isMerged ? <GitMerge size={13} /> : <Users size={13} />}
                      <span>{c.status}</span>
                    </span>
                    <span className="liquid-glass-subtle flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-cyan">
                      <Calendar size={12} /> <span>{c.date}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white mb-1">
                    {c.project}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-white/50 mb-4">
                    <Code2 size={13} className="text-primary" />
                    <span>{c.language}</span>
                    <span>•</span>
                    <span>{c.pr}</span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-white/75 leading-relaxed mb-6">
                    {c.summary}
                  </p>
                </div>

                {/* Links — liquid glass */}
                <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-200/80 dark:border-white/10">
                  <a
                    href={c.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass-strong py-2 px-4 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View {c.pr}</span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href={c.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass py-2 px-4 rounded-full text-slate-800 dark:text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Repository</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
