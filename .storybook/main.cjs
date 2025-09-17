const path = require('path');

/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
const config = {
  stories: [
    // '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
  ],
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

module.exports = config;
