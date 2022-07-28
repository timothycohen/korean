declare namespace NodeJS {
  export interface ProcessEnv {
    VITE_APP_URL: string;
    VITE_SUPABASE_URL: string;
    VITE_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    CONNECTION_STRING: string;
  }
}
