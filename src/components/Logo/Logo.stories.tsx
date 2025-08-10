import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  LOGO_MODES,
  LOGO_SIZES,
  LOGO_ANIMATIONS,
} from '@/components/Logo/constants';
import { Logo, type LogoProps } from '@/components/Logo/Logo';

const meta = {
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: Object.values(LOGO_MODES),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(LOGO_SIZES),
    },
    animation: {
      control: { type: 'select' },
      options: Object.values(LOGO_ANIMATIONS),
    },
  },
} satisfies Meta<LogoProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  args: {
    mode: LOGO_MODES.ICON,
    size: LOGO_SIZES.DISPLAY,
  },
};

export const Horizontal: Story = {
  args: {
    mode: LOGO_MODES.HORIZONTAL,
    size: LOGO_SIZES.DISPLAY,
  },
};

export const Full: Story = {
  args: {
    mode: LOGO_MODES.FULL,
    size: LOGO_SIZES.DISPLAY,
  },
};
