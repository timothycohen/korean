import { auth } from '$auth';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
  try {
    await auth.validateRequest(request);
    const asset = Math.floor(Math.random() * 999);
    return {
      body: JSON.stringify({
        asset,
      }),
    };
  } catch {
    return {
      status: 401,
      body: JSON.stringify({
        error: 'Unauthorized',
      }),
    };
  }
};
