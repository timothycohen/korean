import { auth } from '$auth';
import type { RequestHandler } from '@sveltejs/kit';
import 'dotenv/config';
import type { Error } from 'lucia-sveltekit';

type JWT = {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
};

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const jwt = body?.code;
  if (!jwt) {
    return {
      status: 400,
      body: JSON.stringify({
        message: 'Invalid request url parameters.',
      }),
    };
  }

  const parsed_jwt: JWT = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
  const { email } = parsed_jwt;

  const user = await auth.getUser('oauth:google', email);
  if (user) {
    try {
      const authenticateUser = await auth.authenticateUser('oauth:google', email);
      return {
        status: 302,
        headers: {
          'set-cookie': authenticateUser.cookies,
          location: '/auth/profile',
        },
      };
    } catch {
      // Cannot connect to database
      return {
        status: 500,
        body: JSON.stringify({
          message: 'An unknown error occured',
        }),
      };
    }
  }
  try {
    const createUser = await auth.createUser('oauth:google', email, {
      user_data: {
        email,
      },
    });
    return {
      status: 302,
      headers: {
        'set-cookie': createUser.cookies,
        location: '/auth/profile',
      },
    };
  } catch (e) {
    const error = e as Error;
    console.error(e);
    // violates email column unqiue constraint
    if (error.message === 'AUTH_DUPLICATE_USER_DATA') {
      return {
        status: 400,
        body: JSON.stringify({
          message: 'Email already in use',
        }),
      };
    }
    // database connection error
    return {
      status: 500,
      body: JSON.stringify({
        message: 'An unknown error occured',
      }),
    };
  }
};
