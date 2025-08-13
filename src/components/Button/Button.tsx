import cx from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import type {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from '@/components/Button/types';

import {
  BUTTON_SIZE,
  BUTTON_SHAPE,
  BUTTON_VARIANT,
  BUTTON_COLORS,
} from '@/components/Button/constants';
import { THEME_VARIANT, THEME_SIZE, THEME_SHAPE } from './themes';

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: ButtonSize;
  color?: ButtonColor;
  shape?: ButtonShape;
  variant?: ButtonVariant;
};

export const Button = ({
  className,
  type = 'button',
  color = BUTTON_COLORS.PRIMARY,
  size = BUTTON_SIZE.MD,
  shape = BUTTON_SHAPE.SQUARE,
  variant = BUTTON_VARIANT.SOLID,
  ...props
}: ButtonProps) => {
  const sizeClassNames = THEME_SIZE[size];
  const shapeClassNames = THEME_SHAPE[shape];
  const colorClassNames = THEME_VARIANT[variant][color];

  return (
    <button
      type={type}
      className={cx(
        'select-none whitespace-nowrap font-medium',
        'cursor-pointer disabled:cursor-not-allowed',
        'transition-colors duration-200 motion-reduce:transition-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-dark',
        sizeClassNames,
        shapeClassNames,
        colorClassNames,
        className,
      )}
      {...props}
    />
  );
};

Button.displayName = 'Button';
export default Button;
