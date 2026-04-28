import fs from 'fs';

// CONFIGURATION
const SESSION_NOTE_PATH = 'E:/Data/Documents/Obsidian/glb-workspace/50_DEV/Page-prepa-metiers-dev-plan-3pm.md';

/**
 * Met à jour le Frontmatter YAML d'une note Obsidian pour refléter l'état du build.
 * @param {string} status - "success" | "failed"
 * @param {string} error - Message d'erreur (optionnel)
 */
function updateSessionDashboard(status, error = "") {
    if (!fs.existsSync(SESSION_NOTE_PATH)) {
        console.error(`Fichier non trouvé : ${SESSION_NOTE_PATH}`);
        return;
    }

    let content = fs.readFileSync(SESSION_NOTE_PATH, 'utf8');
    const now = new Date().toISOString();
    
    const yamlRegex = /^---([\s\S]*?)---/;
    const match = content.match(yamlRegex);

    const buildData = {
        last_build_status: status === "success" ? "success" : "failed",
        last_build_attempt: now,
        last_error: error ? error.replace(/"/g, "'").substring(0, 200) : "",
        blocking_phase: status === "success" ? "none" : "Phase 1 - Build"
    };

    if (match) {
        let yaml = match[1];
        
        // Mise à jour ou ajout des clés
        Object.entries(buildData).forEach(([key, value]) => {
            const keyRegex = new RegExp(`(${key}:).*`, 'g');
            if (yaml.match(keyRegex)) {
                yaml = yaml.replace(keyRegex, `$1 "${value}"`);
            } else {
                yaml += `\n${key}: "${value}"`;
            }
        });
        
        content = content.replace(yamlRegex, `---${yaml}\n---`);
    } else {
        // Création du bloc YAML si absent
        let newYaml = "---\n";
        Object.entries(buildData).forEach(([key, value]) => {
            newYaml += `${key}: "${value}"\n`;
        });
        newYaml += "---\n\n";
        content = newYaml + content;
    }

    fs.writeFileSync(SESSION_NOTE_PATH, content, 'utf8');
    console.log(`🟢 Dashboard Obsidian mis à jour : Build ${status.toUpperCase()}`);
}

// CLI Entry point
const status = process.argv[2] || "failed";
const errorMsg = process.argv[3] || "";
updateSessionDashboard(status, errorMsg);
