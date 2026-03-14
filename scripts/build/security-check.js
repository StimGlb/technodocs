#!/usr/bin/env node

/**
 * Script de vérification de sécurité pour TechnoDocs
 * Usage: node security-check.js [URL]
 * Exemple: node security-check.js https://technodocs.netlify.app
 */

import https from "https";
import http from "http";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const TARGET_URL = process.argv[2] || "http://localhost:5173";
const COLORS = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
  reset: "\x1b[0m",
};

// Résultats
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let warnings = 0;

// Utilitaires
function log(message, color = "reset") {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function success(test) {
  totalTests++;
  passedTests++;
  log(`✓ ${test}`, "green");
}

function fail(test, details = "") {
  totalTests++;
  failedTests++;
  log(`✗ ${test}`, "red");
  if (details) log(`  → ${details}`, "red");
}

function warn(test, details = "") {
  totalTests++;
  warnings++;
  log(`⚠ ${test}`, "yellow");
  if (details) log(`  → ${details}`, "yellow");
}

function parseUrl(url) {
  const urlObj = new URL(url);
  return {
    protocol: urlObj.protocol,
    hostname: urlObj.hostname,
    port: urlObj.port || (urlObj.protocol === "https:" ? 443 : 80),
    path: urlObj.pathname,
  };
}

// Fonction pour faire une requête HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const urlInfo = parseUrl(url);
    const client = urlInfo.protocol === "https:" ? https : http;

    const options = {
      hostname: urlInfo.hostname,
      port: urlInfo.port,
      path: urlInfo.path,
      method: "GET",
      headers: {
        "User-Agent": "TechnoDocs-Security-Checker/1.0",
      },
    };

    const req = client.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () =>
        resolve({
          headers: res.headers,
          body: data,
          statusCode: res.statusCode,
        }),
      );
    });

    req.on("error", reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });

    req.end();
  });
}

// Tests de sécurité

async function checkSecurityHeaders(url) {
  log("\n📋 Vérification des headers de sécurité HTTP...", "blue");

  try {
    const { headers } = await makeRequest(url);

    // CSP
    if (headers["content-security-policy"]) {
      const csp = headers["content-security-policy"];
      if (csp.includes("default-src") && csp.includes("script-src")) {
        success("Content-Security-Policy configurée");

        // Vérifications détaillées
        if (csp.includes("'unsafe-inline'")) {
          warn("CSP autorise unsafe-inline", "Risque XSS accru");
        }
        if (csp.includes("'unsafe-eval'")) {
          fail("CSP autorise unsafe-eval", "Danger: permet eval()");
        }
      } else {
        warn("CSP incomplète", "Manque default-src ou script-src");
      }
    } else {
      fail("Content-Security-Policy absente", "Protection XSS manquante");
    }

    // HSTS
    if (headers["strict-transport-security"]) {
      const hsts = headers["strict-transport-security"];
      if (hsts.includes("max-age=")) {
        const maxAge = parseInt(hsts.match(/max-age=(\d+)/)?.[1] || "0");
        if (maxAge >= 31536000) {
          success("HSTS configuré (>= 1 an)");
        } else {
          warn("HSTS trop court", `${maxAge} secondes < 1 an recommandé`);
        }
      }
    } else if (url.startsWith("https://")) {
      warn("HSTS absent", "Recommandé pour les sites HTTPS");
    }

    // X-Frame-Options
    if (headers["x-frame-options"]) {
      const xfo = headers["x-frame-options"].toUpperCase();
      if (xfo === "DENY" || xfo === "SAMEORIGIN") {
        success(`X-Frame-Options: ${xfo}`);
      } else {
        warn("X-Frame-Options invalide", `Valeur: ${xfo}`);
      }
    } else {
      fail("X-Frame-Options absent", "Risque de clickjacking");
    }

    // X-Content-Type-Options
    if (headers["x-content-type-options"] === "nosniff") {
      success("X-Content-Type-Options: nosniff");
    } else {
      fail("X-Content-Type-Options absent", "Risque MIME sniffing");
    }

    // Referrer-Policy
    if (headers["referrer-policy"]) {
      success(`Referrer-Policy: ${headers["referrer-policy"]}`);
    } else {
      warn("Referrer-Policy absent", "Fuite potentielle d'URLs");
    }

    // Permissions-Policy
    if (headers["permissions-policy"]) {
      success("Permissions-Policy configurée");
    } else {
      warn("Permissions-Policy absente", "Recommandé pour limiter les APIs");
    }
  } catch (error) {
    fail("Impossible de récupérer les headers", error.message);
  }
}

