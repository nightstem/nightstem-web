// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';
import js from '@eslint/js';
import security from 'eslint-plugin-security';
import { importX } from 'eslint-plugin-import-x';
import reactPerfPlugin from 'eslint-plugin-react-perf';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import vitest from '@vitest/eslint-plugin';

const __filename = fileURLToPath(import.meta.url),
  __dirname = dirname(__filename),
  compat = new FlatCompat({
    baseDirectory: __dirname,
  }),
  eslintConfig = [
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
    security.configs.recommended,
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,
    reactPerfPlugin.configs.flat.all,
    ...compat.config({
      extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
      rules: {
        'no-console': 'error',
        '@next/next/no-img-element': 'off',
        'security/detect-object-injection': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
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
