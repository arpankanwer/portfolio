// Refreshes lib/github-snapshot.json: merged PRs and owned repos, public and private.
// Uses your local GitHub CLI login (`gh auth login`), so the deployed site never needs
// a token that can read private repos. Run with: npm run github:snapshot
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const login = process.env.GITHUB_USERNAME || 'arpankanwer';
const gh = (...args) => JSON.parse(execFileSync('gh', ['api', ...args], { encoding: 'utf8' }));

const mergedPrs = (visibility) =>
  gh('-X', 'GET', 'search/issues', '-f', `q=author:${login} is:pr is:merged is:${visibility}`, '-f', 'per_page=1')
    .total_count;

const { data } = gh(
  'graphql',
  '-F', `login=${login}`,
  '-f', `query=query($login: String!) {
    user(login: $login) {
      publicRepos: repositories(ownerAffiliations: OWNER, privacy: PUBLIC) { totalCount }
      privateRepos: repositories(ownerAffiliations: OWNER, privacy: PRIVATE) { totalCount }
    }
  }`,
);

const snapshot = {
  asOf: new Date().toLocaleDateString('en-CA'), // local date, YYYY-MM-DD
  prsMerged: { public: mergedPrs('public'), private: mergedPrs('private') },
  repos: { public: data.user.publicRepos.totalCount, private: data.user.privateRepos.totalCount },
};

writeFileSync(new URL('../lib/github-snapshot.json', import.meta.url), `${JSON.stringify(snapshot, null, 2)}\n`);
console.log('Wrote lib/github-snapshot.json', snapshot);
