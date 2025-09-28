import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PageLoader, {
  MODE,
  type PageLoaderProps,
} from '@/components/ui/Loaders/PageLoader/PageLoader';

const meta = {
  component: PageLoader,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: Object.values(MODE),
    },
  },
} satisfies Meta<PageLoaderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReplaceActive: Story = {
  args: {
    active: true,
    mode: MODE.REPLACE,
    children: <p>This is content</p>,
  },
};

export const ActiveWithCustomMessage: Story = {
  args: {
    active: true,
    mode: MODE.REPLACE,
    message: 'Thank you for you patience',
    children: <p>This is content</p>,
  },
};

export const Inactive: Story = {
  args: {
    active: false,
    children: <p>This is content</p>,
  },
};

export const OverlayActive: Story = {
  args: {
    active: true,
    mode: MODE.OVERLAY,
    children: <p>This is content</p>,
  },
};
