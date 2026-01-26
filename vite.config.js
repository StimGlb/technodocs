import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Configuration de base
  root: '.',
  base: '/',

  // Dossier de build
  build: {
    outDir: 'dist',
    emptyOutDir: false,

    // Configuration du rollup
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    },

    // Copier les assets
    copyPublicDir: true,
  },

  // Configuration du serveur de dev
  server: {
    port: 3000,
    open: true,
  },

  // Configuration du serveur de preview
  preview: {
    port: 4173,
  },

  // Résolution des modules
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@css': resolve(__dirname, 'src/css'),
      '@js': resolve(__dirname, 'src/js'),
      '@images': resolve(__dirname, 'src/images'),
    }
  },

  // Public directory
  publicDir: 'public',
});
