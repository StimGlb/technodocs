#!/usr/bin/env node
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

function run(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
      ...opts,
    });
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d.toString()));
    child.stderr.on("data", (d) => (err += d.toString()));
    child.on("close", (code) => resolve({ code, out, err }));
  });
}

async function main() {
  const projectRoot = process.cwd();
  const distDir = path.join(projectRoot, "dist");
  const report = { startedAt: new Date().toISOString(), steps: [] };

  // 1) Build
  console.log("1/4 — Running `npm run build`");
  const build = await run("npm", ["run", "build"]);
  report.steps.push({
    name: "npm run build",
    code: build.code,
    out: build.out.slice(0, 2000),
    err: build.err.slice(0, 2000),
  });

  // 2) Dist check
  console.log("2/4 — Running `node ./scripts/build/check-dist.js`");
  const check = await run("node", ["./scripts/build/check-dist.js"]);
  report.steps.push({
    name: "check-dist",
    code: check.code,
    out: check.out.slice(0, 2000),
    err: check.err.slice(0, 2000),
  });

  // 3) Security check (if available)
  console.log("3/4 — Running `npm run security-check` (if configured)");
  const sec = await run("npm", ["run", "security-check"]);
  report.steps.push({
    name: "security-check",
    code: sec.code,
    out: sec.out.slice(0, 2000),
    err: sec.err.slice(0, 2000),
  });

  // 4) Git status
  console.log("4/4 — Checking git status for uncommitted changes");
  const git = await run("git", ["status", "--porcelain"]);
  report.steps.push({
    name: "git-status",
    code: git.code,
    out: git.out.slice(0, 2000),
    err: git.err.slice(0, 2000),
  });

  report.endedAt = new Date().toISOString();
  report.summary = {
    buildOk: build.code === 0,
    distCheckOk: check.code === 0,
    securityOk: sec.code === 0,
    gitClean: git.code === 0 && git.out.trim().length === 0,
  };

  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
  const outPath = path.join(distDir, "session-end-report.json");
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log("\nSession end check written to", outPath);

  const overallOk =
    report.summary.buildOk &&
    report.summary.distCheckOk &&
    report.summary.securityOk;
  console.log("\nOverall OK:", overallOk);
  process.exit(overallOk ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
