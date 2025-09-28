import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import PageLoader, { MODE } from './PageLoader';

describe(PageLoader, () => {
  it.each(Object.values(MODE))(
    'does not have accessibility violations in %s mode',
    async (mode) => {
      const { container } = render(<PageLoader mode={mode} />);
      const result = await axe(container);

      expect(result).toHaveNoViolations();
    },
  );

  it.each(Object.values(MODE))(
    'matches the snapshot in %s mode',
    async (mode) => {
      const { container } = render(<PageLoader mode={mode} />);

      expect(container).toMatchSnapshot();
    },
  );

  it("does not show the loader when it's disabled", () => {
    render(<PageLoader active={false} />);

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
