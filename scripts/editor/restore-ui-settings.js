#!/usr/bin/env node

/**
 * Restore optimized VS Code UI settings
 * Rétablit les paramètres d'interface optimisés
 * Usage: node scripts/editor/restore-ui-settings.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../");
const settingsPath = path.join(projectRoot, ".vscode", "settings.json");

const OPTIMIZED_SETTINGS = {
  "editor.fontSize": 14,
  "editor.lineHeight": 1.6,
  "editor.letterSpacing": 0.5,
  "editor.padding.top": 16,
  "editor.padding.bottom": 16,
  "editor.cursorBlinking": "smooth",
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.lineHeight": 1.5,
  "terminal.integrated.letterSpacing": 0.3,
  "terminal.integrated.padding.left": 12,
  "terminal.integrated.padding.right": 12,
  "workbench.editor.showTabs": "multiple",
  "workbench.sideBar.location": "left",
  "workbench.activityBar.visible": true,
  "workbench.statusBar.visible": true,
  "workbench.editor.tabCloseButton": "right",
  "workbench.editor.tabSizing": "fit",
  "workbench.fontSize": 13,
  "workbench.colorTheme": "Default Dark+",
  "window.titleBarStyle": "native",
};

/**
 * Strip JSON comments to allow parsing JSONC (JSON with Comments)
 */
function stripJsonComments(str) {
  let result = "";
  let i = 0;

  while (i < str.length) {
    if (str[i] === "/" && str[i + 1] === "/") {
      while (i < str.length && str[i] !== "\n") {
        i++;
      }
      result += "\n";
      i++;
    } else if (str[i] === "/" && str[i + 1] === "*") {
      i += 2;
      while (i < str.length - 1 && !(str[i] === "*" && str[i + 1] === "/")) {
        result += str[i] === "\n" ? "\n" : " ";
        i++;
      }
      i += 2;
    } else {
      result += str[i];
      i++;
    }
  }

  return result;
}

function restoreSettings() {
  try {
    // Vérifier que le dossier .vscode existe
    const vscodeDir = path.dirname(settingsPath);
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir, { recursive: true });
      console.log(`📁 Créé: ${vscodeDir}`);
    }

    // Lire les paramètres existants
    let currentSettings = {};
    if (fs.existsSync(settingsPath)) {
      const content = fs.readFileSync(settingsPath, "utf8");
      const cleanedContent = stripJsonComments(content);
      currentSettings = JSON.parse(cleanedContent);
    }

    // Fusionner avec les paramètres optimisés
    const updatedSettings = { ...currentSettings, ...OPTIMIZED_SETTINGS };

    // Écrire les paramètres rétablis
    fs.writeFileSync(
      settingsPath,
      JSON.stringify(updatedSettings, null, 2),
      "utf8",
    );

    console.log("✅ Paramètres d'interface rétablis avec succès !");
    console.log(`📝 Fichier: ${settingsPath}`);
    console.log(
      `⚙️  ${Object.keys(OPTIMIZED_SETTINGS).length} paramètres restaurés`,
    );

    // Afficher un résumé
    console.log("\n📋 Paramètres rétablis:");
    console.log("  Éditeur:");
    console.log("    • Font size: 14px");
    console.log("    • Line height: 1.6");
    console.log("    • Letter spacing: 0.5px");
    console.log("  Terminal:");
    console.log("    • Font size: 13px");
    console.log("    • Line height: 1.5");
    console.log("  Workbench:");
    console.log("    • Tabs: multiple");
    console.log("    • Sidebar: left");
    console.log("    • Activity bar: visible");

    return true;
  } catch (error) {
    console.error(
      "❌ Erreur lors de la restauration des paramètres:",
      error.message,
    );
    process.exit(1);
  }
}

restoreSettings();
