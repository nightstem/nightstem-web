import type {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from '@/components/ui/Buttons/types';

import { cn } from '@/lib/utils';

export const THEME_SIZE: Record<ButtonSize, string> = {
  lg: 'text-lg px-5 py-2.5',
  md: 'text-base px-4 py-2',
  sm: 'text-sm px-3 py-1.5',
} as const;

export const THEME_SHAPE: Record<ButtonShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-md',
} as const;

export const THEME_VARIANT: Record<
  ButtonVariant,
  Record<ButtonColor, string>
> = {
  solid: {
    primary: cn(
      'text-dark bg-primary-500',
      'hover:bg-primary-400 active:bg-primary-400',
      'focus-visible:ring-primary-500',
      'disabled:opacity-60 disabled:hover:bg-primary-500 disabled:active:bg-primary-500',
    ),
    secondary: cn(
      'text-dark bg-secondary-500',
      'hover:bg-secondary-400 active:bg-secondary-400',
      'focus-visible:ring-secondary-500',
      'disabled:opacity-60 disabled:hover:bg-secondary-500 disabled:active:bg-secondary-500',
    ),
    neutral: cn(
      'text-dark bg-neutral-400',
      'hover:bg-neutral-300 active:bg-neutral-300',
      'focus-visible:ring-neutral-400',
      'disabled:opacity-60 disabled:hover:bg-neutral-400 disabled:active:bg-neutral-400',
    ),
  },
  outlined: {
    primary: cn(
      'text-primary-500 bg-transparent border border-primary-500',
      'hover:border-primary-400 active:border-primary-400 hover:bg-primary-500/20 active:bg-primary-500/20',
      'focus-visible:ring-primary-500',
      'disabled:opacity-60 disabled:hover:border-primary-500 disabled:active:border-primary-500',
    ),
    secondary: cn(
      'text-white bg-transparent border border-secondary-500',
      'hover:border-secondary-400 active:border-secondary-400 hover:bg-secondary-500/20 active:bg-secondary-500/20',
      'focus-visible:ring-secondary-500',
      'disabled:opacity-60 disabled:hover:border-secondary-500 disabled:active:border-secondary-500',
    ),
    neutral: cn(
      'text-neutral-400 bg-transparent border border-neutral-400',
      'hover:border-neutral-300 active:border-neutral-300 hover:bg-neutral-400/20 active:bg-neutral-400/20',
      'focus-visible:ring-neutral-400',
      'disabled:opacity-60 disabled:hover:border-neutral-400 disabled:active:border-neutral-400',
    ),
  },
  ghost: {
    primary: cn(
      'text-primary-500 bg-transparent',
      'hover:text-dark hover:bg-primary-500/60 active:bg-primary-500/60',
      'focus-visible:ring-primary-500',
      'disabled:opacity-60 disabled:hover:text-primary-500 disabled:hover:bg-transparent disabled:active:bg-transparent',
    ),
    secondary: cn(
      'text-secondary-500 bg-transparent',
      'hover:text-dark hover:bg-secondary-500/60 active:bg-secondary-500/60',
      'focus-visible:ring-secondary-500',
      'disabled:opacity-60 disabled:hover:text-secondary-500 disabled:hover:bg-transparent disabled:active:bg-transparent',
    ),
    neutral: cn(
      'text-neutral-400 bg-transparent',
      'hover:text-dark hover:bg-neutral-400/60 active:bg-neutral-400/60',
      'focus-visible:ring-neutral-400',
      'disabled:opacity-60 disabled:hover:text-neutral-400 disabled:hover:bg-transparent disabled:active:bg-transparent',
    ),
  },
  text: {
    primary: cn(
      'text-primary-500',
      'hover:text-primary-400 active:text-primary-400',
      'focus-visible:ring-primary-500',
      'disabled:opacity-60 disabled:hover:text-primary-500 disabled:hover:bg-transparent disabled:active:bg-transparent',
    ),
    secondary: cn(
      'text-secondary-500',
      'hover:text-secondary-400 active:text-secondary-400',
      'focus-visible:ring-secondary-500',
      'disabled:opacity-60 disabled:hover:text-secondary-500 disabled:hover:bg-transparent disabled:active:bg-transparent',
    ),
    neutral: cn(
      'text-neutral-400',
      'hover:text-neutral-300 active:text-neutral-300',
      'focus-visible:ring-neutral-400',
      'disabled:opacity-60 disabled:hover:text-neutral-400 disabled:hover:bg-transparent disabled:active:bg-transparent',
    ),
  },
} as const;
