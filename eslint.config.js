import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['app.js'],
    languageOptions: {
      sourceType: 'script',
      globals: globals.browser,
    },
    rules: {
      eqeqeq: ['error', 'always'],

      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'no-console': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
