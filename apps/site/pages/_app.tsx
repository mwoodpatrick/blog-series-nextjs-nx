import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactComponent as NxLogo } from '../public/nx-logo-white.svg';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to site!</title>
      </Head>
      <div className="app">
        <main>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </main>
      </div>
    </>
  );
}

export default CustomApp;
