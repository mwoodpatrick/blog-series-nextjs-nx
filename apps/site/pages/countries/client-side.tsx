import Head from "next/head";
import { TopicButton, ClientOnly, Countries } from '@westie/shared/ui'
import client from '../../apollo-client'
import styles from "./index.module.css"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

/*
export interface ClientSideProps {}

export function ClientSide(props: ClientSideProps) {
  return (
    <div>
      <h1>Welcome to ClientSide!</h1>
    </div>
  );
}
*/

export function ClientSide() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Rendered on client side to change edit{" "}
          <code className={styles.code}>pages/client-side.ts</code>
        </p>

        <ClientOnly>
          <Countries />
        </ClientOnly>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export default ClientSide;
