import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

export const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);
