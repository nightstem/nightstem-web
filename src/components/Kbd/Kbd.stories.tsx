import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import KbdComponet, { type KbdProps } from '@/components/Kbd';

const meta = {
  component: KbdComponet,
  tags: ['autodocs'],
} satisfies Meta<KbdProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Kbd: Story = {
  args: {
    children: 'Ctrl',
  },
};
