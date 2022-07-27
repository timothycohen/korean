import lucia from 'lucia-sveltekit';
import supabaseAdapter from '@lucia-sveltekit/adapter-supabase';
import { dev } from '$app/env';

export const auth = lucia({
  adapter: supabaseAdapter(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_ANON_KEY as string
  ),
  env: dev ? 'DEV' : 'PROD',
  secret: '200ff323-a4b3-4844-9b7a-2d4d296a5962',
});

type OAuthProvider = { provider: 'github' | 'google' };
type DirectCredentials = { email: string; password: string };
export type Credentials = OAuthProvider | DirectCredentials;

/*
Lucia has three main parts

1) Database Adapter
It takes the url and secret, creates a PostgrestClient and returns the following helper functions:
createUser, deleteRefreshToken, deleteUser, deleteUserRefreshTokens, getUserFromIdentifierToken, getUserFromRefreshToken, saveRefreshToken

2) Lucia
It takes the adapter, env, and secret and returns the following functions:
  https://github.com/pilcrowOnPaper/lucia-sveltekit/tree/main/packages/lucia-sveltekit/src/auth/user
  authenticateUser,
  createUser,
  deleteUser,
  getUser,

  https://github.com/pilcrowOnPaper/lucia-sveltekit/blob/main/packages/lucia-sveltekit/src/auth/index.ts
  getAuthSession: this takes in the event and returns event.locals.lucia. It's reexported as getSession in hooks.ts,

  https://github.com/pilcrowOnPaper/lucia-sveltekit/blob/main/packages/lucia-sveltekit/src/auth/hooks.ts
  handleAuth: this takes in the params and calls handleTokens and then handleEndpoints. It's reexported as handle in hooks.ts,

  https://github.com/pilcrowOnPaper/lucia-sveltekit/blob/main/packages/lucia-sveltekit/src/auth/token.ts
  refreshTokens,

  https://github.com/pilcrowOnPaper/lucia-sveltekit/blob/main/packages/lucia-sveltekit/src/auth/request.ts
  validateRequest (returns a promise of a user or throws an error). This can be used in endpoints to protect content

3) Client & Endpoints
https://github.com/pilcrowOnPaper/lucia-sveltekit/blob/main/packages/lucia-sveltekit/src/client.ts
https://github.com/pilcrowOnPaper/lucia-sveltekit/tree/main/packages/lucia-sveltekit/src/auth/endpoints

signOut: hits /api/auth/logout and handles the errors
autoRefreshTokens: initialize this in __layout.svelte. It takes the session and a callback, checks the session in a timer and updates the access/refresh token on any changes using /api/auth/refresh
*/
