// https://nextjs.org/docs/advanced-features/custom-app

import { Global } from '@emotion/react';
import { StoreProvider } from 'easy-peasy';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
import { globalStyle } from '../src/theme';
import { initSentry } from '../src/util/analytics';
import { initCrisp } from '../src/util/crisp';
import { useOpenSearch } from '../src/util/hooks';
import { FullScreenSuspense } from '../src/util/suspense';
import { store } from '../store';
import nextI18nConfig from '../next-i18next.config';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Client-side-only code
    // TODO: https://docs.sentry.io/platforms/javascript/guides/nextjs/
    initSentry();
    initCrisp();
  }, []);

  const OpenSearch = useOpenSearch('/opensearch.xml');

  return (
    <StoreProvider store={store}>
      <FullScreenSuspense>
        <Global styles={globalStyle} />
        <OpenSearch />
        <Component {...pageProps} />;
        <Footer />
      </FullScreenSuspense>
      <ToastContainer />
    </StoreProvider>
  );
}

export default appWithTranslation(MyApp, nextI18nConfig);
