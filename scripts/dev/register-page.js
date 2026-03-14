#!/usr/bin/env node

/**
 * register-page.js
 * Script pour ajouter une page à _dev.html à partir d'un chemin local.
 * Usage: node scripts/register-page.js "Mon Titre" "src/pages/mon-chemin.html" [section]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEV_FILE = path.join(ROOT, "_dev.html");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function normalizeWebPath(rawPath) {
  let webPath = String(rawPath || "").replace(/\\/g, "/");
  if (!webPath.startsWith("/")) webPath = "/" + webPath;
  if (!webPath.startsWith("/src/")) {
    if (webPath.includes("/pages/")) {
      webPath = "/src" + webPath.substring(webPath.indexOf("/pages/"));
    } else {
      throw new Error(
        "Le chemin doit pointer vers un fichier dans /src/pages/",
      );
    }
  }
  return webPath;
}

export function detectSectionFromPath(webPath) {
  if (webPath.includes("/cours/")) return "Cours";
  if (webPath.includes("/corrections/")) return "Corrections";
  if (webPath.includes("/activites/")) return "Activités";
  if (webPath.includes("/flashcards/")) return "Flashcards";
  if (webPath.includes("/projets/")) return "Projets";
  if (webPath.includes("/quiz/")) return "Quiz";
  if (webPath.includes("/outils/")) return "Outils";
  if (webPath.includes("/ressources/")) return "Ressources";
  if (webPath.includes("/revisions/")) return "Révisions";
  if (webPath.includes("/exercices/")) return "Exercices";
  return "Autres";
}

export function addPageToDevRegistry({
  name,
  rawPath,
  section,
  status = "ready",
  tag,
}) {
  const webPath = normalizeWebPath(rawPath);
  const resolvedSection = section || detectSectionFromPath(webPath);

  if (!fs.existsSync(DEV_FILE)) {
    throw new Error(`Fichier ${DEV_FILE} introuvable.`);
  }

  let content = fs.readFileSync(DEV_FILE, "utf8");
  const pathRegex = new RegExp(`path:\\s*\"${escapeRegExp(webPath)}\"`, "m");
  if (pathRegex.test(content)) {
    return {
      added: false,
      reason: "exists",
      webPath,
      section: resolvedSection,
    };
  }

  const marker = "//  NOUVELLES PAGES (ajouter ici ↓)";
  if (!content.includes(marker)) {
    throw new Error("Marqueur d'insertion introuvable dans _dev.html");
  }

  const tagLine = tag ? `\n      tag: \"${tag}\",` : "";
  const entry = [
    "    {",
    `      section: \"${resolvedSection}\",`,
    `      name: \"${name}\",`,
    `      path: \"${webPath}\",`,
    `      status: \"${status}\",${tagLine}`,
    "    },",
  ]
    .join("\n")
    .replace(/,\n\n/, ",\n");

  content = content.replace(marker, `${marker}\n${entry}`);
  fs.writeFileSync(DEV_FILE, content, "utf8");

  return { added: true, webPath, section: resolvedSection };
}

function runCli() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log(
      "\x1b[33m%s\x1b[0m",
      'Usage: node scripts/register-page.js "Nom de la Page" "chemin/vers/fichier.html" ["Section"]',
    );
    process.exit(1);
  }

  const [name, rawPath, section] = args;

  try {
    const result = addPageToDevRegistry({ name, rawPath, section });
    if (!result.added) {
      console.log(
        "\x1b[33m%s\x1b[0m",
        `La page avec le chemin "${result.webPath}" est déjà enregistrée.`,
      );
      process.exit(0);
    }

    console.log(
      "\x1b[32m%s\x1b[0m",
      `✅ Succès: "${name}" ajouté à la section "${result.section}" dans _dev.html`,
    );
  } catch (err) {
    console.error("\x1b[31m%s\x1b[0m", "Erreur:", err.message);
    process.exit(1);
  }
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  runCli();
}
