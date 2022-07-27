import { supabaseAdmin } from '$db/server';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const { email, password } = await request.json();
  const { error } = await supabaseAdmin.auth.api.createUser({ email, password });
  return {
    status: 200,
    body: JSON.stringify(error),
  };
};
