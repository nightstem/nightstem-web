import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import Homepage from '@/screens/Homepage/Homepage';

describe(Homepage, () => {
  it('matches the screenshot', () => {
    const { container } = render(<Homepage />);

    expect(container).toMatchSnapshot();
  });

  it('does not have accessibility violations', async () => {
    const { container } = render(<Homepage />);
    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
