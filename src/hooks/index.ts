import { auth } from '$auth';

// https://github.com/pilcrowOnPaper/lucia-sveltekit/blob/main/packages/lucia-sveltekit/src/auth/hooks.ts
export const handle = auth.handleAuth;
export const getSession = auth.getAuthSession;
