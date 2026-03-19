const STORAGE_KEY = "technodocs_chart_generator_v2";

const COMPARATIVE_DATA = {
  labels: [
    "Chauffage",
    "Froid et lavage",
    "Multimédia",
    "Eau chaude",
    "Cuisson",
    "Éclairage",
    "Autres",
    "Ventilation",
    "Recharge VE",
  ],
  datasets: [
    {
      label: "2017",
      data: [27.6, 18.5, 13.5, 12.8, 7.8, 5.6, 12.1, 1.7, 0],
      backgroundColor: "rgba(54, 162, 235, 0.7)",
      borderColor: "rgb(54, 162, 235)",
    },
    {
      label: "2026 (Projetée)",
      data: [24.0, 17.0, 16.0, 12.0, 7.5, 4.0, 10.0, 1.5, 8.0],
      backgroundColor: "rgba(255, 99, 132, 0.7)",
      borderColor: "rgb(255, 99, 132)",
    },
  ],
};

class ChartGeneratorV2 {
  constructor() {
    this.mode = "single"; // 'single' | 'comparison'
    this.entries = [];
    this.labels = [];
    this.datasets = [];
    this.chartType = "bar";
    this.displayMode = "absolute"; // 'absolute' | 'percent'
    this.unit = "kWh";
    this.chart = null;

    this.canvasElement = null;
    this.labelInput = null;
    this.valueInput = null;
    this.addBtn = null;
    this.clearAllBtn = null;
    this.chartTypeBarBtn = null;
    this.chartTypeLineBtn = null;
    this.dataListElement = null;
    this.formPanel = null;
    this.displayPanel = null;
    this.displayAbsoluteBtn = null;
    this.displayPercentBtn = null;

    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.loadFromStorage();
    this.renderAll();
  }

  cacheElements() {
    this.canvasElement = document.getElementById("chartCanvas");
    this.labelInput = document.getElementById("labelInput");
    this.valueInput = document.getElementById("valueInput");
    this.addBtn = document.getElementById("addBtn");
    this.clearAllBtn = document.getElementById("clearAllBtn");
    this.chartTypeBarBtn = document.getElementById("chartTypeBar");
    this.chartTypeLineBtn = document.getElementById("chartTypeLine");
    this.dataListElement = document.getElementById("dataList");
    this.formPanel = document.getElementById("formPanel");
    this.displayPanel = document.getElementById("displayPanel");
    this.displayAbsoluteBtn = document.getElementById("displayAbsolute");
    this.displayPercentBtn = document.getElementById("displayPercent");
    this.unitInput = document.getElementById("unitInput");
  }

  showError(msg) {
    const el = document.getElementById("formError");
    if (el) {
      el.textContent = msg;
      el.removeAttribute("hidden");
    }
  }

  clearError() {
    const el = document.getElementById("formError");
    if (el) {
      el.textContent = "";
      el.setAttribute("hidden", "");
    }
  }

