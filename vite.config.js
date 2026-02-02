import { defineConfig } from 'vite';
import { resolve, relative } from 'path';
import { readdirSync, existsSync } from 'fs';

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
      input: (function collectHtmlInputs() {
        const inputs = {};
        const root = resolve(__dirname);
        const ignore = new Set(['node_modules', 'dist', '.git', 'public', 'backups']);

        function walk(dir) {
          for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const name = entry.name;
            if (ignore.has(name)) continue;
            const full = resolve(dir, name);
            if (entry.isDirectory()) {
              walk(full);
            } else if (entry.isFile() && name.endsWith('.html')) {
              let rel = relative(root, full);
              const key = rel.replace(/\.html$/i, '').replace(/[\\/]/g, '-');
              inputs[key || 'index'] = full;
            }
          }
        }

        try { walk(root); } catch (e) { /* ignore read errors */ }

        if (!inputs.main && existsSync(resolve(root, 'index.html'))) {
          inputs.main = resolve(root, 'index.html');
        }
        if (!inputs.dev && existsSync(resolve(root, '_dev.html'))) {
          inputs.dev = resolve(root, '_dev.html');
        }

        return inputs;
      })()
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
