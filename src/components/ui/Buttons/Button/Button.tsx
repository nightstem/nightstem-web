import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import cn from '@/utils/classnames';

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

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: ButtonSize;
  color?: ButtonColor;
  shape?: ButtonShape;
  variant?: ButtonVariant;
};

const Button = ({
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
      className={cn(
        'font-medium whitespace-nowrap select-none',
        'cursor-pointer disabled:cursor-not-allowed',
        'transition-colors duration-200 motion-reduce:transition-none',
        'ring-offset-dark focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        sizeClassNames,
        shapeClassNames,
        colorClassNames,
        className,
      )}
      {...props}
    />
  );
};

export default Button;
