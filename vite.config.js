import { defineConfig } from "vite";
import { resolve, relative } from "path";
import { readdirSync, existsSync } from "fs";

export default defineConfig({
  // Configuration de base
  root: ".",
  base: "/",

  // Dossier de build
  build: {
    outDir: "dist",
    emptyOutDir: false,

    // Configuration du rollup
    rollupOptions: {
      // Inclut les HTML à la racine + tous ceux dans src/pages/ (récursif)
      input: (function collectHtmlInputs() {
        const inputs = {};
        const root = resolve(__dirname);

        // Priorité : index & _dev
        const indexPath = resolve(root, "index.html");
        const devPath = resolve(root, "_dev.html");

        if (existsSync(indexPath)) inputs.main = indexPath;
        if (existsSync(devPath)) inputs.dev = devPath;

        // HTML à la racine (non récursif)
        try {
          for (const entry of readdirSync(root, { withFileTypes: true })) {
            if (entry.isFile() && entry.name.endsWith(".html")) {
              const full = resolve(root, entry.name);
              const rel = relative(root, full);
              const key = rel.replace(/\.html$/i, "").replace(/[\\/]/g, "-");
              if (!inputs[key]) inputs[key || "index"] = full;
            }
          }
        } catch (e) {
          // ignore read errors
        }

        // HTML dans src/pages/ (récursif)
        function scanDir(dir) {
          try {
            for (const entry of readdirSync(dir, { withFileTypes: true })) {
              const full = resolve(dir, entry.name);
              if (entry.isDirectory()) {
                scanDir(full);
              } else if (entry.isFile() && entry.name.endsWith(".html")) {
                const rel = relative(root, full);
                const key = rel.replace(/\.html$/i, "").replace(/[\\/]/g, "-");
                if (!inputs[key]) inputs[key] = full;
              }
            }
          } catch (e) {
            // ignore read errors
          }
        }
        const pagesDir = resolve(root, "src/pages");
        if (existsSync(pagesDir)) scanDir(pagesDir);

        return inputs;
      })(),
    },

    // Copier les assets
    copyPublicDir: true,
  },

  plugins: [],

  // Configuration du serveur de dev
  server: {
    port: 3001,
    open: true,
  },

  // Configuration du serveur de preview
  preview: {
    port: 4173,
  },

  // Résolution des modules
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@css": resolve(__dirname, "src/css"),
      "@js": resolve(__dirname, "src/js"),
      "@images": resolve(__dirname, "src/images"),
    },
  },

  // Public directory
  publicDir: "public",
});
