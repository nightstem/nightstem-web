import { axe } from 'vitest-axe';
import { render } from '@testing-library/react';

import Kbd, { type KbdProps } from '@/components/ui/Kbd';

const defaultProps: KbdProps = {
  children: 'Ctrl',
};

it('does not have any accessibility violations', async () => {
  const { container } = render(<Kbd {...defaultProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it('matches the snapshot', () => {
  const { container } = render(<Kbd {...defaultProps} />);
  expect(container.firstChild).toMatchSnapshot();
});
