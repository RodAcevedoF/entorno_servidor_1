import parser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'data/*.log',
      '.env',
      'eslint.config.ts',
      'generated/**',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      quotes: [
        'warn',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
    },
  },
];
