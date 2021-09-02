import { render } from '@testing-library/react';

import ClientOnly from './client-only';

describe('ClientOnly', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientOnly />);
    expect(baseElement).toBeTruthy();
  });
});
