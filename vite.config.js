import { defineConfig } from "vite";
import { resolve, relative, join } from "path";
import { readdirSync, existsSync, mkdirSync, copyFileSync } from "fs";

// Plugin : copie les assets non-bundlables vers dist en préservant les chemins src/
// Nécessaire pour :
//   - marked.min.js (script sans type=module, non bundlé par Vite)
//   - JSON fetchés dynamiquement via chemin relatif ../../data/xxx/ depuis les pages HTML
function copyStaticAssets() {
  // Copie récursive d'un dossier src → dst
  function copyDir(src, dst) {
    if (!existsSync(src)) return;
    mkdirSync(dst, { recursive: true });
    for (const entry of readdirSync(src, { withFileTypes: true })) {
      const srcPath = join(src, entry.name);
      const dstPath = join(dst, entry.name);
      if (entry.isDirectory()) {
        copyDir(srcPath, dstPath);
      } else {
        copyFileSync(srcPath, dstPath);
      }
    }
  }

  return {
    name: "copy-static-assets",
    // closeBundle : appelé une seule fois après que tous les chunks sont écrits
    closeBundle() {
      const copies = [
        // marked.min.js → pages HTML l'accèdent via ../../js/libs/marked.min.js
        {
          src: resolve(__dirname, "src/js/libs"),
          dst: resolve(__dirname, "dist/src/js/libs"),
        },
        // JSON cours → fetchés via ../../data/cours/xxx.json
        {
          src: resolve(__dirname, "src/data/cours"),
          dst: resolve(__dirname, "dist/src/data/cours"),
        },
        // JSON activités → fetchés via ../../data/activites/xxx.json
        {
          src: resolve(__dirname, "src/data/activites"),
          dst: resolve(__dirname, "dist/src/data/activites"),
        },
        // JSON révisions → fetchés via ../../data/revisions/xxx.json
        {
          src: resolve(__dirname, "src/data/revisions"),
          dst: resolve(__dirname, "dist/src/data/revisions"),
        },
        // JSON référentiels → fetchés via ../../data/referentiels/xxx.json
        {
          src: resolve(__dirname, "src/data/referentiels"),
          dst: resolve(__dirname, "dist/src/data/referentiels"),
        },
        // JSON graphiques → fetchés dynamiquement si nécessaire
        {
          src: resolve(__dirname, "src/data/graphiques"),
          dst: resolve(__dirname, "dist/src/data/graphiques"),
        },
        // Fichiers Markdown → fetchés via ../../content/md/xxx/yyy.md
        {
          src: resolve(__dirname, "src/content/md"),
          dst: resolve(__dirname, "dist/src/content/md"),
        },
      ];

      for (const { src, dst } of copies) {
        copyDir(src, dst);
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
