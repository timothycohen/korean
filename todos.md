## 1. :white_check_mark: tooling

SvelteKit, Prettier, ESLint, Vitest, Playwright, Tailwind, DaisyUI, Supabase

## 2. :white_check_mark: continuous integration

- enable githooks with `.githooks/init`

### :white_check_mark: pre-commit: githooks

- check for non-ascii characters
- format
- lint
- stylelint

### :white_check_mark: pre-push: githooks

- svelte-check (includes compiler)
- unit test
- e2e test

### :white_check_mark: pre-pushed: github branch protection rules

- disallow pushing to main directly (require PR)

## 3. :white_check_mark: backend

## 4. :white_check_mark: static & assets

## 5. :white_check_mark: home page

## 6. :white_check_mark: colors

## 7. :white_check_mark: numbers

## 8. :white_check_mark: time

## 9. :white_check_mark: continuous delivery

### :white_check_mark: post-pull-request: github actions

- Vercel for GitHub automatically deploys PRs.
- ci.yaml Code Check runs format, lint, svelte check, and unit tests
- ci.yaml E2E runs e2e testing
- codeql.yaml does CodeQL static application security testing

### :white_check_mark: pre-merge: github branch protection rules

- require all status checks to have passed

## 10. :white_check_mark: continuous deployment

### :white_check_mark: post-merged

- Vercel for GitHub automatically deploys changes to main.

### :white_check_mark: cron jobs

- dependabot alerts show dependency security vulnerabilities
- allow dependabot to open PR's automatically to resolve dependency security vulnerabilities
- dependabot.yaml checks dependency versions weekly and opens PR's to update them
- codeql.yaml runs weekly

---

## 11. db & auth

### Set up supabase

:white_check_mark: create new project on their website. save password used (it's the postgres password)

:white_check_mark: add the site url to supabase (localhost)

:white_check_mark: alter the login duration

### Set up schema on supabase

:white_check_mark: run the user management start on supabase to start with a basic authentication setup

:white_check_mark: add any admin users desired

- [ ] add row level permissions for authorization as needed

### Copy data from supabase to .env

:white_check_mark: copy the anon key to the .env folder VITE_SUPABASE_ANON_KEY

- this key is the public key that is subject to row level security
- don't add the service key to the .env. In case the server is hacked and someone gets your .env file, this would give them complete control over your database

:white_check_mark: copy the url to .env

:white_check_mark: copy the connection string to .env CONNECTION_STRING. replace the [password] with the postgres password used to create the supabase project in step 1

### Decide authentication method

1. :white_check_mark: magic link will send an email link and not require a password.
2. :white_check_mark: users can use a login/password
3. :white_check_mark: Google/GitHub OAuth by submitting data to https://smylrekptboggxdlfvev.supabase.co/auth/v1/authorize?provider=google

### Set up OAuth if desired

:white_check_mark: on each providers website, create a project

- :white_check_mark: Google: https://console.cloud.google.com/apis/credentials
- :white_check_mark: Github: https://github.com/settings/applications
  - :white_check_mark: add the oauth client and secrets from the providers into the .env
  - :white_check_mark: add the callback uri from supabase to the provider

### Initialize the supabase client

- [ ] Create a basic login/logout/reset password with protected data on it to verify it's working

- [ ] Make them proper components

- [ ] Use the onAuthStateChange to save and update the user in a svelte store. That way it can be tested in layouts or individual pages as desired

- [ ] Set up handle and getSession
  - The svelte store should not save the user's access token. That should only be available server side. Therefore, I'll probably split that off in a handle hook and then pop the rest of the data in a svelte store

## 12+ New features! Counters, SSR, etc.

# Whenever

## CI

### pre-pull-request: github actions

- prompt for pull request template
- prompt changelog template

### pre-issue: github actions

- prompt with issue template

## Continuous Delivery (if manually setting up with docker images instead of Vercel)

### post-pull-request: github actions

- build and tag multi-platform docker images (from cache) ➱
  - format ➱ lint ➱ compiler check
  - unit test ➱
    - e2e test (including a11y, dead links, performance) ➱
      - Common Vulnerabilities and Exposures (CVE) scan with Trivy (log all, block on high)
  - Simple Deployment Test to a temp Kubernetes cluster
  - Attach image tags to pull request
- Static application security testing (SAST) CodeQL

## Continuous Deployment Part 3

- update semver on PR to main
- if new major version, send email
- push image to DockerHub registry
- update manifest

### post-image push

- Deploy new image to production server
