// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
/* eslint-disable no-underscore-dangle */
import storybook from 'eslint-plugin-storybook';
import js from '@eslint/js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import vitest from '@vitest/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
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
  js.configs.all,
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      'id-length': 'off',
      'sort-keys': 'off',
      'func-style': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'sort-imports': 'off',
      'no-magic-numbers': 'off',
      'no-inline-comments': 'off',
      'one-var': ['error', 'never'],
      'capitalized-comments': 'off',
      'max-lines-per-function': 'off',
      'max-statements': ['error', 15],
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  }),
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
      'vitest/prefer-lowercase-title': 'off',
      'vitest/prefer-expect-assertions': 'off',
      'vitest/require-mock-type-parameters': 'off',
    },
  },
];

export default eslintConfig;
