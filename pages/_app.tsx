import type { AppProps } from 'next/app'
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../styles/createEmotionCache';
import '../styles/globals.css'

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Component {...pageProps} />
    </CacheProvider>
  )
}

export default MyApp
