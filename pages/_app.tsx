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
	  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
	  <link rel="apple-touch-startup-image" href="/album/icon-512x512.png"></link>
	</Head>
	<Component {...pageProps} />
      </ApiKeyContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
