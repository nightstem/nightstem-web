import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import Hero from '@/screens/Homepage/sections/Hero/Hero';

describe(Hero, () => {
  it('matches the snapshot', () => {
    const { container } = render(<Hero />);

    expect(container).toMatchSnapshot();
  });
});
