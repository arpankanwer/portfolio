# Refreshing the GitHub PR and repo snapshot

The Activity section's **PRs Merged** and **Repos** chips don't come from the live GitHub API. They come from `lib/github-snapshot.json`, a small file that you refresh yourself with one command. Hovering over a chip, or tapping it on a phone, shows visitors the public/private split and the date of the snapshot.

## Why it's a snapshot

Most merged PRs are in private repos, and many of those are work repos. Counting them live would mean storing a token in the deployed site that can read private code, including your employers' code. The snapshot avoids that:

- The command runs on your own computer, with your own GitHub CLI login.
- Only the numbers and a date are saved and committed. No repo names, no code, no token.
- The site's `GITHUB_TOKEN` only needs `read:user` for the live heatmap and streak.

## What you need

- The GitHub CLI (`gh`), signed in as the account the site is about:

  ```bash
  gh auth status          # should say: Logged in to github.com account arpankanwer
  gh auth login           # if it doesn't
  ```

- For work repos that use single sign-on (SSO), your `gh` login has to be authorized for that organization. Otherwise their PRs won't be counted. If the private PR number suddenly drops, run `gh auth refresh` and approve SSO for the organization.

## Refresh it

```bash
npm run github:snapshot
```

It prints what it wrote, for example:

```
Wrote lib/github-snapshot.json {
  asOf: '2026-10-13',
  prsMerged: { public: 19, private: 552 },
  repos: { public: 10, private: 19 }
}
```

| Field | Meaning |
| --- | --- |
| `asOf` | The day you ran it (your local date). Shown as "Snapshot as of …" in the hover/tap details. |
| `prsMerged.public` / `.private` | PRs you authored that were merged, in public and private repos, all time. The chip shows their total. |
| `repos.public` / `.private` | Repositories your account owns. The chip shows their total. |

`GITHUB_USERNAME` overrides the account (it defaults to `arpankanwer`):

```bash
GITHUB_USERNAME=someone-else npm run github:snapshot
```

## Commit it

The refresh changes only `lib/github-snapshot.json`, so it's fine to commit straight to `main`. `main` has no branch protection, and the repo's one ruleset (which would only block deleting `main` or force-pushing to it) is disabled.

```bash
git switch main
git pull
npm run github:snapshot
git diff lib/github-snapshot.json     # check the numbers look right
git add lib/github-snapshot.json
git commit -m "chore(activity): refresh GitHub snapshot"
git push
```

Then redeploy the site the way you normally do in Google AI Studio, so visitors see the new numbers.

## How often

Whenever the numbers have moved enough to matter. Monthly is plenty, or refresh before you send out applications. Because the details always show the snapshot date, an older snapshot is still accurate about when it was taken.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `gh: command not found` | Install the GitHub CLI: `brew install gh`, then `gh auth login`. |
| `HTTP 401` or "Bad credentials" | `gh auth login` again. |
| Private PR count is much lower than expected | Your `gh` login probably isn't authorized for a work organization's SSO. Run `gh auth refresh` and approve SSO. |
| `HTTP 403` / rate limit | GitHub's search API allows about 30 requests a minute. Wait a minute and run it again. |
