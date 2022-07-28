## 1. :white_check_mark: tooling

SvelteKit, Prettier, ESLint, Vitest, Playwright, Tailwind, DaisyUI, Supabase

## 2. continuous integration

### :white_check_mark: pre-commit: githooks

- check for non-ascii characters
- format
- lint

### :white_check_mark: pre-push: githooks

- svelte-check (includes compiler)
- unit test
- e2e test

### pre-pushed: github branch protection rules

- disallow pushing to main directly (require PR)

### ~~pre-pull-request: github actions~~

- ~~prompt for pull request template~~
- ~~prompt changelog template~~

### ~~pre-issue: github actions~~

- ~~prompt with issue template~~

## 3. :white_check_mark: backend

## 4. :white_check_mark: static & assets

## 5. :white_check_mark: index page

## 6. db & auth

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

## :white_check_mark: 7. colors

## 8. numbers

## 9. time

## 10. Continuous delivery

### post-pull-request: github actions

- build and tag multi-platform docker images (from cache) ➱
  - format ➱ lint ➱ compiler check
  - unit test ➱
    - e2e test (including a11y, dead links, performance) ➱
      - Common Vulnerabilities and Exposures (CVE) scan with Trivy (log all, block on high)
  - Simple Deployment Test to a temp Kubernetes cluster
  - Attach image tags to pull request
- Static application security testing (SAST) CodeQL

### pre-merge: github branch protection rules

- require all status checks to have passed

## 11. continuous deployment

### post-merged

- update semver
- if new major version, send email
- push image to DockerHub registry
- update manifest

### post-image push

- Deploy new image to production server

### on Sundays

- dependency update
- security testing
  - on critical: send email

## 12+ New features! Counters, SSR, etc.
