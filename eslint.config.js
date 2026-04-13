import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginAstro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // JavaScript (browser + Node scripts)
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // TypeScript
  ...tseslint.configs.recommended,

  // Astro
  ...pluginAstro.configs.recommended,
]);
