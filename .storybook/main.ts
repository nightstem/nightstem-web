// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'path';
import type { StorybookConfig } from '@storybook/nextjs-vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
