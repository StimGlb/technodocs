#!/usr/bin/env node
/**
 * netlify-clean.js — Nettoyage des anciens deploys Netlify
 *
 * Usage:
 *   node scripts/netlify-clean.js [options]
 *   npm run clean:previews [-- options]
 *
 * Options:
 *   --keep=N        Garder N deploys récents (défaut: 5)
 *   --context=NAME  deploy-preview | branch-deploy | all (défaut: deploy-preview)
 *   --branch=NAME   Filtrer par branche (ex: --branch=dev)
 *   --dry-run       Simulation — affiche sans supprimer
 *   --help, -h      Aide
 *
 * Auth (par ordre de priorité) :
 *   1. Variable d'env  NETLIFY_AUTH_TOKEN
 *   2. Fichier Netlify CLI  ~/.netlify/config.json  (si netlify login a été fait)
 *
 * Site ID (par ordre de priorité) :
 *   1. Variable d'env  NETLIFY_SITE_ID
 *   2. Fichier  .netlify/state.json  (généré par netlify link)
 *   3. Sortie de  netlify status
 */

import { request } from 'https';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');

// ─── Chargement du .env projet (sans dépendance externe) ─────────────────────

const envPath = join(ROOT, '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !(key in process.env)) process.env[key] = val;
  }
}

// ─── Args ─────────────────────────────────────────────────────────────────────

const args   = process.argv.slice(2);
const DRY_RUN  = args.includes('--dry-run');
const HELP     = args.includes('--help') || args.includes('-h');
const KEEP     = parseInt(args.find(a => a.startsWith('--keep='))?.split('=')[1] ?? '5');
const CONTEXT  = args.find(a => a.startsWith('--context='))?.split('=')[1] ?? 'deploy-preview';
const BRANCH   = args.find(a => a.startsWith('--branch='))?.split('=')[1];

if (HELP) {
  console.log(`
netlify-clean.js — Nettoyage des anciens deploys Netlify

Usage:
  node scripts/netlify-clean.js [options]
  npm run clean:previews [-- options]

Options:
  --keep=N        Garder N deploys récents              (défaut: 5)
  --context=NAME  deploy-preview | branch-deploy | all  (défaut: deploy-preview)
  --branch=NAME   Filtrer par branche (ex: --branch=dev)
  --dry-run       Simulation — affiche sans supprimer
  --help, -h      Afficher cette aide

Exemples:
  node scripts/netlify-clean.js --dry-run
  node scripts/netlify-clean.js --keep=3
  node scripts/netlify-clean.js --context=all --keep=2
  node scripts/netlify-clean.js --branch=dev --keep=1 --dry-run
`);
  process.exit(0);
}

// ─── Auth & Site ID ───────────────────────────────────────────────────────────

function getToken() {
  // 1. Variable d'environnement (ou .env)
  if (process.env.NETLIFY_AUTH_TOKEN) return process.env.NETLIFY_AUTH_TOKEN;

  // 2. Config du Netlify CLI — chemins possibles selon l'OS
  const home = homedir();
  const candidates = [
    // Windows : %APPDATA%\netlify\Config\config.json  (Conf package, capital C)
    process.env.APPDATA && join(process.env.APPDATA, 'netlify', 'Config', 'config.json'),
    // Linux / WSL
    join(home, '.config', 'netlify', 'config.json'),
    // macOS
    join(home, 'Library', 'Preferences', 'netlify', 'config.json'),
    // Fallback générique
    join(home, '.netlify', 'config.json'),
  ].filter(Boolean);

  for (const configPath of candidates) {
    if (!existsSync(configPath)) continue;
    try {
      const config = JSON.parse(readFileSync(configPath, 'utf-8'));
      const firstUser = Object.values(config.users ?? {})[0];
      if (firstUser?.auth?.token) return firstUser.auth.token;
    } catch { /* ignore */ }
  }

  return null;
}

function getSiteId() {
  // 1. Variable d'environnement
  if (process.env.NETLIFY_SITE_ID) return process.env.NETLIFY_SITE_ID;

  // 2. Fichier de liaison .netlify/state.json (netlify link)
  const statePath = join(ROOT, '.netlify', 'state.json');
  if (existsSync(statePath)) {
    try {
      const { siteId } = JSON.parse(readFileSync(statePath, 'utf-8'));
      if (siteId) return siteId;
    } catch { /* ignore */ }
  }

  // 3. Sortie de `netlify status` (pas de JSON passé au shell → pas de problème de quotes)
  const result = spawnSync('netlify', ['status'], { encoding: 'utf-8', shell: true });
  const match  = result.stdout?.match(/Site Id:\s*([a-f0-9-]+)/i);
  if (match) return match[1];

  return null;
}

// ─── API REST Netlify (sans shell, sans quoting issues) ───────────────────────

