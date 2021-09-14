/* eslint-disable no-debugger */
import fetch from 'node-fetch';
import {
  HttpLink,
  execute,
  gql,
  toPromise,
} from '@apollo/client/core';
import 'jest';

import { MultiAPILink } from './MultiAPILink';

const queryA = gql`
  query @api(name: "countries") {
    countries {
      code
      name
      emoji
    }
  }
`;

const queryB = gql`
  query Rates @api(name: "rates") {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

// declare function fetch( url: RequestInfo, init?: RequestInit): Promise<Response>;

const customFetch = (url: RequestInfo, init?: RequestInit): Promise<Response> => {
  //  if (0) {
  //    let credentials = {};
  //    const { header } = Hawk.client.header(
  //      'http://example.com:8000/resource/1?b=1&a=2',
  //      'POST',
  //      { credentials: credentials, ext: 'some-app-data' }
  //    );
  //    options.headers.Authorization = header;
  //  }

  return fetch(url, init);
};


describe('apolloMultiEndpointLink Mark2 desc', () =>
  it('Mark says it should redirect request to right endpoint', async () => {
    const link = new MultiAPILink({
      endpoints: {
        countries: 'https://countries.trevorblades.com',
        rates: 'https://48p1r2roz4.sse.codesandbox.io',
      },
      // createHttpLink: () => createHttpLink(),
      createHttpLink: () => {
        return new HttpLink({ fetch: customFetch });
      },
    });

    const queryAResponse = await toPromise(
      execute(link, {
        query: queryA,
      })
    );

    console.log(queryAResponse);

    const queryBResponse = await toPromise(
      execute(link, {
        query: queryB,
      })
    );

    console.log(queryBResponse);

    expect(queryAResponse.errors).toEqual(undefined);
    expect(queryBResponse.errors).toEqual(undefined);
  }));
