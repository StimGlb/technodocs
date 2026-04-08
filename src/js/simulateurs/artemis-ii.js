/* ============================================================
   ARTEMIS II — Simulateur de trajectoire (Canvas API)
   TechnoDocs — Activité pédagogique — Avril 2026

   Architecture :
     1. PHASES         — tableau des phases de mission avec données télémétrie
     2. TRAJECTORY_PTS — points de contrôle de la figure de 8 (normalisés)
     3. catmullRom()   — interpolation lisse passant par tous les points
     4. draw()         — rendu canvas : étoiles, trajectoire, sillon, corps, vaisseau
     5. animate()      — boucle requestAnimationFrame, avance t de 0→1
     6. updateUI()     — synchronise les éléments HTML avec t courant
============================================================ */

/* --------------------------------------------------------
   1. DONNÉES DE MISSION
   Chaque phase couvre un intervalle de progression t ∈ [0..1].
   Les distances et vitesses sont interpolées linéairement
   entre les valeurs [début, fin] de chaque phase.
   Valeurs basées sur les données NASA réelles d'Artemis II.
-------------------------------------------------------- */
const PHASES = [
  {
    tStart: 0.0,
    tEnd: 0.08,
    nom: "Lancement — Orbite terrestre haute (1ᵉʳ avril)",
    jour: 1,
    vitesse: [28_000, 7_900],
    distTerre: [200, 2_000],
    distLune: [384_400, 382_000],
  },
  {
    tStart: 0.08,
    tEnd: 0.16,
    nom: "Burn TLI — Injection translunaire (2 avril, 19h49 EDT)",
    jour: 2,
    vitesse: [7_900, 39_472],
    distTerre: [2_000, 10_000],
    distLune: [382_000, 374_000],
  },
  {
    tStart: 0.16,
    tEnd: 0.46,
    nom: "Transit Terre → Lune (J3 – J5)",
    jour: 3,
    vitesse: [39_472, 3_200],
    distTerre: [10_000, 393_000],
    distLune: [374_000, 8_000],
  },
  {
    tStart: 0.46,
    tEnd: 0.54,
    nom: "Sphère d'influence lunaire — Approche (6 avril, 00h41 EDT)",
    jour: 6,
    vitesse: [3_200, 8_500],
    distTerre: [393_000, 406_700],
    distLune: [8_000, 6_500],
  },
  {
    tStart: 0.54,
    tEnd: 0.61,
    nom: "Survol lunaire — Approche à ~6 500 km (6 avril après-midi)",
    jour: 6,
    vitesse: [8_500, 9_200],
    distTerre: [406_700, 398_000],
    distLune: [6_500, 8_500],
  },
  {
    tStart: 0.61,
    tEnd: 0.7,
    nom: "📡 Passage face cachée — Perte de signal temporaire (J7)",
    jour: 7,
    vitesse: [9_200, 7_600],
    distTerre: [398_000, 375_000],
    distLune: [8_500, 18_000],
    signalLost: true,
  },
  {
    tStart: 0.7,
    tEnd: 0.86,
    nom: "Retour vers la Terre (J8 – J9)",
    jour: 8,
    vitesse: [7_600, 5_800],
    distTerre: [375_000, 45_000],
    distLune: [18_000, 345_000],
  },
  {
    tStart: 0.86,
    tEnd: 1.0,
    nom: "Rentrée atmosphérique — Amerrissage Pacifique (~10 avril)",
    jour: 10,
    vitesse: [5_800, 40_000],
    distTerre: [45_000, 0],
    distLune: [345_000, 384_400],
  },
];

/* --------------------------------------------------------
   2. POINTS DE CONTRÔLE DE LA TRAJECTOIRE
   Coordonnées normalisées [x, y] ∈ [0..1] pour le canvas.
-------------------------------------------------------- */
const TRAJECTORY_PTS = [
  [0.19, 0.5],
  [0.19, 0.3],
  [0.24, 0.21],
  [0.36, 0.14],
  [0.5, 0.105],
  [0.65, 0.145],
  [0.77, 0.265],
  [0.815, 0.43],
  [0.805, 0.59],
  [0.77, 0.7],
  [0.66, 0.79],
  [0.5, 0.84],
  [0.355, 0.79],
  [0.24, 0.72],
  [0.19, 0.63],
  [0.19, 0.5],
];

