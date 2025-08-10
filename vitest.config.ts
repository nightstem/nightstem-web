/* eslint-disable-next-line @typescript-eslint/triple-slash-reference */
/// <reference types="vitest/config" />
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const MIN_COVERAGE_PERCENTAGE = 85;

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    css: false,
    globals: true,
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 10000,
    coverage: {
      provider: 'v8',
      include: [
        'src/**/*.{ts,tsx}',
        '!src/**/index.ts',
        '!src/**/*.d.ts',
        '!src/**/*.test.{ts,tsx}',
        '!src/**/types.ts',
        '!src/**/constants.ts',
      ],
      thresholds: {
        statements: MIN_COVERAGE_PERCENTAGE,
        branches: MIN_COVERAGE_PERCENTAGE,
        functions: MIN_COVERAGE_PERCENTAGE,
        lines: MIN_COVERAGE_PERCENTAGE,
      },
    },
    projects: [
      // Unit tests project
      {
        extends: true,
        plugins: [react(), tsconfigPaths()],
        test: {
          name: 'unit',
          include: ['**/*.{test,spec}.{ts,tsx}'],
          environment: 'jsdom',
        },
      },
      // Storybook tests project
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
