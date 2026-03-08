/**
 * Générateur de graphiques interactif
 * Permet de créer et visualiser des données en temps réel
 */
export class ChartGenerator {
  constructor() {
    // État
    this.entries = []; // [{ label: "...", value: 123 }, ...]
    this.chartType = "bar"; // 'bar' ou 'line'
    this.chart = null; // Instance Chart.js

    // Éléments DOM
    this.canvasElement = null;
    this.labelInput = null;
    this.valueInput = null;
    this.addBtn = null;
    this.clearAllBtn = null;
    this.chartTypeBarBtn = null;
    this.chartTypeLineBtn = null;
    this.dataListElement = null;

    this.init();
  }

  /**
   * Initialise l'application
   */
  init() {
    this.cacheElements();
    this.bindEvents();
    this.renderChart();
    this.renderDataList();
  }

  /**
   * Récupère les références aux éléments DOM
   */
  cacheElements() {
    this.canvasElement = document.getElementById("chartCanvas");
    this.labelInput = document.getElementById("labelInput");
    this.valueInput = document.getElementById("valueInput");
    this.addBtn = document.getElementById("addBtn");
    this.clearAllBtn = document.getElementById("clearAllBtn");
    this.chartTypeBarBtn = document.getElementById("chartTypeBar");
    this.chartTypeLineBtn = document.getElementById("chartTypeLine");
    this.dataListElement = document.getElementById("dataList");
  }

  /**
   * Lie les événements aux éléments DOM
   */
  bindEvents() {
    this.addBtn.addEventListener("click", () => this.handleAddEntry());
    this.clearAllBtn.addEventListener("click", () => this.handleClearAll());
    this.chartTypeBarBtn.addEventListener("click", () =>
      this.setChartType("bar")
    );
    this.chartTypeLineBtn.addEventListener("click", () =>
      this.setChartType("line")
    );

    // Soumettre en appuyant sur Entrée
    this.labelInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.valueInput.focus();
    });
    this.valueInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleAddEntry();
    });
  }

  /**
   * Ajoute une nouvelle entrée
   */
  handleAddEntry() {
    const label = this.labelInput.value.trim();
    const value = parseFloat(this.valueInput.value);

    if (!label) {
      alert("Veuillez entrer une étiquette");
      this.labelInput.focus();
      return;
    }

    if (isNaN(value) || value < 0) {
      alert("Veuillez entrer une valeur numérique positive");
      this.valueInput.focus();
      return;
    }

    this.addEntry(label, value);

    // Réinitialiser le formulaire
    this.labelInput.value = "";
    this.valueInput.value = "";
    this.labelInput.focus();
  }

  /**
   * Ajoute une entrée à la liste et met à jour l'affichage
   */
  addEntry(label, value) {
    this.entries.push({ label, value });
    this.renderChart();
    this.renderDataList();
  }

  /**
   * Supprime une entrée par index
   */
  removeEntry(index) {
    this.entries.splice(index, 1);
    this.renderChart();
    this.renderDataList();
  }

  /**
   * Efface toutes les entrées
   */
  handleClearAll() {
    if (this.entries.length === 0) return;

    const confirmed = confirm(
      "Êtes-vous sûr de vouloir effacer toutes les données ?"
    );
    if (confirmed) {
      this.clearAll();
    }
  }

  /**
   * Vide la liste des entrées
   */
  clearAll() {
    this.entries = [];
    this.renderChart();
    this.renderDataList();
  }

  /**
   * Change le type de graphique
   */
  setChartType(type) {
    if (type === this.chartType) return;

    this.chartType = type;

    // Met à jour les classes actives
    if (type === "bar") {
      this.chartTypeBarBtn.classList.add("active");
      this.chartTypeLineBtn.classList.remove("active");
    } else {
      this.chartTypeLineBtn.classList.add("active");
      this.chartTypeBarBtn.classList.remove("active");
    }

    this.renderChart();
  }

  /**
   * Dessine ou met à jour le graphique Chart.js
   */
  renderChart() {
    // Détruit l'instance précédente
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    // Canvas vide si aucune donnée
    if (this.entries.length === 0) {
      return;
    }

    const ctx = this.canvasElement.getContext("2d");
    const isDarkTheme = true; // TechnoDocs est en mode sombre

    // Couleurs adaptées au thème sombre
    const gridColor = "rgba(156, 163, 175, 0.15)";
    const tickColor = "#9ca3af";
    const backgroundColor = isDarkTheme
      ? "rgba(99, 102, 241, 0.7)"
      : "rgba(99, 102, 241, 0.6)";
    const borderColor = "rgb(99, 102, 241)";
    const tooltipBg = "#1f2937";
    const tooltipText = "#f9fafb";

    const commonConfig = {
      type: this.chartType,
      data: {
        labels: this.entries.map((e) => e.label),
        datasets: [
          {
            label: "Valeur",
            data: this.entries.map((e) => e.value),
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 2,
            borderRadius: 8,
            // Pour les courbes
            tension: 0.3,
            pointRadius: 6,
            pointBackgroundColor: borderColor,
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: tooltipBg,
            titleColor: tooltipText,
            bodyColor: tooltipText,
            borderColor: borderColor,
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: (context) => {
                return `${context.parsed.y}`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: tickColor,
            },
            grid: {
              color: gridColor,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: tickColor,
            },
            grid: {
              color: gridColor,
            },
          },
        },
      },
    };

    this.chart = new Chart(ctx, commonConfig);
  }

  /**
   * Met à jour l'affichage de la liste des données
   */
  renderDataList() {
    // Vider la liste
    this.dataListElement.innerHTML = "";

    if (this.entries.length === 0) {
      this.dataListElement.innerHTML = `
        <div class="empty-state">
          <p>Aucune donnée pour le moment</p>
        </div>
      `;
      return;
    }

    // Ajouter chaque entrée
    this.entries.forEach((entry, index) => {
      const itemEl = document.createElement("div");
      itemEl.className = "data-item";
      itemEl.innerHTML = `
        <div class="data-item-content">
          <span class="data-item-label">${this.escapeHtml(entry.label)}</span>
          <span class="data-item-value">${entry.value}</span>
        </div>
        <button class="btn-item-delete" data-index="${index}">Supprimer</button>
      `;

      // Ajouter l'événement de suppression
      const deleteBtn = itemEl.querySelector(".btn-item-delete");
      deleteBtn.addEventListener("click", () => {
        this.removeEntry(index);
      });

      this.dataListElement.appendChild(itemEl);
    });
  }

  /**
   * Échappe les caractères HTML pour éviter les injections XSS
   */
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}
