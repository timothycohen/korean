/// <reference types="@sveltejs/kit" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  interface UserSession {
    user: import('@supabase/supabase-js').User;
    accessToken?: string;
  }

  interface Locals extends UserSession {
    error: import('@supabase/supabase-js').ApiError;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Session extends UserSession {}
  // interface Platform {}
  // interface Stuff {}
}

// copy formatting from node_modules/svelte-check/dist/src/svelte-jsx.d.ts
declare namespace svelte.JSX {
  // eslint-disable-next-line
  interface DOMAttributes<T extends EventTarget> {
    onoutclick?: (e: CustomEvent<'outclick'>, immuneNodes: Array<HTMLElement | null> | undefined) => void;
  }
}