async function checkHTMLSecurity(url) {
  log("\n🔍 Vérification du code HTML...", "blue");

  try {
    const { body } = await makeRequest(url);

    // Vérification des scripts inline
    const inlineScripts = body.match(/<script(?![^>]*src=)[^>]*>/gi);
    if (inlineScripts && inlineScripts.length > 0) {
      warn(
        `${inlineScripts.length} script(s) inline détecté(s)`,
        "Incompatible avec CSP strict",
      );
    } else {
      success("Pas de scripts inline");
    }

    // Vérification des styles inline
    const inlineStyles = body.match(/<style>/gi);
    if (inlineStyles && inlineStyles.length > 0) {
      warn(
        `${inlineStyles.length} style(s) inline détecté(s)`,
        "Peut nécessiter unsafe-inline en CSP",
      );
    } else {
      success("Pas de styles inline critiques");
    }

    // Vérification des event handlers inline
    const inlineHandlers = body.match(/\s(on\w+)=/gi);
    if (inlineHandlers && inlineHandlers.length > 0) {
      fail(
        `${inlineHandlers.length} handler(s) inline détecté(s)`,
        "onclick, onload, etc. incompatibles CSP",
      );
    } else {
      success("Pas de handlers inline (onclick, etc.)");
    }

    // Vérification des liens externes
    const externalLinks = body.match(
      /<a[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi,
    );
    if (externalLinks) {
      let unsafeLinks = 0;
      externalLinks.forEach((link) => {
        if (
          !link.includes('rel="noopener"') &&
          !link.includes("rel='noopener'")
        ) {
          unsafeLinks++;
        }
      });

      if (unsafeLinks > 0) {
        warn(
          `${unsafeLinks} lien(s) externe(s) sans rel="noopener"`,
          "Risque de tabnabbing",
        );
      } else {
        success('Tous les liens externes ont rel="noopener"');
      }
    }

    // Vérification des iframes
    const iframes = body.match(/<iframe/gi);
    if (iframes && iframes.length > 0) {
      warn(
        `${iframes.length} iframe(s) détectée(s)`,
        "Vérifier sandbox et permissions",
      );
    } else {
      success("Pas d'iframes");
    }
  } catch (error) {
    fail("Impossible d'analyser le HTML", error.message);
  }
}

async function checkJavaScriptSecurity() {
  log("\n💻 Vérification du code JavaScript...", "blue");

  try {
    const projectRoot = process.cwd();

    // Try common locations: dist/js/* or dist/assets/*.js
    const possibleJs = [];
    const distJsDir = join(projectRoot, "dist", "js");
    const distAssetsDir = join(projectRoot, "dist", "assets");

    try {
      const { readdirSync } = await import("fs");
      if (readdirSync(distJsDir)) {
        readdirSync(distJsDir)
          .filter((f) => f.endsWith(".js"))
          .forEach((f) => possibleJs.push(join(distJsDir, f)));
      }
    } catch {}

    try {
      const { readdirSync } = await import("fs");
      if (readdirSync(distAssetsDir)) {
        readdirSync(distAssetsDir)
          .filter((f) => f.endsWith(".js"))
          .forEach((f) => possibleJs.push(join(distAssetsDir, f)));
      }
    } catch {}

    const jsFiles = possibleJs.length
      ? possibleJs
      : [
          join(projectRoot, "dist", "js", "app.js"),
          join(projectRoot, "dist", "js", "components.js"),
        ];

    for (const filePath of jsFiles) {
      try {
        const content = readFileSync(filePath, "utf-8");

        // Patterns dangereux
        const dangerousPatterns = [
          { pattern: /eval\s*\(/g, name: "eval()" },
          { pattern: /innerHTML\s*=/g, name: "innerHTML" },
          { pattern: /document\.write\s*\(/g, name: "document.write()" },
          {
            pattern: /dangerouslySetInnerHTML/g,
            name: "dangerouslySetInnerHTML",
          },
          { pattern: /new\s+Function\s*\(/g, name: "new Function()" },
          {
            pattern: /setTimeout\s*\(\s*["'`]/g,
            name: "setTimeout avec string",
          },
          {
            pattern: /setInterval\s*\(\s*["'`]/g,
            name: "setInterval avec string",
          },
        ];

        let fileHasIssues = false;
        dangerousPatterns.forEach(({ pattern, name }) => {
          const matches = content.match(pattern);
          if (matches) {
            fail(
              `${name} détecté dans ${filePath}`,
              `${matches.length} occurrence(s)`,
            );
            fileHasIssues = true;
          }
        });

        if (!fileHasIssues) {
          success(`${filePath} - Pas de patterns dangereux`);
        }

        // Vérification console.log en production
        if (content.includes("console.log") && !content.includes("localhost")) {
          warn(
            `console.log sans check localhost dans ${filePath}`,
            "Peut exposer des infos en prod",
          );
        }
      } catch (err) {
        warn(`Impossible de lire ${filePath}`, err.message);
      }
    }
  } catch (error) {
    fail("Erreur lors de la vérification JS", error.message);
  }
}

async function checkDependencies() {
  log("\n📦 Vérification des dépendances...", "blue");

  try {
    const projectRoot = process.cwd();
    const packageJson = JSON.parse(
      readFileSync(join(projectRoot, "package.json"), "utf-8"),
    );

    const allDeps = {
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {}),
    };

    const depCount = Object.keys(allDeps).length;

    if (depCount === 0) {
      warn("Aucune dépendance trouvée", "Vérifier package.json");
    } else if (depCount < 5) {
      success(`Surface d'attaque réduite (${depCount} dépendance(s))`);
    } else if (depCount < 20) {
      warn(`${depCount} dépendances`, "Vérifier régulièrement npm audit");
    } else {
      warn(`${depCount} dépendances`, "Surface d'attaque élevée");
    }

    // Vérifier package-lock.json
    try {
      readFileSync(join(projectRoot, "package-lock.json"));
      success("package-lock.json présent");
    } catch {
      warn("package-lock.json absent", "Créer avec: npm i --package-lock-only");
    }
  } catch (error) {
    warn("Impossible de lire package.json", error.message);
  }
}

function checkFilesSecurity() {
  log("\n📁 Vérification des fichiers sensibles...", "blue");

  const projectRoot = process.cwd();

  const sensitiveFiles = [
    ".env",
    ".env.local",
    ".env.production",
    "credentials.json",
    "secrets.json",
    "config/secrets.yml",
    "private.key",
    ".aws/credentials",
  ];

  let foundSensitive = false;
  sensitiveFiles.forEach((file) => {
    try {
      readFileSync(join(projectRoot, file));
      fail(`Fichier sensible détecté: ${file}`, "Ajouter au .gitignore");
      foundSensitive = true;
    } catch {
      // Fichier n'existe pas, c'est bon
    }
  });

  if (!foundSensitive) {
    success("Pas de fichiers sensibles exposés");
  }

  // Vérifier .gitignore
  try {
    const gitignore = readFileSync(join(projectRoot, ".gitignore"), "utf-8");
    if (gitignore.includes(".env")) {
      success(".gitignore protège les fichiers .env");
    } else {
      warn(".env non listé dans .gitignore", "Ajouter .env*");
    }
  } catch {
    warn(".gitignore absent", "Créer un .gitignore");
  }
}

// Rapport final
function printReport() {
  log("\n" + "=".repeat(60), "blue");
  log("📊 RAPPORT DE SÉCURITÉ", "blue");
  log("=".repeat(60), "blue");

  log(`\nTotal de tests: ${totalTests}`);
  log(`✓ Réussis: ${passedTests}`, "green");
  log(`⚠ Avertissements: ${warnings}`, "yellow");
  log(`✗ Échecs: ${failedTests}`, "red");

  const score = Math.round((passedTests / totalTests) * 100);
  log(
    `\n🎯 Score de sécurité: ${score}%`,
    score >= 80 ? "green" : score >= 60 ? "yellow" : "red",
  );

  if (failedTests === 0 && warnings === 0) {
    log("\n🎉 Excellent ! Aucun problème détecté.", "green");
  } else if (failedTests === 0) {
    log(
      "\n👍 Bon niveau de sécurité. Quelques optimisations possibles.",
      "yellow",
    );
  } else {
    log(
      "\n⚠️  Des problèmes de sécurité ont été détectés. Corriger les échecs.",
      "red",
    );
  }

  log("\n💡 Recommandations:", "blue");
  log("  1. Tester régulièrement avec: node security-check.js");
  log("  2. Scanner avec: https://securityheaders.com/");
  log("  3. Vérifier les dépendances: npm audit");
  log("  4. Relire SECURITY.md pour les bonnes pratiques\n");
}

// Exécution principale
async function main() {
  log("🔒 TechnoDocs - Vérification de sécurité", "blue");
  log(`🌐 Cible: ${TARGET_URL}\n`, "blue");

  await checkSecurityHeaders(TARGET_URL);
  await checkHTMLSecurity(TARGET_URL);
  await checkJavaScriptSecurity();
  await checkDependencies();
  checkFilesSecurity();

  printReport();

  // Exit code
  process.exit(failedTests > 0 ? 1 : 0);
}

main().catch((error) => {
  log(`\n❌ Erreur fatale: ${error.message}`, "red");
  process.exit(1);
});
