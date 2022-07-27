import { createClient, type ApiError } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  {
    autoRefreshToken: true,
  }
);

type OAuthProvider = { provider: 'github' | 'google' };
type DirectCredentials = { email: string; password: string };
type Credentials = OAuthProvider | DirectCredentials;

export const signIn = async (prov: Credentials) => {
  const { session, user, provider, url, error } = await supabase.auth.signIn(prov);
  return { session, user, provider, url, error };
};

export const signOut = async () => {
  supabase.auth.signOut();
};

export const signUp = async ({ email, password }: DirectCredentials): Promise<ApiError | undefined> => {
  // this provides the appropriate error message, but it's not automatically sending the confirmation emails
  const res = await fetch('/api/auth/createUser', { method: 'POST', body: JSON.stringify({ email, password }) });
  const error = res.json();
  return error;

  // can't use signUp bc it provides fake data if the user already exists
  // const { error } = await supabase.auth.signUp({ email, password });
  // let e = error ?? undefined;
  // return e;
};

export const getUserEmail = () => {
  return supabase?.auth?.session()?.user?.email;
};
