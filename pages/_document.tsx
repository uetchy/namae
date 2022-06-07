// https://nextjs.org/docs/advanced-features/custom-document

import { Head, Html, Main, NextScript } from 'next/document';
import i18nextConfig from '../next-i18next.config';

export default function Document(props) {
  const currentLocale =
    props.__NEXT_DATA__.locale || i18nextConfig.i18n.defaultLocale;

  return (
    <Html lang={currentLocale}>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="namae" />
        <meta name="msapplication-TileColor" content="#5180fc" />
        <meta name="theme-color" content="#632bec" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5180fc" />
        <link rel="manifest" href="/manifest.json" />

        <meta property="og:title" content="namae — name new project" />
        <meta
          property="og:description"
          content="Check availability of your new app name for major registries at once."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://namae.dev/social.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@uechz" />
        <meta name="twitter:image" content="https://namae.dev/social.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:600&display=swap"
          rel="stylesheet"
        />
        <script
          async
          defer
          data-website-id="a0bfb495-787b-4960-938d-c4a190aa7455"
          src="https://analytics.uechi.io/umami.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
