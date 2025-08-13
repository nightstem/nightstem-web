import cx from 'classnames';

import type {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from '@/components/Button/types';

export const THEME_SIZE: Record<ButtonSize, string> = {
  XL: 'text-xl leading-[1.15] px-6 py-3',
  LG: 'text-lg leading-[1.15] px-5 py-2.5',
  MD: 'text-base leading-[1.15] px-4 py-2',
  SM: 'text-sm leading-[1.15] px-3 py-1.5',
  XS: 'text-[0.75rem] leading-[1.15] px-2 py-1',
} as const;

export const THEME_SHAPE: Record<ButtonShape, string> = {
  CIRCLE: 'rounded-full',
  ROUNDED: 'rounded-2xl',
  SQUARE: 'rounded-md',
} as const;

export const THEME_VARIANT: Record<
  ButtonVariant,
  Record<ButtonColor, string>
> = {
  SOLID: {
    PRIMARY: cx(
      'text-dark bg-primary-500',
      'hover:bg-primary-400 active:bg-primary-400',
      'focus-visible:ring-primary-500',
      'disabled:opacity-60 disabled:hover:bg-primary-500 disabled:active:bg-primary-500',
    ),
    SECONDARY: cx(
      'text-dark bg-secondary-500',
      'hover:bg-secondary-400 active:bg-secondary-400',
      'focus-visible:ring-secondary-500',
      'disabled:opacity-60 disabled:hover:bg-secondary-500 disabled:active:bg-secondary-500',
    ),
    NEUTRAL: cx(
      'text-dark bg-neutral-500',
      'hover:bg-neutral-400 active:bg-neutral-400',
      'focus-visible:ring-neutral-500',
      'disabled:opacity-60 disabled:hover:bg-neutral-500 disabled:active:bg-neutral-500',
    ),
  },
  OUTLINED: {
    PRIMARY: cx(
      'text-primary-500 bg-transparent border border-primary-500',
      'hover:border-primary-400 active:border-primary-400 hover:bg-primary-500/20 active:bg-primary-500/20',
      'focus-visible:ring-primary-500',
      'disabled:opacity-60 disabled:hover:border-primary-500 disabled:active:border-primary-500',
    ),
    SECONDARY: cx(
      'text-secondary-500 bg-transparent border border-secondary-500',
      'hover:border-secondary-400 active:border-secondary-400 hover:bg-secondary-500/20 active:bg-secondary-500/20',
      'focus-visible:ring-secondary-500',
      'disabled:opacity-60 disabled:hover:border-secondary-500 disabled:active:border-secondary-500',
    ),
    NEUTRAL: cx(
      'text-neutral-500 bg-transparent border border-neutral-500',
      'hover:border-neutral-400 active:border-neutral-400 hover:bg-neutral-500/20 active:bg-neutral-500/20',
      'focus-visible:ring-neutral-500',
      'disabled:opacity-60 disabled:hover:border-neutral-500 disabled:active:border-neutral-500',
    ),
  },
  GHOST: {
    PRIMARY: cx(
      'text-primary-500 bg-transparent',
      'hover:text-dark hover:bg-primary-500/60 active:bg-primary-500/60',
      'focus-visible:ring-primary-500',
      'disabled:opacity-60 disabled:hover:text-primary-500 disabled:hover:bg-transparent disabled:active:bg-transparent',
    ),
    SECONDARY: cx(
      'text-secondary-500 bg-transparent',
      'hover:text-dark hover:bg-secondary-500/60 active:bg-secondary-500/60',
      'focus-visible:ring-secondary-500',
      'disabled:opacity-60 disabled:hover:text-secondary-500 disabled:hover:bg-transparent disabled:active:bg-transparent',
    ),
    NEUTRAL: cx(
      'text-neutral-500 bg-transparent',
      'hover:text-dark hover:bg-neutral-500/60 active:bg-neutral-500/60',
      'focus-visible:ring-neutral-500',
      'disabled:opacity-60 disabled:hover:text-neutral-500 disabled:hover:bg-transparent disabled:active:bg-transparent',
    ),
  },
  TEXT: {
    PRIMARY: cx(
      'text-primary-500',
      'hover:text-primary-400 active:text-primary-400',
      'focus-visible:ring-primary-500',
      'disabled:opacity-60 disabled:hover:text-primary-500 disabled:hover:bg-transparent disabled:active:bg-transparent',
    ),
    SECONDARY: cx(
      'text-secondary-500',
      'hover:text-secondary-400 active:text-secondary-400',
      'focus-visible:ring-secondary-500',
      'disabled:opacity-60 disabled:hover:text-secondary-500 disabled:hover:bg-transparent disabled:active:bg-transparent',
    ),
    NEUTRAL: cx(
      'text-neutral-500',
      'hover:text-neutral-400 active:text-neutral-400',
      'focus-visible:ring-neutral-500',
      'disabled:opacity-60 disabled:hover:text-neutral-500 disabled:hover:bg-transparent disabled:active:bg-transparent',
    ),
  },
} as const;
