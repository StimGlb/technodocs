const STORAGE_KEY = "technodocs_chart_generator_v2";

const COLOR_PALETTE = [
  { bg: "rgba(99, 102, 241, 0.75)", border: "rgb(99, 102, 241)" },        // Indigo
  { bg: "rgba(139, 92, 246, 0.75)", border: "rgb(139, 92, 246)" },        // Violet
  { bg: "rgba(236, 72, 153, 0.75)", border: "rgb(236, 72, 153)" },        // Rose
  { bg: "rgba(251, 146, 60, 0.75)", border: "rgb(251, 146, 60)" },        // Orange
  { bg: "rgba(34, 197, 94, 0.75)", border: "rgb(34, 197, 94)" },          // Vert
  { bg: "rgba(14, 165, 233, 0.75)", border: "rgb(14, 165, 233)" },        // Bleu ciel
  { bg: "rgba(168, 85, 247, 0.75)", border: "rgb(168, 85, 247)" },        // Pourpre
  { bg: "rgba(244, 63, 94, 0.75)", border: "rgb(244, 63, 94)" },          // Rouge
  { bg: "rgba(59, 130, 246, 0.75)", border: "rgb(59, 130, 246)" },        // Bleu
  { bg: "rgba(16, 185, 129, 0.75)", border: "rgb(16, 185, 129)" },        // Vert émeraude
  { bg: "rgba(236, 201, 75, 0.75)", border: "rgb(236, 201, 75)" },        // Jaune
  { bg: "rgba(249, 115, 22, 0.75)", border: "rgb(249, 115, 22)" },        // Orange foncé
  { bg: "rgba(219, 39, 119, 0.75)", border: "rgb(219, 39, 119)" },        // Rose foncé
  { bg: "rgba(79, 172, 254, 0.75)", border: "rgb(79, 172, 254)" },        // Bleu ciel clair
  { bg: "rgba(124, 58, 255, 0.75)", border: "rgb(124, 58, 255)" },        // Violet clair
  { bg: "rgba(20, 184, 166, 0.75)", border: "rgb(20, 184, 166)" },        // Teal
];

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
    this.fixedTotal = null; // Optional fixed total for % calculation
    this.chart = null;
    this.editingIndex = null; // Track which entry is being edited
    this.usedColorIndices = new Set(); // Track which colors have been used

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
    console.log("🚀 Initialisation du Générateur de Graphiques v2");
    this.cacheElements();
    this.bindEvents();
    this.loadFromStorage();
    this.renderAll();
    console.log("✅ Générateur prêt");
  }

  cacheElements() {
    this.canvasElement = document.getElementById("chartCanvas");
    this.labelInput = document.getElementById("labelInput");
    this.valueInput = document.getElementById("valueInput");
    this.addBtn = document.getElementById("addBtn");
    this.clearAllBtn = document.getElementById("clearAllBtn");
    this.chartTypeBarBtn = document.getElementById("chartTypeBar");
    this.chartTypeLineBtn = document.getElementById("chartTypeLine");
    this.chartTypePieBtn = document.getElementById("chartTypePie");
    this.dataListElement = document.getElementById("dataList");
    this.formPanel = document.getElementById("formPanel");
    this.displayPanel = document.getElementById("displayPanel");
    this.displayAbsoluteBtn = document.getElementById("displayAbsolute");
    this.displayPercentBtn = document.getElementById("displayPercent");
    this.unitInput = document.getElementById("unitInput");
    this.fixedTotalInput = document.getElementById("fixedTotalInput");
    this.fixedTotalGroup = document.getElementById("fixedTotalGroup");
    this.statsPanel = document.getElementById("statsPanel");
    this.statsContent = document.getElementById("statsContent");
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

  recalculateUsedColors() {
    this.usedColorIndices.clear();
    this.entries.forEach((entry) => {
      if (entry.color) {
        const colorIndex = COLOR_PALETTE.findIndex(
          (c) => c.bg === entry.color.bg && c.border === entry.color.border,
        );
        if (colorIndex !== -1) {
          this.usedColorIndices.add(colorIndex);
        }
      }
    });
  }

  getRandomColor() {
    // Trouver les couleurs non utilisées
    const availableIndices = Array.from(
      { length: COLOR_PALETTE.length },
      (_, i) => i,
    ).filter((i) => !this.usedColorIndices.has(i));

    // Si toutes les couleurs sont utilisées, réinitialiser
    if (availableIndices.length === 0) {
      this.usedColorIndices.clear();
      availableIndices.push(
        ...Array.from({ length: COLOR_PALETTE.length }, (_, i) => i),
      );
    }

    // Choisir une couleur aléatoire parmi les disponibles
    const randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    this.usedColorIndices.add(randomIndex);

    return COLOR_PALETTE[randomIndex];
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
    this.chartTypePieBtn.addEventListener("click", () =>
      this.setChartType("pie"),
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
      .getElementById("chartExportPNG")
      ?.addEventListener("click", () => this.exportToPNG());

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

    this.fixedTotalInput?.addEventListener("input", () => {
      const value = this.fixedTotalInput.value.trim();
      this.fixedTotal = value ? parseFloat(value) : null;
      if (
        this.mode === "single" &&
        this.displayMode === "percent" &&
        this.entries.length > 0
      ) {
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
    this.renderStats();
    this.updateTypeToggle();
    this.updateDisplayToggle();
    this.updateFixedTotalVisibility();
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

    const color = this.getRandomColor();
    this.entries.push({ label, value, color });
    this.labelInput.value = "";
    this.valueInput.value = "";
    this.labelInput.focus();
    this.saveToStorage();
    this.renderChart();
    this.renderDataList();
    this.renderStats();
  }

  removeEntry(index) {
    this.entries.splice(index, 1);
    this.saveToStorage();
    this.renderChart();
    this.renderDataList();
    this.renderStats();
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
    // Reset all buttons
    this.chartTypeBarBtn.classList.remove("active");
    this.chartTypeLineBtn.classList.remove("active");
    this.chartTypePieBtn.classList.remove("active");

    // Activate current type
    if (this.chartType === "bar") {
      this.chartTypeBarBtn.classList.add("active");
    } else if (this.chartType === "line") {
      this.chartTypeLineBtn.classList.add("active");
    } else if (this.chartType === "pie") {
      this.chartTypePieBtn.classList.add("active");
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
    if (this.chartType === "pie") {
      this.renderPieChart();
      return;
    }

    const ctx = this.canvasElement.getContext("2d");
    const gridColor = "rgba(156, 163, 175, 0.15)";
    const tickColor = "#9ca3af";
    const unit = this.getUnit();
    const displayValues = this.getDisplayValues();

    // Couleur par barre : utiliser la couleur assignée à chaque entrée
    const bgColors = this.entries.map((e) =>
      e.color ? e.color.bg : "rgba(99, 102, 241, 0.7)",
    );
    const borderColors = this.entries.map((e) =>
      e.color ? e.color.border : "rgb(99, 102, 241)",
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

  renderPieChart() {
    const ctx = this.canvasElement.getContext("2d");
    const displayValues = this.getDisplayValues();
    const unit = this.getUnit();

    // Couleurs pour les slices
    const bgColors = this.entries.map((e) =>
      e.color ? e.color.bg : "rgba(99, 102, 241, 0.7)",
    );

    this.chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: this.entries.map((e) => e.label),
        datasets: [
          {
            data: displayValues,
            backgroundColor: bgColors,
            borderColor: "#111827",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "right",
            align: "center",
            labels: {
              color: "#d1d5db",
              font: { size: 12, weight: "500" },
              padding: 16,
              usePointStyle: false,
              pointStyle: "rect",
              boxWidth: 12,
              boxHeight: 12,
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
              label: (ctx) => {
                const value = ctx.parsed;
                if (this.displayMode === "percent") {
                  return ` ${value}%`;
                }
                return ` ${value} ${unit}`;
              },
            },
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
      const isEditing = this.editingIndex === index;
      item.className =
        "data-item" +
        (entry.label === "Veille" ? " data-item--veille" : "") +
        (isEditing ? " edit-mode" : "");

      if (isEditing) {
        this.renderEditMode(item, entry, index);
      } else {
        this.renderViewMode(item, entry, index, displayValues[index], unit);
      }

      this.dataListElement.appendChild(item);
    });
  }

  renderViewMode(item, entry, index, displayValue, unit) {
    const content = document.createElement("div");
    content.className = "data-item-content";

    // Indicateur de couleur
    const colorDot = document.createElement("span");
    colorDot.className = "data-item-color-dot";
    colorDot.style.background = entry.color ? entry.color.border : "rgb(99, 102, 241)";
    colorDot.style.width = "12px";
    colorDot.style.height = "12px";
    colorDot.style.borderRadius = "2px";
    colorDot.style.flexShrink = "0";

    const labelEl = document.createElement("span");
    labelEl.className = "data-item-label";
    labelEl.textContent = entry.label;

    const valueEl = document.createElement("span");
    valueEl.className = "data-item-value";
    valueEl.textContent = `${displayValue} ${unit}`;

    content.appendChild(colorDot);
    content.appendChild(labelEl);
    content.appendChild(valueEl);

    const editBtn = document.createElement("button");
    editBtn.className = "btn-item-edit";
    editBtn.textContent = "✎ Éditer";
    editBtn.setAttribute("aria-label", `Éditer ${entry.label}`);
    editBtn.addEventListener("click", () => this.startEditEntry(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-item-delete";
    deleteBtn.textContent = "Supprimer";
    deleteBtn.setAttribute("aria-label", `Supprimer ${entry.label}`);
    deleteBtn.addEventListener("click", () => this.removeEntry(index));

    item.appendChild(content);
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);
  }

  renderEditMode(item, entry, index) {
    const labelInput = document.createElement("input");
    labelInput.className = "data-item-edit-input";
    labelInput.type = "text";
    labelInput.value = entry.label;
    labelInput.setAttribute("aria-label", "Éditer l'étiquette");
    labelInput.focus();

    const valueInput = document.createElement("input");
    valueInput.className = "data-item-edit-input";
    valueInput.type = "number";
    valueInput.min = "0";
    valueInput.value = entry.value;
    valueInput.setAttribute("aria-label", "Éditer la valeur");

    const saveBtn = document.createElement("button");
    saveBtn.className = "btn-item-save";
    saveBtn.textContent = "✓ Valider";
    saveBtn.addEventListener("click", () =>
      this.saveEditEntry(index, labelInput.value, parseFloat(valueInput.value)),
    );

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "btn-item-cancel";
    cancelBtn.textContent = "✕ Annuler";
    cancelBtn.addEventListener("click", () => this.cancelEditEntry());

    // Allow Enter to save, Escape to cancel
    [labelInput, valueInput].forEach((input) => {
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter")
          this.saveEditEntry(
            index,
            labelInput.value,
            parseFloat(valueInput.value),
          );
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.cancelEditEntry();
      });
    });

    item.appendChild(labelInput);
    item.appendChild(valueInput);
    item.appendChild(saveBtn);
    item.appendChild(cancelBtn);
  }

  startEditEntry(index) {
    this.editingIndex = index;
    this.renderDataList();
  }

  saveEditEntry(index, newLabel, newValue) {
    const label = newLabel.trim();
    const value = parseFloat(newValue);

    if (!label) {
      this.showError("L'étiquette ne peut pas être vide.");
      return;
    }
    if (isNaN(value) || value < 0) {
      this.showError("La valeur doit être un nombre positif.");
      return;
    }

    // Préserver la couleur lors de l'édition
    const color = this.entries[index].color;
    this.entries[index] = { label, value, color };
    this.editingIndex = null;
    this.clearError();
    this.saveToStorage();
    this.renderChart();
    this.renderDataList();
    this.renderStats();
  }

  cancelEditEntry() {
    this.editingIndex = null;
    this.clearError();
    this.renderDataList();
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
            fixedTotal: this.fixedTotal,
          };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log(
      "💾 Données sauvegardées dans localStorage:",
      data,
    );
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        console.log("ℹ️ Aucune donnée dans localStorage");
        return;
      }
      const data = JSON.parse(saved);
      console.log("📂 Données chargées depuis localStorage:", data);
      this.chartType = data.chartType || "bar";
      this.displayMode = data.displayMode || "absolute";
      if (data.mode === "comparison" && data.labels && data.datasets) {
        this.mode = "comparison";
        this.labels = data.labels;
        this.datasets = data.datasets;
      } else {
        this.mode = "single";
        this.entries = (data.entries || []).map((entry) => ({
          ...entry,
          color: entry.color || this.getRandomColor(),
        }));
        this.unit = data.unit || "kWh";
        this.fixedTotal = data.fixedTotal || null;
        if (this.unitInput) this.unitInput.value = this.unit;
        if (this.fixedTotalInput && this.fixedTotal) {
          this.fixedTotalInput.value = this.fixedTotal;
        }
        // Recalculer les couleurs utilisées
        this.recalculateUsedColors();
      }
    } catch (e) {
      console.error("⚠️ Erreur lors du chargement du localStorage:", e);
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
            unit: this.unit,
            fixedTotal: this.fixedTotal,
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
          this.entries = data.entries
            .filter((entry) => entry.label && typeof entry.value === "number")
            .map((entry) => ({
              ...entry,
              color: entry.color || this.getRandomColor(),
            }));
          this.chartType = data.chartType || "bar";
          this.unit = data.unit || "kWh";
          this.fixedTotal = data.fixedTotal || null;
          if (this.unitInput) this.unitInput.value = this.unit;
          if (this.fixedTotalInput && this.fixedTotal) {
            this.fixedTotalInput.value = this.fixedTotal;
          }
          // Recalculer les couleurs utilisées
          this.recalculateUsedColors();
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

  exportToPNG() {
    try {
      const canvas = this.canvasElement;
      if (!canvas || !this.chart) {
        alert(
          "Aucun graphique à exporter. Veuillez d'abord créer des données.",
        );
        return;
      }

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `graphique_${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("📸 Graphique exporté en PNG");
    } catch (err) {
      console.error("Erreur lors de l'export PNG:", err);
      alert("Erreur lors de l'export PNG.");
    }
  }

  // ─── AFFICHAGE kWh / % ──────────────────────────────────────

  getDisplayValues() {
    if (this.displayMode === "absolute") {
      return this.entries.map((e) => e.value);
    }
    // Use fixedTotal if provided, otherwise calculate from sum
    const total =
      this.fixedTotal !== null && this.fixedTotal > 0
        ? this.fixedTotal
        : this.entries.reduce((sum, e) => sum + e.value, 0);
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
    this.updateFixedTotalVisibility();
    this.renderChart();
    this.renderDataList();
    this.renderStats();
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

  updateFixedTotalVisibility() {
    if (this.fixedTotalGroup) {
      this.fixedTotalGroup.style.display =
        this.displayMode === "percent" ? "" : "none";
    }
  }

  calculateStats() {
    if (this.mode !== "single" || this.entries.length === 0) {
      return null;
    }

    const values = this.entries.map((e) => e.value);
    const total = values.reduce((sum, v) => sum + v, 0);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const average = total / values.length;

    return { total, min, max, average };
  }

  renderStats() {
    if (!this.statsPanel || !this.statsContent) return;

    const stats = this.calculateStats();
    const unit = this.unit;

    if (!stats) {
      this.statsPanel.style.display = "none";
      return;
    }

    this.statsPanel.style.display = "";
    this.statsContent.textContent = "";

    const grid = document.createElement("div");
    grid.className = "stats-grid";

    const statItems = [
      {
        label: "Total",
        value: `${Math.round(stats.total * 10) / 10} ${unit}`,
        emoji: "📊",
      },
      {
        label: "Moyenne",
        value: `${Math.round(stats.average * 10) / 10} ${unit}`,
        emoji: "📈",
      },
      {
        label: "Min",
        value: `${Math.round(stats.min * 10) / 10} ${unit}`,
        emoji: "⬇️",
      },
      {
        label: "Max",
        value: `${Math.round(stats.max * 10) / 10} ${unit}`,
        emoji: "⬆️",
      },
    ];

    statItems.forEach(({ label, value, emoji }) => {
      const item = document.createElement("div");
      item.className = "stat-item";

      const labelEl = document.createElement("div");
      labelEl.className = "stat-label";
      labelEl.textContent = `${emoji} ${label}`;

      const valueEl = document.createElement("div");
      valueEl.className = "stat-value";
      valueEl.textContent = value;

      item.appendChild(labelEl);
      item.appendChild(valueEl);
      grid.appendChild(item);
    });

    this.statsContent.appendChild(grid);
  }
}

new ChartGeneratorV2();