  bindEvents() {
    this.addBtn.addEventListener("click", () => this.handleAddEntry());
    this.clearAllBtn.addEventListener("click", () => this.handleClearAll());
    this.chartTypeBarBtn.addEventListener("click", () =>
      this.setChartType("bar"),
    );
    this.chartTypeLineBtn.addEventListener("click", () =>
      this.setChartType("line"),
    );

    this.labelInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.valueInput.focus();
    });
    this.valueInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleAddEntry();
    });

    document
      .getElementById("chartExport")
      ?.addEventListener("click", () => this.exportToJSON());

    document.getElementById("chartImport")?.addEventListener("change", (e) => {
      if (e.target.files[0]) {
        this.importFromJSON(e.target.files[0]);
        e.target.value = "";
      }
    });

    document
      .getElementById("chartComparative")
      ?.addEventListener("click", () => this.loadComparative());

    document
      .getElementById("displayAbsolute")
      ?.addEventListener("click", () => this.setDisplayMode("absolute"));
    document
      .getElementById("displayPercent")
      ?.addEventListener("click", () => this.setDisplayMode("percent"));

    this.unitInput?.addEventListener("input", () => {
      this.unit = this.unitInput.value.trim() || "unité";
      if (this.mode === "single" && this.entries.length > 0) {
        this.renderChart();
        this.renderDataList();
        this.saveToStorage();
      }
    });
  }

  renderAll() {
    this.updateFormVisibility();
    this.renderChart();
    this.renderDataList();
    this.updateTypeToggle();
    this.updateDisplayToggle();
  }

  updateFormVisibility() {
    const hidden = this.mode === "comparison";
    if (this.formPanel) this.formPanel.style.display = hidden ? "none" : "";
    if (this.displayPanel)
      this.displayPanel.style.display = hidden ? "none" : "";
  }

  handleAddEntry() {
    if (this.mode === "comparison") return;
    this.clearError();

    const label = this.labelInput.value.trim();
    const value = parseFloat(this.valueInput.value);

    if (!label) {
      this.showError("Veuillez entrer une étiquette.");
      this.labelInput.focus();
      return;
    }
    if (isNaN(value) || value < 0) {
      this.showError("Veuillez entrer une valeur numérique positive.");
      this.valueInput.focus();
      return;
    }

    this.entries.push({ label, value });
    this.labelInput.value = "";
    this.valueInput.value = "";
    this.labelInput.focus();
    this.saveToStorage();
    this.renderChart();
    this.renderDataList();
  }

  removeEntry(index) {
    this.entries.splice(index, 1);
    this.saveToStorage();
    this.renderChart();
    this.renderDataList();
  }

  handleClearAll() {
    const hasData =
      this.mode === "comparison"
        ? this.labels.length > 0
        : this.entries.length > 0;
    if (!hasData) return;

    if (confirm("Êtes-vous sûr de vouloir effacer toutes les données ?")) {
      this.mode = "single";
      this.entries = [];
      this.labels = [];
      this.datasets = [];
      localStorage.removeItem(STORAGE_KEY);
      this.renderAll();
    }
  }

  loadComparative() {
    this.mode = "comparison";
    this.labels = [...COMPARATIVE_DATA.labels];
    this.datasets = COMPARATIVE_DATA.datasets.map((ds) => ({
      ...ds,
      data: [...ds.data],
    }));
    this.saveToStorage();
    this.renderAll();
  }

  exitComparison() {
    this.mode = "single";
    this.entries = [];
    this.labels = [];
    this.datasets = [];
    localStorage.removeItem(STORAGE_KEY);
    this.renderAll();
  }

  setChartType(type) {
    if (type === this.chartType) return;
    this.chartType = type;
    this.updateTypeToggle();
    this.renderChart();
    this.saveToStorage();
  }

  updateTypeToggle() {
    if (this.chartType === "bar") {
      this.chartTypeBarBtn.classList.add("active");
      this.chartTypeLineBtn.classList.remove("active");
    } else {
      this.chartTypeLineBtn.classList.add("active");
      this.chartTypeBarBtn.classList.remove("active");
    }
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    if (this.mode === "comparison") {
      if (this.labels.length > 0) this.renderComparisonChart();
    } else {
      if (this.entries.length > 0) this.renderSingleChart();
    }
  }

  renderSingleChart() {
    const ctx = this.canvasElement.getContext("2d");
    const gridColor = "rgba(156, 163, 175, 0.15)";
    const tickColor = "#9ca3af";
    const unit = this.getUnit();
    const displayValues = this.getDisplayValues();

    // Couleur par barre : orange pour "Veille", indigo sinon
    const bgColors = this.entries.map((e) =>
      e.label === "Veille"
        ? "rgba(251, 146, 60, 0.75)"
        : "rgba(99, 102, 241, 0.7)",
    );
    const borderColors = this.entries.map((e) =>
      e.label === "Veille" ? "rgb(251, 146, 60)" : "rgb(99, 102, 241)",
    );

    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: {
        labels: this.entries.map((e) => e.label),
        datasets: [
          {
            label: unit,
            data: displayValues,
            backgroundColor: bgColors,
            borderColor: borderColors,
            borderWidth: 2,
            borderRadius: 8,
            tension: 0.3,
            pointRadius: 6,
            pointBackgroundColor: borderColors,
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
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1f2937",
            titleColor: "#f9fafb",
            bodyColor: "#f9fafb",
            borderColor: "rgba(156, 163, 175, 0.3)",
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y} ${unit}`,
            },
          },
        },
        scales: {
          x: { ticks: { color: tickColor }, grid: { color: gridColor } },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: unit,
              color: tickColor,
              font: { size: 12 },
            },
            ticks: {
              color: tickColor,
              callback: (v) => `${v} ${unit}`,
            },
            grid: { color: gridColor },
          },
        },
      },
    });
  }

  renderComparisonChart() {
    const ctx = this.canvasElement.getContext("2d");
    const gridColor = "rgba(156, 163, 175, 0.15)";
    const tickColor = "#9ca3af";

    const chartDatasets = this.datasets.map((ds) => ({
      label: ds.label,
      data: ds.data,
      backgroundColor: ds.backgroundColor,
      borderColor: ds.borderColor,
      borderWidth: 2,
      borderRadius: this.chartType === "bar" ? 6 : 0,
      tension: 0.3,
      pointRadius: 5,
      pointBackgroundColor: ds.borderColor,
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointHoverRadius: 8,
    }));

    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: { labels: this.labels, datasets: chartDatasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#d1d5db",
              font: { size: 13, weight: "600" },
              padding: 16,
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: "#1f2937",
            titleColor: "#f9fafb",
            bodyColor: "#f9fafb",
            borderColor: "rgba(156, 163, 175, 0.3)",
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            callbacks: {
              title: (items) => items[0].label,
              label: (ctx) => `  ${ctx.dataset.label} : ${ctx.parsed.y}%`,
            },
          },
        },
        scales: {
          x: { ticks: { color: tickColor }, grid: { color: gridColor } },
          y: {
            beginAtZero: true,
            ticks: {
              color: tickColor,
              callback: (v) => `${v}%`,
            },
            grid: { color: gridColor },
          },
        },
      },
    });
  }

  renderDataList() {
    this.dataListElement.textContent = "";

    if (this.mode === "comparison") {
      this.renderComparisonDataList();
    } else {
      this.renderSingleDataList();
    }
  }

  renderSingleDataList() {
    if (this.entries.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      const p = document.createElement("p");
      p.textContent = "Aucune donnée pour le moment";
      empty.appendChild(p);
      this.dataListElement.appendChild(empty);
      return;
    }

    const displayValues = this.getDisplayValues();
    const unit = this.getUnit();

    this.entries.forEach((entry, index) => {
      const item = document.createElement("div");
      item.className =
        "data-item" + (entry.label === "Veille" ? " data-item--veille" : "");

      const content = document.createElement("div");
      content.className = "data-item-content";

      const labelEl = document.createElement("span");
      labelEl.className = "data-item-label";
      labelEl.textContent = entry.label;

      const valueEl = document.createElement("span");
      valueEl.className = "data-item-value";
      valueEl.textContent = `${displayValues[index]} ${unit}`;

      content.appendChild(labelEl);
      content.appendChild(valueEl);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn-item-delete";
      deleteBtn.textContent = "Supprimer";
      deleteBtn.setAttribute("aria-label", `Supprimer ${entry.label}`);
      deleteBtn.addEventListener("click", () => this.removeEntry(index));

      item.appendChild(content);
      item.appendChild(deleteBtn);
      this.dataListElement.appendChild(item);
    });
  }

  renderComparisonDataList() {
    const header = document.createElement("div");
    header.className = "comparison-header";

    const badge = document.createElement("span");
    badge.className = "comparison-badge";
    badge.textContent = "📊 Mode comparatif actif";

    const exitBtn = document.createElement("button");
    exitBtn.className = "btn-exit-comparison";
    exitBtn.textContent = "✕ Mode libre";
    exitBtn.addEventListener("click", () => this.exitComparison());

    header.appendChild(badge);
    header.appendChild(exitBtn);
    this.dataListElement.appendChild(header);

    this.labels.forEach((label, i) => {
      const item = document.createElement("div");
      item.className = "data-item data-item--comparison";

      const labelEl = document.createElement("span");
      labelEl.className = "data-item-label";
      labelEl.textContent = label;

      const values = document.createElement("div");
      values.className = "data-item-values";

      this.datasets.forEach((ds) => {
        const seriesEl = document.createElement("span");
        seriesEl.className = "data-item-series";

        const dot = document.createElement("span");
        dot.className = "series-dot";
        dot.style.background = ds.borderColor;

        seriesEl.appendChild(dot);
        seriesEl.appendChild(
          document.createTextNode(`${ds.label} : ${ds.data[i]}%`),
        );
        values.appendChild(seriesEl);
      });

      item.appendChild(labelEl);
      item.appendChild(values);
      this.dataListElement.appendChild(item);
    });
  }

  saveToStorage() {
    const data =
      this.mode === "comparison"
        ? {
            mode: "comparison",
            labels: this.labels,
            datasets: this.datasets,
            chartType: this.chartType,
            displayMode: this.displayMode,
          }
        : {
            mode: "single",
            entries: this.entries,
            chartType: this.chartType,
            displayMode: this.displayMode,
            unit: this.unit,
          };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const data = JSON.parse(saved);
      this.chartType = data.chartType || "bar";
      this.displayMode = data.displayMode || "absolute";
      if (data.mode === "comparison" && data.labels && data.datasets) {
        this.mode = "comparison";
        this.labels = data.labels;
        this.datasets = data.datasets;
      } else {
        this.mode = "single";
        this.entries = data.entries || [];
        this.unit = data.unit || "kWh";
        if (this.unitInput) this.unitInput.value = this.unit;
      }
    } catch (e) {
      // Données corrompues, on repart de zéro
    }
  }

  exportToJSON() {
    const data =
      this.mode === "comparison"
        ? {
            mode: "comparison",
            labels: this.labels,
            datasets: this.datasets,
            chartType: this.chartType,
            exportedAt: new Date().toISOString(),
          }
        : {
            mode: "single",
            chartType: this.chartType,
            entries: this.entries,
            exportedAt: new Date().toISOString(),
          };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `graphique_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  importFromJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.mode === "comparison") {
          if (!Array.isArray(data.labels) || !Array.isArray(data.datasets))
            throw new Error("Format invalide");
          this.mode = "comparison";
          this.labels = data.labels;
          this.datasets = data.datasets;
          this.chartType = data.chartType || "bar";
        } else {
          if (!Array.isArray(data.entries)) throw new Error("Format invalide");
          this.mode = "single";
          this.entries = data.entries.filter(
            (entry) => entry.label && typeof entry.value === "number",
          );
          this.chartType = data.chartType || "bar";
        }
        this.displayMode = data.displayMode || "absolute";
        this.saveToStorage();
        this.renderAll();
      } catch (err) {
        alert("Fichier invalide. Vérifiez le format JSON.");
      }
    };
    reader.readAsText(file);
  }

  // ─── AFFICHAGE kWh / % ──────────────────────────────────────

  getDisplayValues() {
    if (this.displayMode === "absolute") {
      return this.entries.map((e) => e.value);
    }
    const total = this.entries.reduce((sum, e) => sum + e.value, 0);
    if (total === 0) return this.entries.map(() => 0);
    return this.entries.map((e) => Math.round((e.value / total) * 1000) / 10);
  }

  getUnit() {
    return this.displayMode === "absolute" ? this.unit : "%";
  }

  setDisplayMode(mode) {
    if (mode === this.displayMode) return;
    this.displayMode = mode;
    this.updateDisplayToggle();
    this.renderChart();
    this.renderDataList();
    this.saveToStorage();
  }

  updateDisplayToggle() {
    if (!this.displayAbsoluteBtn || !this.displayPercentBtn) return;
    if (this.displayMode === "absolute") {
      this.displayAbsoluteBtn.classList.add("active");
      this.displayPercentBtn.classList.remove("active");
    } else {
      this.displayPercentBtn.classList.add("active");
      this.displayAbsoluteBtn.classList.remove("active");
    }
  }
}

new ChartGeneratorV2();
