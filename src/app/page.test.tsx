import { axe } from 'vitest-axe';
import { expect, it } from 'vitest';
import { render } from '@testing-library/react';

import Page from './page';

it('matches snapshot', () => {
  const { container } = render(<Page />);
  expect(container).toMatchSnapshot();
});

it('does not have violations', async () => {
  const { container } = render(<Page />);
  const result = await axe(container);
  expect(result).toHaveNoViolations();
});
