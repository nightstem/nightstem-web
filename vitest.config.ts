/* eslint-disable-next-line @typescript-eslint/triple-slash-reference */
/// <reference types="vitest/config" />
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const GLOBAL_MIN = 80;

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
      all: true,
      reportsDirectory: './coverage',
      reporter: ['text', 'lcov', 'html'],
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        // analytics
        'src/analytics/**',

        // tests and stories
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/app/**/layout.tsx',

        // trivial glue, re-exports, types, generated
        'src/**/index.ts',
        'src/**/types.ts',
        'src/**/constants.ts',
        'src/**/*.d.ts',

        // app or framework scaffolding that brings little value to cover
        '.next/**',
        'node_modules/**',
        '**/*.config.{ts,js}',
        '**/storybook/**',
        'e2e/**',
      ],
      thresholds: {
        statements: GLOBAL_MIN,
        branches: GLOBAL_MIN,
        functions: GLOBAL_MIN,
        lines: GLOBAL_MIN,
        perFile: true,
      },
    },
  },
});
