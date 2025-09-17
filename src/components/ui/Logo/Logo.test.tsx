import { axe } from 'vitest-axe';
import { render } from '@testing-library/react';

import { Logo } from '@/components/ui/Logo';
import type {
  LogoAnimation,
  LogoMode,
  LogoSize,
} from '@/components/ui/Logo/types';
import {
  LOGO_ANIMATIONS,
  LOGO_MODES,
  LOGO_SIZES,
} from '@/components/ui/Logo/constants';

const modes = Object.values(LOGO_MODES) as LogoMode[];
const animations = Object.values(LOGO_ANIMATIONS) as LogoAnimation[];

describe('Accessibility', () => {
  it.each(modes)(
    'should not have any accessibility violations in "%s" mode',
    async (mode) => {
      const { container } = render(<Logo mode={mode} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    },
  );
});

describe('Snapshots', () => {
  const sizes = Object.values(LOGO_SIZES) as LogoSize[];

  it.each(modes.flatMap((mode) => sizes.map((size) => [mode, size] as const)))(
    'matches snapshot for %s mode with %s size',
    (mode, size) => {
      const { container } = render(<Logo mode={mode} size={size} />);
      expect(container.firstChild).toMatchSnapshot();
    },
  );

  it.each(animations)(
    'matches snapshot for HORIZONTAL mode with DISPLAY size and %s animation',
    (animation) => {
      const { container } = render(
        <Logo
          mode={LOGO_MODES.HORIZONTAL}
          size={LOGO_SIZES.DISPLAY}
          animation={animation}
        />,
      );
      expect(container.firstChild).toMatchSnapshot();
    },
  );
});
