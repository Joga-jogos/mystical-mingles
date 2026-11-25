import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import importHelpers from 'eslint-plugin-import-helpers';

import pluginJs from '@eslint/js';

export default [
  {
    ignores: [
      '**/lib/*',
      '**/dist/*',
      '**/build/*',
      '**/*.html',
      '**/*.d.ts',
      '**/jest.config.js',
      '**/lcov-report/*'
    ]
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'import-helpers': importHelpers,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': ['off'],
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'object-curly-spacing': ['error', 'always'],
      'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      }],
      'max-len': ['error', { 'code': 120 }],
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            ['/^react/'],
            ['/^next/'],
            'module',
            '/^@storybook/',
            '/^@hello-pangea/',
            // '/^@(?!/)/',
            '/^@mystical-mingles/ui/',
            '/^@mystical-mingles/toolkit/',
            '/^@mystical-mingles/engine/',
            '/^@mystical-mingles/services/',
            '/^@mystical-mingles/common/',
            '/^@mystical-mingles/',
            '/^@(?!mystical-mingles)/',
            'parent',
            'sibling',
            'index',
            '/^~/',
          ],
        }
      ]
    },
    settings: {
      react: {
        version: 'detect', // Detecta automaticamente a versão do React
      },
    },
  }
];