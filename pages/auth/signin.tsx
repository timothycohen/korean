import { Button } from '@mui/material';
import styled from '@emotion/styled';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';

import { getProviders, getSession, signIn } from 'next-auth/react';
import { type NextApiRequest } from 'next';
import { type Provider } from 'next-auth/providers';
import { type NextParsedUrlQuery } from 'next/dist/server/request-meta';

const Icons = {
  Email: <EmailIcon />,
  GitHub: <GitHubIcon />,
  Google: <GoogleIcon />,
  Facebook: <FacebookIcon />,
  Apple: <AppleIcon />,
};

const Page = styled('main')({
  paddingTop: '10vh',
  height: '100vh',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const AuthContainer = styled('div')({
  display: 'grid',
  width: `clamp(350px, 70vw, 600px)`,
  borderRadius: '4px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  gridGap: '1rem',
  margin: '0 auto',
  padding: '2rem',
  placeContent: 'center',
});

const AuthButton = styled(Button)({
  width: 'clamp(300px, 55vw, 400px)',
  boxShadow: '0 0.05rem 0.25rem 0 rgba(0,0,0,0.5)',
  padding: '1rem',
  display: 'grid',
  gridTemplateColumns: '2rem calc(300px - 4.5rem)',
  justifyItems: 'center',
  gap: '0.5rem',
  '& > svg': {
    fontSize: '2rem',
  },
  '& > span': {
    fontSize: '1.1rem',
    letterSpacing: '0.2px',
    fontWeight: 'bold',
    textTransform: 'none',
  },
});

export default function SignInPage({ providers }: { providers: Provider[] }) {
  return (
    <Page>
      <h1>TCo&apos;s Korean</h1>
      <AuthContainer>
        {Object.values(providers).map(provider => {
          return (
            <div key={provider.name}>
              <AuthButton
                onClick={async (): Promise<void> => {
                  await signIn(provider.id);
                }}
                variant="contained"
              >
                {Icons[provider.name as keyof typeof Icons]}
                <span>Sign in with {provider.name}</span>
              </AuthButton>
            </div>
          );
        })}
      </AuthContainer>
    </Page>
  );
}

export async function getServerSideProps({ req, query }: { req: NextApiRequest; query: NextParsedUrlQuery }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: query?.callbackUrl ?? '/' },
    };
  }

  return {
    props: {
      providers: await getProviders(),
    },
  };
}
