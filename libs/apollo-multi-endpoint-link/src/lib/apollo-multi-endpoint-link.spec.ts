import { apolloMultiEndpointLink } from './apollo-multi-endpoint-link';

describe('apolloMultiEndpointLink', () => {
  it('should work', () => {
    expect(apolloMultiEndpointLink()).toEqual('apollo-multi-endpoint-link');
  });
});
