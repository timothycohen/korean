import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
  // normally this would not be sent to the client. this is only for testing
  const session = locals.session;
  if (session) {
    return {
      status: 200,
      body: { server_sesh: session },
    };
  }
  return {
    status: 302,
    headers: {
      location: '/auth',
    },
  };
};
