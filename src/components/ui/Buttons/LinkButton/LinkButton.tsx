import cx from 'classnames';
import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

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
import {
  THEME_SHAPE,
  THEME_SIZE,
  THEME_VARIANT,
} from '@/components/ui/Buttons/themes';

export type LinkButtonProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  isExternal?: boolean;
  size?: ButtonSize;
  color?: ButtonColor;
  shape?: ButtonShape;
  variant?: ButtonVariant;
};

const LinkButton = ({
  className,
  href,
  isExternal = false,
  color = BUTTON_COLORS.PRIMARY,
  size = BUTTON_SIZE.MD,
  shape = BUTTON_SHAPE.SQUARE,
  variant = BUTTON_VARIANT.SOLID,
  ...props
}: LinkButtonProps) => {
  const sizeClassNames = THEME_SIZE[size];
  const shapeClassNames = THEME_SHAPE[shape];
  const colorClassNames = THEME_VARIANT[variant][color];

  const classNames = cx(
    'select-none whitespace-nowrap font-medium',
    'cursor-pointer disabled:cursor-not-allowed',
    'transition-colors duration-200 motion-reduce:transition-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-dark',
    sizeClassNames,
    shapeClassNames,
    colorClassNames,
    className,
  );

  return isExternal ? (
    <a href={href!} className={classNames} {...props} />
  ) : (
    <Link href={href!} className={classNames} {...props} />
  );
};

export default LinkButton;
