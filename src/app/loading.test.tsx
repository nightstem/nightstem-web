import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import LoadingPage from '@/app/loading';

describe(LoadingPage, () => {
  it('does not have accessibility violations', async () => {
    const { container } = render(<LoadingPage />);
    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });

  it('matches the snapshot', () => {
    const { container } = render(<LoadingPage />);

    expect(container).toMatchSnapshot();
  });
});
