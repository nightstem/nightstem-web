import type { Preview } from '@storybook/nextjs-vite';

import { themes } from 'storybook/theming';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    docs: {
      theme: themes.dark,
    },

    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#000' },
        light: { name: 'Light', value: '#ededed' },
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  initialGlobals: {
    backgrounds: { value: 'dark' }, // Set initial background
  },
};

export default preview;
