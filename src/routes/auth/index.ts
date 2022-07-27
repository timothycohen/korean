import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
  const session = locals.session;
  if (session) {
    return {
      status: 302,
      headers: {
        location: '/auth/profile',
      },
    };
  }
  return {
    status: 204,
  };
};
