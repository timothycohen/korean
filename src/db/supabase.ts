import { createClient, type ApiError } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
);

type OAuthProvider = { provider: 'github' | 'google' };
type DirectCredentials = { email: string; password: string };
type MagicLink = { email: string };
type Credentials = OAuthProvider | DirectCredentials | MagicLink;

export const signIn = async (prov: Credentials) => {
  const { session, user, provider, url, error } = await supabase.auth.signIn(prov);
  handleApiError(error);
  return { session, user, provider, url, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  handleApiError(error);
};

export const signUp = async (provider: Credentials) => {
  const { user, session, error } = await supabase.auth.signUp(provider);
  handleApiError(error);
  console.log(user, session);
  return { user, session, error };
};

const handleApiError = (e: ApiError | null) => {
  if (e) {
    console.error(e.message);
    console.error(e.status);
  }
};
