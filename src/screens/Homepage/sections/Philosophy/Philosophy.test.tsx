import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import Philosophy from '@/screens/Homepage/sections/Philosophy/Philosophy';

describe(Philosophy, () => {
  it('matches the snapshot', () => {
    const { container } = render(<Philosophy />);

    expect(container).toMatchSnapshot();
  });
});
