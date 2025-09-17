import { axe } from 'vitest-axe';
import { act, render } from '@testing-library/react';

import BaseLayout from '@/components/layout/BaseLayout/BaseLayout';

it('matches the snapshot', () => {
  const { container } = render(<BaseLayout />);
  expect(container).toMatchSnapshot();
});

it.only('does not have accessibility violations', async () => {
  const { container } = render(<BaseLayout />);
  const result = await act(() => axe(container));
  expect(result).toHaveNoViolations();
});
