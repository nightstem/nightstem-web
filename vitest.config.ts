/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import { defineConfig } from 'vitest/config';

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
      ],
      thresholds: {
        statements: MIN_COVERAGE_PERCENTAGE,
        branches: MIN_COVERAGE_PERCENTAGE,
        functions: MIN_COVERAGE_PERCENTAGE,
        lines: MIN_COVERAGE_PERCENTAGE,
      },
    },
  },
});
