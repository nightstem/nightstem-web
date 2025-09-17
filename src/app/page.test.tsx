import { axe } from 'vitest-axe';
import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';

import Page from '@/app/page';

describe(Page, () => {
  it('matches snapshot', () => {
    const { container } = render(<Page />);

    expect(container).toMatchSnapshot();
  });

  it('does not have violations', async () => {
    const { container } = render(<Page />);
    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
