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
    const createUser = await auth.createUser('email', email, {
      password,
      user_data: {
        email,
      },
    });
    return {
      status: 200,
      headers: {
        'set-cookie': createUser.cookies,
      },
    };
  } catch (e) {
    const error = e as Error;
    if (
      ['AUTH_DUPLICATE_IDENTIFIER_TOKEN', 'AUTH_DUPLICATE_USER_TOKEN', 'AUTH_DUPLICATE_USER_DATA'].includes(
        error.message
      )
    ) {
      return {
        status: 400,
        body: JSON.stringify({
          error: 'That username is taken. Try another.',
        }),
      };
    } else {
      return {
        status: 500,
        body: JSON.stringify({
          error: 'Unable to create account',
        }),
      };
    }
  }
};
