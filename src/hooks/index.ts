import cookie from 'cookie';
// import type { GetSession, Handle } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') ?? '');
  const session = cookies.session ? JSON.parse(cookies.session) : null;
  // split the session into two so only non-sensitive data is exposed to client through getSession
  // then again, supabase puts everything in supabase.auth and localStorage anyway

  if (session) {
    const { expires_at, id, access_token } = session;
    event.locals.session = { access_token, id, expires_at };
    // const parsed_jwt = JSON.parse(Buffer.from(access_token.split('.')[1], 'base64').toString());
    // const { _expires_at, _id, _aud, _email, _phone, _app_metadata, _user_metadata, _role } = parsed_jwt;
    // it's unnecessary to save this here because supabase has it's own api
    // event.locals.user = { email };
    // event.locals.user = undefined;
  } else {
    event.locals.session = undefined;
    // event.locals.user = undefined;
  }

  const response = await resolve(event);
  return response;
};

// export const getSession: GetSession = async event => {
//   return event.locals.user ?? {};
// };
