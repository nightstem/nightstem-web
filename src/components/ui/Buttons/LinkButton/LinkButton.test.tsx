import { render } from '@testing-library/react';

import { LinkButton } from '@/components/ui/Buttons';
import type {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from '@/components/ui/Buttons/types';
import {
  BUTTON_COLORS,
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from '@/components/ui/Buttons/constants';

const variants = Object.values(BUTTON_VARIANT) as ButtonVariant[];
const colors = Object.values(BUTTON_COLORS) as ButtonColor[];
const sizes = Object.values(BUTTON_SIZE) as ButtonSize[];
const shapes = Object.values(BUTTON_SHAPE) as ButtonShape[];

describe('Snapshots', () => {
  it.each(
    variants.flatMap((variant) =>
      colors.flatMap((color) =>
        sizes.flatMap((size) =>
          shapes.map((shape) => [variant, color, size, shape] as const),
        ),
      ),
    ),
  )(
    'matches snapshot for %s variant with %s color, %s size, and %s shape',
    // eslint-disable-next-line max-params
    (variant, color, size, shape) => {
      const { container } = render(
        <LinkButton
          variant={variant}
          color={color}
          size={size}
          shape={shape}
          href="#"
        >
          Link Button
        </LinkButton>,
      );
      expect(container.firstChild).toMatchSnapshot();
    },
  );

  it('matches snapshot for external link', () => {
    const { container } = render(
      <LinkButton href="https://example.com" isExternal>
        External Link
      </LinkButton>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for internal link', () => {
    const { container } = render(
      <LinkButton href="/internal">Internal Link</LinkButton>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
