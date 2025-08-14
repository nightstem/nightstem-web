import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import KbdComponent, { type KbdProps } from '@/components/ui/Kbd';

const meta = {
  component: KbdComponent,
  tags: ['autodocs'],
} satisfies Meta<KbdProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Kbd: Story = {
  args: {
    children: 'Ctrl',
  },
};
