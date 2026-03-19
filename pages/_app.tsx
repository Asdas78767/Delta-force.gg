import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';

// This custom App component wraps every page in a common layout. It also
// imports global styles. Without this file, the global CSS and header would
// not be applied consistently across all routes. See Next.js docs for more
// details: https://nextjs.org/docs/pages/building-your-application/routing/custom-app
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}