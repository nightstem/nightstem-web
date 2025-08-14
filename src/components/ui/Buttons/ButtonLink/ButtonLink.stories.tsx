import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ButtonLinkComponent, {
  type ButtonLinkProps,
} from '@/components/ui/Buttons/ButtonLink';

import {
  BUTTON_SIZE,
  BUTTON_SHAPE,
  BUTTON_VARIANT,
  BUTTON_COLORS,
} from '@/components/ui/Buttons/constants';

const meta = {
  component: ButtonLinkComponent,
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
    isExternal: {
      control: { type: 'boolean' },
    },
    href: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<ButtonLinkProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button Link',
    href: '#',
  },
};

// Solid Variants
export const SolidPrimary: Story = {
  args: {
    children: 'Solid Primary',
    href: '#',
    variant: BUTTON_VARIANT.SOLID,
    color: BUTTON_COLORS.PRIMARY,
  },
};

export const SolidSecondary: Story = {
  args: {
    children: 'Solid Secondary',
    href: '#',
    variant: BUTTON_VARIANT.SOLID,
    color: BUTTON_COLORS.SECONDARY,
  },
};

export const SolidNeutral: Story = {
  args: {
    children: 'Solid Neutral',
    href: '#',
    variant: BUTTON_VARIANT.SOLID,
    color: BUTTON_COLORS.NEUTRAL,
  },
};

// Outlined Variants
export const OutlinedPrimary: Story = {
  args: {
    children: 'Outlined Primary',
    href: '#',
    variant: BUTTON_VARIANT.OUTLINED,
    color: BUTTON_COLORS.PRIMARY,
  },
};

export const OutlinedSecondary: Story = {
  args: {
    children: 'Outlined Secondary',
    href: '#',
    variant: BUTTON_VARIANT.OUTLINED,
    color: BUTTON_COLORS.SECONDARY,
  },
};

export const OutlinedNeutral: Story = {
  args: {
    children: 'Outlined Neutral',
    href: '#',
    variant: BUTTON_VARIANT.OUTLINED,
    color: BUTTON_COLORS.NEUTRAL,
  },
};

// Ghost Variants
export const GhostPrimary: Story = {
  args: {
    children: 'Ghost Primary',
    href: '#',
    variant: BUTTON_VARIANT.GHOST,
    color: BUTTON_COLORS.PRIMARY,
  },
};

export const GhostSecondary: Story = {
  args: {
    children: 'Ghost Secondary',
    href: '#',
    variant: BUTTON_VARIANT.GHOST,
    color: BUTTON_COLORS.SECONDARY,
  },
};

export const GhostNeutral: Story = {
  args: {
    children: 'Ghost Neutral',
    href: '#',
    variant: BUTTON_VARIANT.GHOST,
    color: BUTTON_COLORS.NEUTRAL,
  },
};

// Text Variants
export const TextPrimary: Story = {
  args: {
    children: 'Text Primary',
    href: '#',
    variant: BUTTON_VARIANT.TEXT,
    color: BUTTON_COLORS.PRIMARY,
  },
};

export const TextSecondary: Story = {
  args: {
    children: 'Text Secondary',
    href: '#',
    variant: BUTTON_VARIANT.TEXT,
    color: BUTTON_COLORS.SECONDARY,
  },
};

export const TextNeutral: Story = {
  args: {
    children: 'Text Neutral',
    href: '#',
    variant: BUTTON_VARIANT.TEXT,
    color: BUTTON_COLORS.NEUTRAL,
  },
};

// External Link
export const ExternalLink: Story = {
  args: {
    children: 'External Link',
    href: 'https://example.com',
    isExternal: true,
  },
};
