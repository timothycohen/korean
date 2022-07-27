import { auth } from '$auth';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const email = body.email;
  const password = body.password;
  if (!email || !password) {
    return {
      status: 400,
    };
  }
  try {
    const authenticateUser = await auth.authenticateUser('email', email, password);
    return {
      status: 200,
      headers: {
        'set-cookie': authenticateUser.cookies,
      },
    };
  } catch (e) {
    const error = e as Error;
    if (error.message === 'AUTH_INVALID_IDENTIFIER_TOKEN' || error.message === 'AUTH_INVALID_PASSWORD') {
      return {
        status: 400,
        body: JSON.stringify({
          error: 'Incorrect email or password',
        }),
      };
    } else {
      return {
        status: 500,
        body: JSON.stringify({
          error: 'Unable to sign in',
        }),
      };
    }
  }
};
