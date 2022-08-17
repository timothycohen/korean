// https://kit.svelte.dev/docs/types#app
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface PrivateEnv {}
  // interface PublicEnv {}
}

// formatting at node_modules/svelte-check/dist/src/svelte-jsx.d.ts
declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes {
    // example of stricter typing on e.detail ==> onoutclick?: (e: CustomEvent<{ immuneNodes?: Array<HTMLElement | null> }>) => void;
    onoutclick?: (e: CustomEvent) => void;
  }
}
