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

  it('sets --navbar-height CSS custom property on mount', () => {
    const mockClientHeight = 64;

    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: mockClientHeight,
    });

    render(<Navbar />);

    const navbarHeight =
      document.documentElement.style.getPropertyValue('--navbar-height');

    expect(navbarHeight).toBe(`${mockClientHeight}px`);
  });
});
