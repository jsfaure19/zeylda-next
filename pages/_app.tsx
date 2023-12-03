import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import '../styles/bubble.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Zeylda Stream</title>
        <link rel="icon" href="/winter.png" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet"></link>
      </Head>
      <div className=''>
        <Hydrated>
          <Component {...pageProps} />
          <Analytics />
        </Hydrated>
      </div>
    </React.Fragment>
  )
}

export default MyApp

const Hydrated = ({ children }: { children?: any }) => {
  const [hydration, setHydration] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHydration(true);
    }
  }, []);
  return hydration ? children : ''
}; 