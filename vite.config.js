import { defineConfig } from 'vite';
import { resolve, relative, join } from 'path';
import { readdirSync, existsSync, mkdirSync, copyFileSync, statSync, rmSync, unlinkSync } from 'fs';
import { dirname } from 'path';

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
    name: 'copy-static-assets',
    // closeBundle : appelé une seule fois après que tous les chunks sont écrits
    closeBundle() {
      // Nettoie les anciens chunks hachés dans dist/assets/ pour éviter l'accumulation
      // (emptyOutDir: false contourne l'EPERM Windows sur dist/src verrouillé par l'OS)
      const assetsDir = resolve(__dirname, 'dist/assets');
      if (existsSync(assetsDir)) {
        for (const f of readdirSync(assetsDir)) {
          // Supprime uniquement les fichiers JS/CSS hachés (format nom-HASH.ext)
          if (/\.[a-zA-Z0-9]{8,}\.(js|css)$/.test(f)) {
            try { unlinkSync(join(assetsDir, f)); } catch (_) { /* ignoré */ }
          }
        }
      }
      const copies = [
        // marked.min.js → pages HTML l'accèdent via ../../js/libs/marked.min.js
        {
          src: resolve(__dirname, 'src/js/libs'),
          dst: resolve(__dirname, 'dist/src/js/libs'),
        },
        // JSON cours → fetchés via ../../data/cours/xxx.json
        {
          src: resolve(__dirname, 'src/data/cours'),
          dst: resolve(__dirname, 'dist/src/data/cours'),
        },
        // JSON activités → fetchés via ../../data/activites/xxx.json
        {
          src: resolve(__dirname, 'src/data/activites'),
          dst: resolve(__dirname, 'dist/src/data/activites'),
        },
        // JSON révisions → fetchés via ../../data/revisions/xxx.json
        {
          src: resolve(__dirname, 'src/data/revisions'),
          dst: resolve(__dirname, 'dist/src/data/revisions'),
        },
        // JSON référentiels → fetchés via ../../data/referentiels/xxx.json
        {
          src: resolve(__dirname, 'src/data/referentiels'),
          dst: resolve(__dirname, 'dist/src/data/referentiels'),
        },
        // JSON graphiques → fetchés dynamiquement si nécessaire
        {
          src: resolve(__dirname, 'src/data/graphiques'),
          dst: resolve(__dirname, 'dist/src/data/graphiques'),
        },
        // JSON postes consommation électrique → fetché via /src/data/postes-conso-elect.json
        {
          src: resolve(__dirname, 'src/data/postes-conso-elect.json'),
          dst: resolve(__dirname, 'dist/src/data/postes-conso-elect.json'),
        },
        // Fichiers Markdown → fetchés via ../../content/md/xxx/yyy.md
        {
          src: resolve(__dirname, 'src/content/md'),
          dst: resolve(__dirname, 'dist/src/content/md'),
        },
        // Images → référencées dans les .md et HTML via chemins relatifs
        {
          src: resolve(__dirname, 'src/assets'),
          dst: resolve(__dirname, 'dist/src/assets'),
        },
        // _redirects → fichier Netlify pour les règles de redirection
        {
          src: resolve(__dirname, '_redirects'),
          dst: resolve(__dirname, 'dist/_redirects'),
        },
      ];

      for (const { src, dst } of copies) {
        if (!existsSync(src)) continue;
        if (statSync(src).isFile()) {
          mkdirSync(dirname(dst), { recursive: true });
          copyFileSync(src, dst);
        } else {
          copyDir(src, dst);
        }
      }
    },
  };
}

// ... (gardez tout votre code au-dessus, y compris la fonction copyStaticAssets)

export default defineConfig(({ command, mode }) => {
  // Détection si on est sur GitHub Actions
  const isGitHubPages = process.env.GITHUB_PAGES === 'true';

  return {
    plugins: [copyStaticAssets()],

    root: '.',
    // Si GH Pages : on utilise le dossier du repo, sinon racine (Netlify / Local)
    base: isGitHubPages ? '/technodocs/' : '/',

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      emptyOutDir: false, // dist/src verrouillé sur Windows — nettoyage des assets dans closeBundle

      rollupOptions: {
        input: (function collectHtmlInputs() {
          // ... (votre fonction collectHtmlInputs inchangée)
          const inputs = {};
          const root = resolve(__dirname);
          function scanDirectory(dir) {
            try {
              const entries = readdirSync(dir, { withFileTypes: true });
              for (const entry of entries) {
                const fullPath = join(dir, entry.name);
                if (entry.isDirectory()) {
                  if (!['node_modules', 'dist', '.git', 'scripts', '.claude', '.netlify'].includes(entry.name)) {
                    scanDirectory(fullPath);
                  }
                } else if (entry.name.endsWith('.html')) {
                  const relativePath = relative(root, fullPath);
                  const key = relativePath
                    .replace(/\.html$/i, '')
                    .replace(/[\\/]/g, '-')
                    .replace(/^src-/, '');
                  inputs[key || 'index'] = fullPath;
                }
              }
            } catch (e) {
              console.error(`Erreur scan ${dir}:`, e.message);
            }
          }
          scanDirectory(root);
          return inputs;
        })(),
      },

      copyPublicDir: true,
    },

    server: {
      port: 3001,
      open: false,
    },

    preview: {
      port: 4173,
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@css': resolve(__dirname, 'src/css'),
        '@js': resolve(__dirname, 'src/js'),
        '@images': resolve(__dirname, 'src/images'),
      },
    },

    publicDir: 'public',
  };
});
