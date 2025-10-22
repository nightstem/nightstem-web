// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { defineConfig } from 'eslint/config';

import js from '@eslint/js';
import security from 'eslint-plugin-security';
import storybook from 'eslint-plugin-storybook';
import { importX } from 'eslint-plugin-import-x';
import reactPerfPlugin from 'eslint-plugin-react-perf';
import nextPlugin from '@next/eslint-plugin-next';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import vitest from '@vitest/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig([
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      '.next/**',
      'out/**',
      'build/**',
      '**/*.d.ts',
    ],
  },
  js.configs.recommended,
  ...compat.extends('next/typescript'),
  security.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  reactPerfPlugin.configs.flat.all,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'no-console': 'error',
      '@next/next/no-img-element': 'off',
      'security/detect-object-injection': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      'import-x/no-named-as-default-member': 'off',
    },
  },
  {
    files: ['.storybook/**'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    plugins: {
      vitest,
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
      parserOptions: {
        project: true,
      },
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    rules: {
      ...vitest.configs.all.rules,
      'vitest/no-hooks': 'off',
      'vitest/prefer-import-in-mock': 'off',
      'vitest/prefer-lowercase-title': 'off',
      'vitest/prefer-expect-assertions': 'off',
      'vitest/require-mock-type-parameters': 'off',
    },
  },
  {
    files: ['.husky/**'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]);

export default eslintConfig;
