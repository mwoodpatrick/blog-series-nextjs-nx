import React from 'react';
import { render } from 'react-dom';

import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

import {
  MultiAPILink,
  MultiAPILinkConfig,
} from '@westie/apollo-multi-endpoint-link';

// Cache implementation
const cache = new InMemoryCache();

const link = new MultiAPILink({
  endpoints: {
    countries: 'https://countries.trevorblades.com',
    rates: 'https://48p1r2roz4.sse.codesandbox.io',
  },
  createHttpLink: () => createHttpLink(),
});

const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache,
});

function tsxFromError(error)
{
   return (
      <div>
        <pre>
          Bad:{' '}
          <p>Message: {error.message}</p>
          {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </pre>
      </div>
   )
}

function ExchangeRates() {
  const query = gql`
    query Rates @api(name: "rates") {
      rates(currency: "USD") {
        currency
        ratep
      }
    }
  `;

  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error(error);
    return tsxFromError(error);
  }

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

function Countries() {
  const query = gql`
    query Countries @api(contextKey: "apiName") {
      countries {
        code
        name
        emoji
      }
    }
  `;
  const { loading, error, data } = useQuery(query, {
    context: { apiName: 'rates' },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error(error);
    return tsxFromError(error);
  }

  const countries = data.countries.slice(0, 4);

  return (
    /* class="flex space-x-4" */
    <div>
      {countries.map((country) => (
        /* class="flex-1" */
        <div key={country.code}>
          <h3>{country.name}</h3>
          <p>
            {country.code} - {country.emoji}
          </p>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>
        My first Apollo app{' '}
        <span role="img" aria-label="Rocket">
          🚀
        </span>{' '}
      </h1>
      <Countries />
      <ExchangeRates />
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
