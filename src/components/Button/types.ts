import {
  BUTTON_COLORS,
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from '@/components/Button/constants';

export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];
export type ButtonShape = (typeof BUTTON_SHAPE)[keyof typeof BUTTON_SHAPE];
export type ButtonColor = (typeof BUTTON_COLORS)[keyof typeof BUTTON_COLORS];
export type ButtonVariant =
  (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];
