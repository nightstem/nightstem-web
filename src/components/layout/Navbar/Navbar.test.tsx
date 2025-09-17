import { it, expect, describe } from 'vitest';
import { axe } from 'vitest-axe';
import { act, render } from '@testing-library/react';

import Navbar from '@/components/layout/Navbar/Navbar';

describe(Navbar, () => {
  it('matches the snapshot', () => {
    const { container } = render(<Navbar />);

    expect(container).toMatchSnapshot();
  });

  it('does not have accessibility violations', async () => {
    const { container } = render(<Navbar />);
    const result = await act(() => axe(container));

    expect(result).toHaveNoViolations();
  });
});