function netlifyRequest(method, path, token) {
  return new Promise((resolve, reject) => {
    const req = request(
      {
        hostname: 'api.netlify.com',
        path:     `/api/v1${path}`,
        method,
        headers:  { Authorization: `Bearer ${token}` },
      },
      (res) => {
        // 204 No Content = succès sans corps (ex: DELETE)
        if (res.statusCode === 204) return resolve(null);

        let body = '';
        res.on('data', chunk => (body += chunk));
        res.on('end', () => {
          if (res.statusCode >= 400) {
            return reject(new Error(`HTTP ${res.statusCode} — ${path}\n${body}`));
          }
          try { resolve(JSON.parse(body)); }
          catch { resolve(body); }
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function fetchAllDeploys(siteId, token) {
  let all = [], page = 1;
  while (true) {
    const batch = await netlifyRequest(
      'GET',
      `/sites/${siteId}/deploys?per_page=100&page=${page}`,
      token
    );
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    process.stdout.write('.');
    if (batch.length < 100) break;
    page++;
  }
  return all;
}

async function deleteDeploy(deployId, token) {
  return netlifyRequest('DELETE', `/deploys/${deployId}`, token);
}

// ─── Formatage ────────────────────────────────────────────────────────────────

function fmt(iso) {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function stateTag(state) {
  const map = { ready: 'OK   ', error: 'ERR  ', building: 'BUILD', processing: 'PROC ' };
  return map[state] ?? state.slice(0, 5).padEnd(5);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const token  = getToken();
const siteId = getSiteId();

if (!token) {
  console.error(
    'Token Netlify introuvable.\n' +
    '  › Définir NETLIFY_AUTH_TOKEN dans .env\n' +
    '  › Ou vous authentifier : netlify login'
  );
  process.exit(1);
}

if (!siteId) {
  console.error(
    'Site ID introuvable.\n' +
    '  › Définir NETLIFY_SITE_ID dans .env\n' +
    '  › Ou lier le site : netlify link'
  );
  process.exit(1);
}

const contexts     = CONTEXT === 'all' ? ['deploy-preview', 'branch-deploy'] : [CONTEXT];
const contextLabel = contexts.join(' + ');

console.log('─'.repeat(60));
console.log('  netlify-clean');
console.log('─'.repeat(60));
console.log(`  Site     : ${siteId}`);
console.log(`  Contexte : ${contextLabel}`);
console.log(`  Conserver: ${KEEP} plus récent(s)${BRANCH ? ` (branche: ${BRANCH})` : ''}`);
if (DRY_RUN) console.log('  Mode     : DRY-RUN (simulation)');
console.log('─'.repeat(60) + '\n');

process.stdout.write('Récupération des deploys');
let all;
try {
  all = await fetchAllDeploys(siteId, token);
} catch (err) {
  console.error(`\nErreur API : ${err.message}`);
  process.exit(1);
}
console.log(` ${all.length} deploy(s) au total\n`);

// Filtre contexte + branche optionnelle
let candidates = all.filter(d => contexts.includes(d.context));
if (BRANCH) candidates = candidates.filter(d => d.branch === BRANCH);

// Tri chronologique inversé (plus récent en premier)
candidates.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

const toKeep   = candidates.slice(0, KEEP);
const toDelete = candidates.slice(KEEP);

console.log(`Deploys [${contextLabel}]${BRANCH ? ` [${BRANCH}]` : ''} : ${candidates.length}`);
console.log(`  › A conserver  : ${toKeep.length}`);
console.log(`  › A supprimer  : ${toDelete.length}\n`);

if (toDelete.length === 0) {
  console.log('Rien a nettoyer. Bye!');
  process.exit(0);
}

// Affichage des candidats à la suppression
console.log('Deploys a supprimer :');
toDelete.forEach((d, i) => {
  const url = d.deploy_url ? `  ${d.deploy_url}` : '';
  console.log(
    `  ${String(i + 1).padStart(2)}. [${fmt(d.created_at)}] ` +
    `${d.id.slice(0, 10)}… ${stateTag(d.state)} ${d.branch}${url}`
  );
});

if (DRY_RUN) {
  console.log('\nDRY-RUN termine — relancer sans --dry-run pour supprimer.');
  process.exit(0);
}

// Suppression
console.log('\nSuppression en cours...');
let ok = 0, ko = 0;

for (const deploy of toDelete) {
  const label = `[${fmt(deploy.created_at)}] ${deploy.id.slice(0, 10)}… ${deploy.branch}`;
  try {
    await deleteDeploy(deploy.id, token);
    console.log(`  OK    ${label}`);
    ok++;
  } catch (err) {
    console.log(`  ECHEC ${label}  (${err.message.split('\n')[0]})`);
    ko++;
  }
}

console.log('\n' + '─'.repeat(60));
console.log(`  Supprimes : ${ok} | Echecs : ${ko}`);
console.log('─'.repeat(60));

if (ko > 0) process.exit(1);
