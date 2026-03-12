import { defineConfig } from "vite";
import { resolve, relative, join } from "path";
import { readdirSync, statSync, existsSync, mkdirSync, copyFileSync } from "fs";

// Plugin : copie les assets non-bundlables vers dist en préservant les chemins
// nécessaire pour : marked.min.js (script sans type=module) + JSON d'activités (fetch dynamique)
function copyStaticAssets() {
  return {
    name: "copy-static-assets",
    writeBundle() {
      const copies = [
        // marked.min.js → les pages HTML y accèdent via chemin relatif ../../js/libs/
        {
          src: resolve(__dirname, "src/js/libs"),
          dst: resolve(__dirname, "dist/src/js/libs"),
        },
        // JSON activités → fetchés dynamiquement via chemin relatif ../../data/activites/
        {
          src: resolve(__dirname, "src/data/activites"),
          dst: resolve(__dirname, "dist/src/data/activites"),
        },
      ];

      for (const { src, dst } of copies) {
        if (!existsSync(src)) continue;
        mkdirSync(dst, { recursive: true });
        for (const file of readdirSync(src)) {
          copyFileSync(join(src, file), join(dst, file));
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [copyStaticAssets()],

  root: ".",
  base: "/",

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    emptyOutDir: false,

    rollupOptions: {
      input: (function collectHtmlInputs() {
        const inputs = {};
        const root = resolve(__dirname);

        // Fonction récursive pour scanner tous les dossiers
        function scanDirectory(dir) {
          try {
            const entries = readdirSync(dir, { withFileTypes: true });

            for (const entry of entries) {
              const fullPath = join(dir, entry.name);

              if (entry.isDirectory()) {
                // Scanner les sous-dossiers (sauf node_modules, dist, .git)
                if (
                  !["node_modules", "dist", ".git", "scripts"].includes(
                    entry.name,
                  )
                ) {
                  scanDirectory(fullPath);
                }
              } else if (entry.name.endsWith(".html")) {
                // Ajouter le fichier HTML
                const relativePath = relative(root, fullPath);
                const key = relativePath
                  .replace(/\.html$/i, "")
                  .replace(/[\\/]/g, "-")
                  .replace(/^src-/, ""); // Enlever le préfixe "src-"

                inputs[key || "index"] = fullPath;
              }
            }
          } catch (e) {
            console.error(`Erreur scan ${dir}:`, e.message);
          }
        }

        // Scanner depuis la racine
        scanDirectory(root);

        console.log("📄 Fichiers HTML détectés:", Object.keys(inputs).length);
        return inputs;
      })(),
    },

    copyPublicDir: true,
  },

  server: {
    port: 3001,
    // Ouvrir la page _dev.html automatiquement en local
    open: "/_dev.html",
  },

  preview: {
    port: 4173,
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@css": resolve(__dirname, "src/css"),
      "@js": resolve(__dirname, "src/js"),
      "@images": resolve(__dirname, "src/images"),
    },
  },

  publicDir: "public",
});
