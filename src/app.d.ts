/// <reference types="@sveltejs/kit" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  interface UserSession {
    user: import('@supabase/supabase-js').User;
    accessToken?: string;
  }

  // interface Locals extends UserSession {
  //   error: import('@supabase/supabase-js').ApiError;
  // }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  // interface Session extends UserSession {}

  interface Session {
    lucia?: {
      user: {
        user_id: string;
        email: string;
      };
      access_token: string;
      refresh_token: string;
    };
  }
  export interface SvelteKitSession {
    hashed_fingerprint: string;
    iat: number;
    exp: number;
  }
  export interface DatabaseUser {
    id: string;
    hashed_password: string;
    identifier_token: string;
    username: string;
  }

  // interface Platform {}
  // interface Stuff {}
}
