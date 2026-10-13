# Birarpanjot Singh Kanwer — Portfolio

The personal portfolio of Birarpanjot Singh Kanwer, a full-stack developer working across React, Next.js and React Native. Live at **[arpankanwer.ai.studio](https://arpankanwer.ai.studio)**.

It's a single page: Hero, About, Tech Stack, GitHub Activity, Experience, Projects, Open Source, Education and Contact. It has a ⌘K command palette, light and dark themes, and a "liquid glass" look that's tuned to stay smooth on phones, iOS included.

## Tech stack

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**
- **Tailwind CSS v4**, plus a custom liquid-glass utility layer in `app/globals.css`
- **Framer Motion** for section entrances, the hero parallax and the rotating hero title
- **Lenis** for smooth wheel scrolling (touch scrolling keeps native momentum)
- **cmdk** for the command palette, **lucide-react** for icons
- **react-hook-form** and **zod** for the contact form

## Integrations

### Live GitHub activity (GitHub GraphQL API)

The Activity section ("Continuous Engineering Activity") gets its data from `app/api/github/route.ts`. That route calls GitHub's GraphQL API through `lib/github.ts` for the last year's contribution calendar and the account's creation date, and works out the current and longest streaks.

- **Caching:** responses are cached in memory for an hour. If a refresh fails, the last good response keeps being served.
- **Always fresh:** the route is `force-dynamic`, so a snapshot taken at build time can't go stale on hosts that scale to zero.
- **Year-in-review tiles:** active days, longest streak, busiest weekday and best month are calculated in the browser from the same calendar, so they cost no extra requests.
- **No made-up numbers:** while loading, the section shows a skeleton. If GitHub can't be reached, it says so and links to the GitHub profile.
- **PR and repo totals are a dated snapshot.** Most merged PRs are in private repos, many of them at work, and counting those live would need a token that can read private code. Instead, `npm run github:snapshot` uses your local GitHub CLI login to write `lib/github-snapshot.json` (merged PRs and owned repos, public and private, plus the date). The chips show the totals, and hovering or tapping one shows the public/private split and the snapshot date. Re-run the script and commit the file to refresh it; see [docs/github-snapshot.md](docs/github-snapshot.md).

The totals come from GitHub's API, which can be a few contributions lower than the number on the GitHub profile page.

### Hosting on Google AI Studio

The site is built and deployed with Google AI Studio, which runs it on Cloud Run.

- `output: 'standalone'` in `next.config.ts` produces the self-contained Node server that Cloud Run runs.
- `metadata.json` and `assets/.aistudio/` are AI Studio's project files. Leave them in place.
- Secrets such as `GITHUB_TOKEN` are set in AI Studio's Secrets panel and injected at runtime.
- AI Studio sets `DISABLE_HMR=true` to turn off file watching while it edits code.

### Command palette

Open it with ⌘K, Ctrl+K or the navbar button. From there you can jump to any section, open the resume, GitHub or LinkedIn, or copy the email address.

### Contact form

The form is validated with react-hook-form and zod. On submit, it opens the visitor's email app with the message filled in (`mailto:`), so there's no backend or third-party form service. The email address and phone number each have a copy button.

### Theming

The site is dark by default, with an optional light theme. The choice is saved in `localStorage` under `bk_portfolio_theme`. An inline script in `app/layout.tsx` applies it before the first paint, so returning light-mode visitors don't see a dark flash.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in GITHUB_TOKEN and GITHUB_USERNAME
npm run dev
```

Then open http://localhost:3000.

### Environment variables

| Variable | Used by | Notes |
| --- | --- | --- |
| `GITHUB_TOKEN` | Activity section | Only needs `read:user`; don't give it `repo`. Private contributions still appear as counts when "Include private contributions on my profile" is on in your GitHub settings. |
| `GITHUB_USERNAME` | Activity section | Defaults to `arpankanwer`. |
| `GEMINI_API_KEY`, `APP_URL` | (none) | AI Studio injects these. The code doesn't use them today. |

Without `GITHUB_TOKEN` the site still runs, and the Activity section shows its "unavailable" state.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (standalone output) |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint |
| `npm run github:snapshot` | Refreshes the PR and repo totals in `lib/github-snapshot.json` (needs `gh auth login`; see [docs/github-snapshot.md](docs/github-snapshot.md)) |

### Testing on a phone

```bash
npx next dev --hostname 0.0.0.0
```

Open `http://<your-computer's-LAN-IP>:3000` on a phone on the same Wi-Fi. `allowedDevOrigins` in `next.config.ts` lets `10.0.0.*` addresses use hot reload. Add your own network's range if it's different.

Dev mode feels heavier than the real site. For performance checks, build first and serve the production build:

```bash
npm run build && npx next start --hostname 0.0.0.0 --port 3001
```

Next warns that standalone output is meant to run with `node .next/standalone/server.js`, but `next start` is fine for local testing.

## Project structure

```
app/
  layout.tsx          fonts, metadata, theme script, global providers
  page.tsx            section order
  globals.css         theme tokens and the liquid-glass utilities
  api/github/route.ts cached GitHub data endpoint
components/           one file per section, plus Navbar, CommandPalette,
                      ThemeProvider, SmoothScroll, CustomCursor and Footer
lib/github.ts         GitHub GraphQL query, contribution levels, streaks
lib/github-snapshot.json  dated PR and repo totals (public and private)
scripts/github-snapshot.mjs  refreshes the snapshot with the GitHub CLI
public/               project images, icons, web manifest, resume
```

## Notes

- **No `backdrop-filter` on the liquid-glass classes.** Tailwind v4's CSS compiler reduced each `backdrop-filter` / `-webkit-backdrop-filter` pair to the `-webkit-` form only. Chrome never blurred those elements, while iOS Safari blurred more than a hundred of them on every scroll frame. The glass look comes from translucent fills, gradients and highlights. Real blur is kept to the Tailwind `backdrop-blur-*` utilities on the navbar, cards and overlays.
- **Touch targets:** on touch screens, interactive glass buttons are at least 44×44px. Static chips and badges are excluded.
