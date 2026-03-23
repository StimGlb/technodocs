#!/usr/bin/env node
/* global process */

/**
 * sync-dev-pages.js
 * Synchronise _dev.html avec les pages HTML modifiées dans le dernier commit.
 * - Ajoute les nouvelles pages absentes de _dev.html
 * - Marque les pages déjà présentes et modifiées avec tag "updated" si aucun tag
 *
 * Usage:
 *   node scripts/sync-dev-pages.js [--dry-run]
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  addPageToDevRegistry,
  normalizeWebPath,
  detectSectionFromPath,
} from "./register-page.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// scripts/dev -> repo root
const ROOT = path.resolve(__dirname, "..", "..");
const DEV_FILE = path.join(ROOT, "_dev.html");
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run") || args.includes("-n");
const SILENT = args.includes("--from-hook");

function color(code, text) {
  return `\x1b[${code}m${text}\x1b[0m`;
}
function info(message) {
  if (SILENT) return;
  console.log(color("36", `[INFO] ${message}`));
}
function ok(message) {
  if (SILENT) return;
  console.log(color("32", `[OK] ${message}`));
}
function err(message) {
  console.error(color("31", `[ERR] ${message}`));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function deriveNameFromPath(webPath) {
  const base = webPath.split("/").pop() || "Nouvelle page";
  const noExt = base.replace(/\.html$/i, "");
  const label = noExt.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();

  if (!label) return "Nouvelle page";
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function parseChangedPagesFromHead() {
  const output = execSync(
    "git diff-tree --no-commit-id --name-status -r HEAD",
    {
      cwd: ROOT,
      encoding: "utf8",
    },
  );

  const paths = [];
  output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const parts = line.split("\t");
      if (parts.length < 2) return;

      const status = parts[0];
      if (status.startsWith("D")) return;

      const candidate =
        status.startsWith("R") || status.startsWith("C") ? parts[2] : parts[1];
      if (!candidate) return;

      const normalized = candidate.replace(/\\/g, "/");
      if (!/^src\/pages\/.+\.html$/i.test(normalized)) return;
      paths.push(normalized);
    });

  return [...new Set(paths)];
}

function isPathRegistered(content, webPath) {
  const pathRegex = new RegExp(`path:\\s*"${escapeRegExp(webPath)}"`, "m");
  return pathRegex.test(content);
}

function markPageAsUpdated(content, webPath) {
  const pathRegex = new RegExp(`path:\\s*"${escapeRegExp(webPath)}"`, "m");
  const pathMatch = pathRegex.exec(content);
  if (!pathMatch) {
    return { content, updated: false, reason: "missing" };
  }

  const pathIndex = pathMatch.index;
  const objectStart = content.lastIndexOf("{", pathIndex);
  const objectEnd = content.indexOf("},", pathIndex);
  if (objectStart === -1 || objectEnd === -1) {
    return { content, updated: false, reason: "bounds" };
  }

  const block = content.slice(objectStart, objectEnd + 2);
  if (/tag:\s*"[^"]+"/m.test(block)) {
    return { content, updated: false, reason: "already-tagged" };
  }

  const statusLineRegex = /(\n\s*status:\s*"[^"]+",\n)/m;
  if (!statusLineRegex.test(block)) {
    return { content, updated: false, reason: "no-status" };
  }

  const updatedBlock = block.replace(
    statusLineRegex,
    `$1      tag: "updated",\n`,
  );
  if (updatedBlock === block) {
    return { content, updated: false, reason: "unchanged" };
  }

  const nextContent =
    content.slice(0, objectStart) + updatedBlock + content.slice(objectEnd + 2);

  return { content: nextContent, updated: true, reason: "ok" };
}

function run() {
  if (!fs.existsSync(DEV_FILE)) {
    throw new Error("_dev.html introuvable à la racine du projet.");
  }

  const changedPages = parseChangedPagesFromHead();
  if (changedPages.length === 0) {
    info("Aucune page HTML dans src/pages modifiée dans le dernier commit.");
    return;
  }

  info(`${changedPages.length} page(s) détectée(s) dans le dernier commit.`);

  let added = 0;
  let flaggedUpdated = 0;
  let alreadyTagged = 0;

  for (const filePath of changedPages) {
    const webPath = normalizeWebPath(filePath);
    const currentContent = fs.readFileSync(DEV_FILE, "utf8");

    if (!isPathRegistered(currentContent, webPath)) {
      const name = deriveNameFromPath(webPath);
      const section = detectSectionFromPath(webPath);

      if (DRY_RUN) {
        info(`[dry-run] ajout: ${webPath} (${section})`);
      } else {
        addPageToDevRegistry({
          name,
          rawPath: filePath,
          section,
          status: "ready",
          tag: "new",
        });
      }
      added += 1;
      continue;
    }

    const {
      content: nextContent,
      updated,
      reason,
    } = markPageAsUpdated(currentContent, webPath);

    if (updated) {
      if (DRY_RUN) {
        info(`[dry-run] tag updated: ${webPath}`);
      } else {
        fs.writeFileSync(DEV_FILE, nextContent, "utf8");
      }
      flaggedUpdated += 1;
    } else if (reason === "already-tagged") {
      alreadyTagged += 1;
    }
  }

  ok(
    `Sync terminée: ${added} ajout(s), ${flaggedUpdated} modifiée(s) taguée(s), ${alreadyTagged} déjà taguée(s).`,
  );
}

try {
  run();
} catch (error) {
  err(error.message);
  process.exit(1);
}
