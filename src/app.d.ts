/// <reference types="@sveltejs/kit" />
declare namespace App {
  interface Locals {
    error?: import('@supabase/supabase-js').ApiError;
    session?: {
      access_token: string;
      id: string;
      expires_at: string;
    };
    user?: import('@supabase/supabase-js').User;
    accessToken?: string;
  }

  // handle this with supabase.auth instead
  // interface Session {
  //   user?: import('@supabase/supabase-js').User;
  // }
}
