import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ButtonComponent, {
  type ButtonProps,
} from '@/components/ui/Buttons/Button';

import {
  BUTTON_COLORS,
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from '@/components/ui/Buttons/constants';

const meta = {
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: Object.values(BUTTON_COLORS),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(BUTTON_SIZE),
    },
    shape: {
      control: { type: 'select' },
      options: Object.values(BUTTON_SHAPE),
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(BUTTON_VARIANT),
    },
    className: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// Solid Variants
export const SolidPrimary: Story = {
  args: {
    children: 'Solid Primary',
    variant: BUTTON_VARIANT.SOLID,
    color: BUTTON_COLORS.PRIMARY,
  },
};

export const SolidSecondary: Story = {
  args: {
    children: 'Solid Secondary',
    variant: BUTTON_VARIANT.SOLID,
    color: BUTTON_COLORS.SECONDARY,
  },
};

export const SolidNeutral: Story = {
  args: {
    children: 'Solid Neutral',
    variant: BUTTON_VARIANT.SOLID,
    color: BUTTON_COLORS.NEUTRAL,
  },
};

// Outlined Variants
export const OutlinedPrimary: Story = {
  args: {
    children: 'Outlined Primary',
    variant: BUTTON_VARIANT.OUTLINED,
    color: BUTTON_COLORS.PRIMARY,
  },
};

export const OutlinedSecondary: Story = {
  args: {
    children: 'Outlined Secondary',
    variant: BUTTON_VARIANT.OUTLINED,
    color: BUTTON_COLORS.SECONDARY,
  },
};

export const OutlinedNeutral: Story = {
  args: {
    children: 'Outlined Neutral',
    variant: BUTTON_VARIANT.OUTLINED,
    color: BUTTON_COLORS.NEUTRAL,
  },
};

// Ghost Variants
export const GhostPrimary: Story = {
  args: {
    children: 'Ghost Primary',
    variant: BUTTON_VARIANT.GHOST,
    color: BUTTON_COLORS.PRIMARY,
  },
};

export const GhostSecondary: Story = {
  args: {
    children: 'Ghost Secondary',
    variant: BUTTON_VARIANT.GHOST,
    color: BUTTON_COLORS.SECONDARY,
  },
};

export const GhostNeutral: Story = {
  args: {
    children: 'Ghost Neutral',
    variant: BUTTON_VARIANT.GHOST,
    color: BUTTON_COLORS.NEUTRAL,
  },
};

// Text Variants
export const TextPrimary: Story = {
  args: {
    children: 'Text Primary',
    variant: BUTTON_VARIANT.TEXT,
    color: BUTTON_COLORS.PRIMARY,
  },
};

export const TextSecondary: Story = {
  args: {
    children: 'Text Secondary',
    variant: BUTTON_VARIANT.TEXT,
    color: BUTTON_COLORS.SECONDARY,
  },
};

export const TextNeutral: Story = {
  args: {
    children: 'Text Neutral',
    variant: BUTTON_VARIANT.TEXT,
    color: BUTTON_COLORS.NEUTRAL,
  },
};
