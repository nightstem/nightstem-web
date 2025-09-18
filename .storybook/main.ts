import path from 'path';
import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  viteFinal: (vitestConfig) => {
    // Configure for ES modules compatibility
    vitestConfig.define = {
      ...vitestConfig.define,
      global: 'globalThis',
    };

    return vitestConfig;
  },
  staticDirs: [path.join(__dirname, '..', 'public')],
};

export default config;