/* --------------------------------------------------------
   3. RÉFÉRENCE AU CANVAS
-------------------------------------------------------- */
const canvas = document.getElementById("trajectoryCanvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

const EARTH_X = TRAJECTORY_PTS[0][0] * W;
const EARTH_Y = TRAJECTORY_PTS[0][1] * H;
const MOON_X = TRAJECTORY_PTS[7][0] * W;
const MOON_Y = TRAJECTORY_PTS[7][1] * H;

/* --------------------------------------------------------
   4. ÉTAT DE L'ANIMATION
-------------------------------------------------------- */
let t = 0;
let animId = null;
let isPlaying = false;
let speedLevel = 2;

const SPEED_MAP = { 1: 1 / 36_000, 2: 1 / 3_600, 3: 1 / 360 };
const SPEED_LABELS = { 1: "×1", 2: "×10", 3: "×100" };

/* --------------------------------------------------------
   5. INTERPOLATION CATMULL-ROM
-------------------------------------------------------- */
function catmullRomPoint(pts, t) {
  const n = pts.length - 1;
  const seg = Math.min(Math.floor(t * n), n - 1);
  const tLoc = t * n - seg;

  const p0 = pts[Math.max(seg - 1, 0)];
  const p1 = pts[seg];
  const p2 = pts[Math.min(seg + 1, n)];
  const p3 = pts[Math.min(seg + 2, n)];

  const t2 = tLoc * tLoc;
  const t3 = t2 * tLoc;

  const cx =
    0.5 *
    (2 * p1[0] +
      (-p0[0] + p2[0]) * tLoc +
      (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
      (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
  const cy =
    0.5 *
    (2 * p1[1] +
      (-p0[1] + p2[1]) * tLoc +
      (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
      (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
  return [cx * W, cy * H];
}

function lerp(a, b, u) {
  return a + (b - a) * Math.min(u, 1);
}

/* --------------------------------------------------------
   6. DONNÉES TÉLÉMÉTRIE selon t courant
-------------------------------------------------------- */
function getPhase(t) {
  for (const phase of PHASES) {
    if (t >= phase.tStart && t <= phase.tEnd) return phase;
  }
  return PHASES[PHASES.length - 1];
}

function getTelemetry(t) {
  const phase = getPhase(t);
  const u = (t - phase.tStart) / (phase.tEnd - phase.tStart);
  return {
    jour: phase.jour,
    vitesse: Math.round(lerp(phase.vitesse[0], phase.vitesse[1], u)),
    distTerre: Math.round(lerp(phase.distTerre[0], phase.distTerre[1], u)),
    distLune: Math.round(lerp(phase.distLune[0], phase.distLune[1], u)),
    nom: phase.nom,
    signalLost: phase.signalLost || false,
  };
}

/* --------------------------------------------------------
   7. ÉTOILES DE FOND
-------------------------------------------------------- */
const STARS = Array.from({ length: 200 }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  r: Math.random() * 1.1 + 0.3,
  opacity: Math.random() * 0.65 + 0.25,
}));

function drawStars() {
  STARS.forEach(({ x, y, r, opacity }) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${opacity})`;
    ctx.fill();
  });
}

/* --------------------------------------------------------
   8. TRAJECTOIRE COMPLÈTE en pointillés
-------------------------------------------------------- */
function drawTrajectoryPath() {
  ctx.save();
  ctx.setLineDash([4, 7]);
  ctx.strokeStyle = "rgba(129,140,248,0.25)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const [sx, sy] = catmullRomPoint(TRAJECTORY_PTS, 0);
  ctx.moveTo(sx, sy);
  for (let i = 1; i <= 240; i++) {
    const [px, py] = catmullRomPoint(TRAJECTORY_PTS, i / 240);
    ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.restore();
}

/* --------------------------------------------------------
   9. SILLON PARCOURU
-------------------------------------------------------- */
function drawTrail(currentT) {
  if (currentT <= 0.001) return;
  const steps = Math.max(Math.floor(currentT * 240), 2);
  const [sx, sy] = catmullRomPoint(TRAJECTORY_PTS, 0);
  const [ex, ey] = catmullRomPoint(TRAJECTORY_PTS, currentT);

  ctx.save();
  ctx.setLineDash([]);
  const grad = ctx.createLinearGradient(sx, sy, ex, ey);
  grad.addColorStop(0, "rgba(99,102,241,0)");
  grad.addColorStop(0.5, "rgba(129,140,248,0.45)");
  grad.addColorStop(1, "rgba(196,181,253,0.9)");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  for (let i = 1; i <= steps; i++) {
    const [px, py] = catmullRomPoint(TRAJECTORY_PTS, i / 240);
    ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.restore();
}

/* --------------------------------------------------------
   10. DESSIN DE LA TERRE
-------------------------------------------------------- */
function drawEarth() {
  const halo = ctx.createRadialGradient(
    EARTH_X,
    EARTH_Y,
    18,
    EARTH_X,
    EARTH_Y,
    52,
  );
  halo.addColorStop(0, "rgba(30,136,229,0.22)");
  halo.addColorStop(1, "rgba(30,136,229,0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(EARTH_X, EARTH_Y, 52, 0, Math.PI * 2);
  ctx.fill();

  const globe = ctx.createRadialGradient(
    EARTH_X - 7,
    EARTH_Y - 7,
    2,
    EARTH_X,
    EARTH_Y,
    22,
  );
  globe.addColorStop(0, "#64b5f6");
  globe.addColorStop(0.4, "#1e88e5");
  globe.addColorStop(1, "#0d47a1");
  ctx.fillStyle = globe;
  ctx.beginPath();
  ctx.arc(EARTH_X, EARTH_Y, 22, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(76,175,80,0.72)";
  ctx.beginPath();
  ctx.ellipse(EARTH_X - 5, EARTH_Y - 7, 7, 5, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(EARTH_X + 7, EARTH_Y + 4, 5, 4, -0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "bold 10px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("TERRE", EARTH_X, EARTH_Y + 36);
}

/* --------------------------------------------------------
   11. DESSIN DE LA LUNE
-------------------------------------------------------- */
function drawMoon() {
  const halo = ctx.createRadialGradient(MOON_X, MOON_Y, 12, MOON_X, MOON_Y, 38);
  halo.addColorStop(0, "rgba(158,158,158,0.16)");
  halo.addColorStop(1, "rgba(158,158,158,0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(MOON_X, MOON_Y, 38, 0, Math.PI * 2);
  ctx.fill();

  const globe = ctx.createRadialGradient(
    MOON_X - 4,
    MOON_Y - 4,
    1,
    MOON_X,
    MOON_Y,
    16,
  );
  globe.addColorStop(0, "#e0e0e0");
  globe.addColorStop(0.5, "#9e9e9e");
  globe.addColorStop(1, "#525252");
  ctx.fillStyle = globe;
  ctx.beginPath();
  ctx.arc(MOON_X, MOON_Y, 16, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.arc(MOON_X - 5, MOON_Y - 3, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(MOON_X + 6, MOON_Y + 5, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(MOON_X + 1, MOON_Y - 9, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "bold 10px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("LUNE", MOON_X, MOON_Y + 30);
}

/* --------------------------------------------------------
   12. DESSIN DU VAISSEAU ORION
-------------------------------------------------------- */
function drawOrion(x, y) {
  ctx.save();
  ctx.translate(x, y);

  const pulse = 1 + 0.28 * Math.sin(Date.now() / 190);
  const thrustG = ctx.createRadialGradient(0, 0, 0, 0, 0, 13 * pulse);
  thrustG.addColorStop(0, "rgba(255,214,0,0.95)");
  thrustG.addColorStop(0.4, "rgba(255,140,0,0.45)");
  thrustG.addColorStop(1, "rgba(255,80,0,0)");
  ctx.fillStyle = thrustG;
  ctx.beginPath();
  ctx.arc(0, 0, 13 * pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffd600";
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -8);
  ctx.lineTo(6, 6);
  ctx.lineTo(-6, 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#81d4fa";
  ctx.beginPath();
  ctx.arc(0, -1, 2.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/* --------------------------------------------------------
   13. MISE À JOUR DES ÉLÉMENTS HTML
-------------------------------------------------------- */
function updateUI(telem) {
  document.getElementById("phaseName").textContent = telem.nom;
  document.getElementById("telDay").textContent = `J ${telem.jour}`;

  document.getElementById("telSpeed").innerHTML =
    `${telem.vitesse.toLocaleString("fr-FR")}<span class="telem-item__unit"> km/h</span>`;
  document.getElementById("telEarth").innerHTML =
    `${telem.distTerre.toLocaleString("fr-FR")}<span class="telem-item__unit"> km</span>`;
  document.getElementById("telMoon").innerHTML =
    `${telem.distLune.toLocaleString("fr-FR")}<span class="telem-item__unit"> km</span>`;

  document
    .getElementById("signalLost")
    .classList.toggle("is-active", telem.signalLost);
}

/* --------------------------------------------------------
   14. RENDU COMPLET D'UNE FRAME
-------------------------------------------------------- */
function draw() {
  ctx.clearRect(0, 0, W, H);
  drawStars();
  drawTrajectoryPath();
  drawTrail(t);
  drawEarth();
  drawMoon();

  const [ox, oy] = catmullRomPoint(TRAJECTORY_PTS, t);
  drawOrion(ox, oy);

  updateUI(getTelemetry(t));
}

/* --------------------------------------------------------
   15. BOUCLE D'ANIMATION
-------------------------------------------------------- */
function animate() {
  t = Math.min(t + SPEED_MAP[speedLevel], 1);
  draw();

  if (t < 1) {
    animId = requestAnimationFrame(animate);
  } else {
    isPlaying = false;
    document.getElementById("btnPlay").disabled = true;
    document.getElementById("btnPause").disabled = true;
    document.getElementById("phaseName").textContent =
      "🎉 Amerrissage réussi — Mission Artemis II accomplie !";
  }
}

/* --------------------------------------------------------
   16. GESTIONNAIRES DE CONTRÔLES
-------------------------------------------------------- */
document.getElementById("btnPlay").addEventListener("click", () => {
  if (isPlaying) return;
  isPlaying = true;
  document.getElementById("btnPlay").disabled = true;
  document.getElementById("btnPause").disabled = false;
  animId = requestAnimationFrame(animate);
});

document.getElementById("btnPause").addEventListener("click", () => {
  if (!isPlaying) return;
  isPlaying = false;
  cancelAnimationFrame(animId);
  animId = null;
  document.getElementById("btnPlay").disabled = false;
  document.getElementById("btnPause").disabled = true;
});

document.getElementById("btnReset").addEventListener("click", () => {
  cancelAnimationFrame(animId);
  animId = null;
  isPlaying = false;
  t = 0;
  document.getElementById("btnPlay").disabled = false;
  document.getElementById("btnPause").disabled = true;
  document.getElementById("signalLost").classList.remove("is-active");
  document.getElementById("phaseName").textContent =
    "Appuyer sur ▶ Play pour démarrer";
  draw();
});

document.getElementById("speedSlider").addEventListener("input", (e) => {
  speedLevel = parseInt(e.target.value, 10);
  document.getElementById("speedValue").textContent = SPEED_LABELS[speedLevel];
});

/* --------------------------------------------------------
   17. RENDU INITIAL
-------------------------------------------------------- */
draw();
