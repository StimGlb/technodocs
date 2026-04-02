// Chart est chargé comme globale via <script src=".../chart.umd.min.js">
/* global Chart */

const COLORS = {
  chauffage: "#D85A30",
  eclairage: "#378ADD",
  veille: "#1D9E75",
};

function prixAnnuel(kwhTotal, tarif) {
  const coutHP = kwhTotal * tarif.ratioHP * tarif.prixHP;
  const coutHC = kwhTotal * tarif.ratioHC * tarif.prixHC;
  const coutConsoHT = coutHP + coutHC;
  const aboAnnuel = tarif.abonnementMois * 12;
  const cspe = kwhTotal * tarif.cspeParKwh;
  const ctaAnnuel = tarif.ctaMois * 12;
  const tcfeAnnuel = tarif.tcfeMois * 12;
  const baseReduit = aboAnnuel + ctaAnnuel;
  const baseNormal = coutConsoHT + cspe + tcfeAnnuel;
  const tvaR = baseReduit * tarif.tvaReduit;
  const tvaN = baseNormal * tarif.tvaNormal;
  return Math.round(baseReduit + baseNormal + tvaR + tvaN);
}

const capitalize = (s) => s[0].toUpperCase() + s.slice(1);
const sliderId = (id) => "slider" + capitalize(id);
const valId = (id) => "val" + capitalize(id);

async function init() {
  const resp = await fetch("/src/data/postes-conso-elect.json");
  if (!resp.ok) throw new Error("Impossible de charger les données");
  const data = await resp.json();
  const { postes, tarif } = data;

  const initialValues = Object.fromEntries(postes.map((p) => [p.id, p.value]));
  const initialTotal = postes.reduce((s, p) => s + p.value, 0);
  const initialPrix = prixAnnuel(initialTotal, tarif);

  postes.forEach((p) => {
    const slider = document.getElementById(sliderId(p.id));
    slider.min = 0;
    slider.max = p.maxSlider;
    slider.step = p.step;
    slider.value = p.value;
    document.getElementById(valId(p.id)).textContent =
      p.value.toLocaleString("fr-FR") + " kWh";
  });

  const pieCtx = document.getElementById("chartPie").getContext("2d");
  const barCtx = document.getElementById("chartBar").getContext("2d");

  const pieChart = new Chart(pieCtx, {
    type: "doughnut",
    data: {
      labels: postes.map((p) => p.label),
      datasets: [
        {
          data: postes.map((p) => p.value),
          backgroundColor: postes.map((p) => COLORS[p.id]),
          borderWidth: 2,
          borderColor: "#1f2937",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
          labels: { font: { size: 11 }, color: "#d1d5db" },
        },
      },
      responsive: true,
    },
  });

  const barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: postes.map((p) => p.label),
      datasets: [
        {
          label: "Initial",
          data: postes.map((p) => p.value),
          backgroundColor: postes.map((p) => COLORS[p.id] + "aa"),
          borderColor: postes.map((p) => COLORS[p.id]),
          borderWidth: 1,
        },
        {
          label: "Simulé",
          data: postes.map((p) => p.value),
          backgroundColor: postes.map((p) => COLORS[p.id]),
          borderColor: postes.map((p) => COLORS[p.id]),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { font: { size: 11 }, color: "#d1d5db" } } },
      scales: {
        x: {
          ticks: { color: "#9ca3af", font: { size: 10 } },
          grid: { color: "#2d3748" },
        },
        y: { ticks: { color: "#9ca3af" }, grid: { color: "#2d3748" } },
      },
    },
  });

  function getValues() {
    return Object.fromEntries(
      postes.map((p) => [p.id, +document.getElementById(sliderId(p.id)).value]),
    );
  }

  function updateUI() {
    const vals = getValues();
    const total = postes.reduce((s, p) => s + vals[p.id], 0);
    const prix = prixAnnuel(total, tarif);
    const eco = initialPrix - prix;

    document.getElementById("totalKwh").textContent =
      total.toLocaleString("fr-FR") + " kWh";
    document.getElementById("totalEur").textContent =
      prix.toLocaleString("fr-FR") + " €";
    document.getElementById("economie").textContent =
      eco > 0
        ? "+" + eco.toLocaleString("fr-FR") + " €"
        : eco === 0
          ? "0 €"
          : eco.toLocaleString("fr-FR") + " €";

    postes.forEach((p) => {
      document.getElementById(valId(p.id)).textContent =
        vals[p.id].toLocaleString("fr-FR") + " kWh";
    });

    pieChart.data.datasets[0].data = postes.map((p) => vals[p.id]);
    pieChart.update();
    barChart.data.datasets[1].data = postes.map((p) => vals[p.id]);
    barChart.update();

    const tips = [];
    if (vals.chauffage < initialValues.chauffage)
      tips.push(
        "Baisser le thermostat de 1°C = environ 7% d'économie sur le chauffage.",
      );
    if (vals.eclairage < initialValues.eclairage)
      tips.push(
        "Remplacer les ampoules classiques par des LED divise la consommation d'éclairage par 5.",
      );
    if (vals.veille < initialValues.veille)
      tips.push(
        "Utiliser des multiprises à interrupteur supprime les consommations de veille.",
      );

    if (eco > 0) {
      const ecoMois = Math.round(eco / 12);
      tips.push(
        "Économie estimée\u00a0: " +
          eco.toLocaleString("fr-FR") +
          "\u00a0€/an, soit " +
          ecoMois +
          "\u00a0€/mois",
      );
    }

    const tipsEl = document.getElementById("tipsContainer");
    if (tips.length === 0) {
      const li = document.createElement("li");
      li.textContent =
        "Déplacez les curseurs pour simuler des économies d'énergie.";
      tipsEl.replaceChildren(li);
    } else {
      tipsEl.replaceChildren(
        ...tips.map((t) => {
          const li = document.createElement("li");
          li.textContent = t;
          return li;
        }),
      );
    }
  }

  postes.forEach((p) => {
    document.getElementById(sliderId(p.id)).addEventListener("input", updateUI);
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    postes.forEach((p) => {
      document.getElementById(sliderId(p.id)).value = p.value;
    });
    updateUI();
  });

  updateUI();
}

init();
