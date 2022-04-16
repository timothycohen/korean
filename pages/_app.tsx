import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from 'utility/createEmotionCache';
import lightTheme from 'styles/theme/lightTheme';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FunctionComponent<MyAppProps> = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // <SessionProvider> allows useSession() to access the session for next auth
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

export default MyApp;
