import { useState } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ApiKeyContext } from '../hooks/use-apikey';
import useLocalStorage from '../hooks/use-local-storage';
import '../styles/globals.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d65a8c',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [apiKey, setApiKey] = useLocalStorage('cloud-album-api-key', '');

  return (
    <ThemeProvider theme={theme}>
      <ApiKeyContext.Provider value={[apiKey, setApiKey]}>
	<Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
	  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <title>Albums</title>

          <link rel="manifest" href="/album/manifest.json" />
          <link
            href="/album/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/album/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/album/apple-touch-icon.png"></link>
	  {/* iPhone Xs Max (1242px x 2688px) */} 
	  <link
	    rel="apple-touch-startup-image"
	    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
	    href="/apple-launch-1242x2688.png"
	  />
	  {/* iPhone Xr (828px x 1792px) */}
	  <link
	    rel="apple-touch-startup-image"
	    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
	    href="/apple-launch-828x1792.png"
	  />
	  {/* iPhone X, Xs (1125px x 2436px) */}
	  <link
	    rel="apple-touch-startup-image"
	    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
	    href="/apple-launch-1125x2436.png"
	  />
	  {/* iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) */}
	  <link
	    rel="apple-touch-startup-image"
	    media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
	    href="/apple-launch-1242x2208.png"
	  />
	  {/* iPhone 8, 7, 6s, 6 (750px x 1334px) */}
	  <link
	    rel="apple-touch-startup-image"
	    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
	    href="/apple-launch-750x1334.png"
	  />
	</Head>
	<Component {...pageProps} />
      </ApiKeyContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
