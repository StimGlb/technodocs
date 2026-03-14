#!/usr/bin/env node
/*
  scripts/check-dist.js

  Vérifie qu'une page construite dans `dist/` existe et que les assets référencés
  (CSS/JS/modulepreload) sont bien présents dans le bundle `dist/`.

  Usage:
    node scripts/check-dist.js
    node scripts/check-dist.js --page=dist/src/pages/exercices/exercices-dnb-ost-fiche01.html
    node scripts/check-dist.js --dist=./dist --page=src/pages/exercices/exercices-dnb-ost-fiche01.html

  Le script écrit un fichier JSON de rapport dans `dist/check-dist-report.json`.
*/

import fs from "fs";
import path from "path";

const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.split("=");
    return [k.replace(/^--/, ""), v === undefined ? true : v];
  }),
);

const projectRoot = process.cwd();
const distDir = path.resolve(argv.dist || path.join(projectRoot, "dist"));
const defaultPage = "src/pages/exercices/exercices-dnb-ost-fiche01.html";
const pageArg = argv.page || path.join(distDir, defaultPage);
const pagePath = path.resolve(
  pageArg.startsWith(distDir) ? pageArg : path.join(distDir, pageArg),
);

function extractUrls(html) {
  const urls = new Set();
  // href and src attributes
  const attrRe = /(?:href|src)="([^"]+)"/g;
  let m;
  while ((m = attrRe.exec(html)) !== null) {
    urls.add(m[1]);
  }
  return Array.from(urls);
}

function isExternal(u) {
  return /^https?:\/\//i.test(u) || /^\/\//.test(u);
}

function resolveToDist(u) {
  // ignore data: and mailto: etc
  if (/^[a-z]+:/i.test(u) && !u.startsWith("/")) return null;
  // strip query/hash
  const clean = u.split("?")[0].split("#")[0];
  // if leading slash, remove it to resolve relative to dist root
  if (clean.startsWith("/")) return path.join(distDir, clean.slice(1));
  return path.join(distDir, clean);
}

async function main() {
  const report = {
    checkedAt: new Date().toISOString(),
    page: pagePath,
    distDir,
    filesChecked: [],
    missing: [],
    externals: [],
    summary: {},
  };

  if (!fs.existsSync(distDir)) {
    console.error("ERROR: dist directory not found:", distDir);
    process.exitCode = 2;
    report.summary.ok = false;
    fs.writeFileSync(
      path.join(process.cwd(), "dist", "check-dist-report.json"),
      JSON.stringify(report, null, 2),
    );
    return;
  }

  if (!fs.existsSync(pagePath)) {
    console.error("ERROR: page not found in dist:", pagePath);
    report.missing.push({ type: "page", path: pagePath });
    report.summary.ok = false;
    fs.writeFileSync(
      path.join(distDir, "check-dist-report.json"),
      JSON.stringify(report, null, 2),
    );
    process.exitCode = 1;
    return;
  }

  const html = fs.readFileSync(pagePath, "utf8");
  const urls = extractUrls(html);

  for (const u of urls) {
    if (isExternal(u)) {
      report.externals.push(u);
      continue;
    }
    const resolved = resolveToDist(u);
    if (!resolved) {
      report.filesChecked.push({ url: u, status: "ignored" });
      continue;
    }
    const exists = fs.existsSync(resolved);
    report.filesChecked.push({ url: u, path: resolved, exists });
    if (!exists) report.missing.push({ url: u, path: resolved });
  }

  report.summary.ok = report.missing.length === 0;
  fs.writeFileSync(
    path.join(distDir, "check-dist-report.json"),
    JSON.stringify(report, null, 2),
  );

  // Human-friendly output
  console.log("\nDist check report for page:", pagePath);
  console.log("Dist directory:", distDir, "\n");

  if (report.externals.length)
    console.log("External resources (not checked locally):", report.externals);

  const good = report.filesChecked.filter((f) => f.exists).length;
  const total = report.filesChecked.length;
  console.log(`Assets checked: ${good} / ${total}`);

  if (report.missing.length) {
    console.log("\nMISSING FILES:");
    report.missing.forEach((m) => console.log("-", m.url, "->", m.path));
    console.log(
      "\nReport written to",
      path.join(distDir, "check-dist-report.json"),
    );
    process.exitCode = 1;
  } else {
    console.log("All referenced local assets exist in dist/.");
    console.log(
      "\nReport written to",
      path.join(distDir, "check-dist-report.json"),
    );
    process.exitCode = 0;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 3;
});
