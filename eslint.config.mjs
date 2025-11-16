import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  // 1. Source files (browser)
  {
    ignores: ['dist/**', 'node_modules/**', 'package-lock.json'],

    files: ['src/**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
  },

  // 2. Webpack config files (node)
  {
    files: ['webpack.*.js'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },

  {
    overrides: [
      {
        files: ['tests/**/*'],
        plugins: ['jest'],
        env: {
          'jest/globals': true,
        },
      },
    ],
  },

  // 3. Prettier plugin
  eslintPluginPrettierRecommended,
]);
