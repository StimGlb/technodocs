/**
 * Task Manager avec méthode Pomodoro
 * Style cyberpunk/tech avec tools.css
 */

class TaskManager {
  constructor() {
    this.tasks = [];
    this.storageKey = "technodocs_tasks";

    this.form = document.getElementById("taskForm");
    this.taskList = document.getElementById("taskList");

    this.statTotal = document.getElementById("statTotal");
    this.statCompleted = document.getElementById("statCompleted");
    this.statTotalMinutes = document.getElementById("statTotalMinutes");
    this.statEstimatedPomodoros = document.getElementById(
      "statEstimatedPomodoros",
    );
    this.statSubjects = document.getElementById("statSubjects");

    this.init();
  }

  init() {
    this.loadTasks();

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addTask();
    });
    this.render();
  }

  loadTasks() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        this.tasks = JSON.parse(stored);
      } catch (e) {
        console.error("Erreur chargement tâches:", e);
        this.tasks = [];
      }
    }
  }

  saveTasks() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  addTask() {
    const task = {
      id: Date.now().toString(),
      title: document.getElementById("taskTitle").value.trim(),
      subject: document.getElementById("taskSubject").value,
      type: document.getElementById("taskType").value,
      pomodoros: parseInt(document.getElementById("taskPomodoros").value),
      notes: document.getElementById("taskNotes").value.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.tasks.unshift(task);
    this.saveTasks();
    this.render();
    this.form.reset();

    this.showToast("✅ Tâche ajoutée !", "success");
  }

  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date().toISOString() : null;
      this.saveTasks();
      this.render();
    }
  }

  deleteTask(id) {
    if (confirm("Supprimer cette tâche ?")) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      this.saveTasks();
      this.render();
      this.showToast("🗑️ Tâche supprimée", "success");
    }
  }

  clearCompleted() {
    const count = this.tasks.filter((t) => t.completed).length;
    if (count === 0) {
      this.showToast("Aucune tâche terminée", "error");
      return;
    }

    if (confirm(`Supprimer ${count} tâche(s) terminée(s) ?`)) {
      this.tasks = this.tasks.filter((t) => !t.completed);
      this.saveTasks();
      this.render();
      this.showToast(`✅ ${count} tâche(s) supprimée(s)`, "success");
    }
  }

  render() {
    this.taskList.innerHTML = "";

    if (this.tasks.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = `
                <div class="empty-state__icon">📝</div>
                <div class="empty-state__title">Aucune tâche</div>
                <div class="empty-state__text">Ajoute ta première tâche ci-dessus !</div>
            `;
      this.taskList.appendChild(empty);
    } else {
      this.tasks.forEach((task) => {
        const item = this.createTaskElement(task);
        this.taskList.appendChild(item);
      });
    }

    this.updateStats();
  }

  createTaskElement(task) {
    const div = document.createElement("div");
    div.className = `task-item ${task.completed ? "task-item--completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => this.toggleTask(task.id));

    const content = document.createElement("div");
    content.className = "task-item__content";

    const title = document.createElement("div");
    title.className = "task-item__title";
    title.textContent = task.title;

    const meta = document.createElement("div");
    meta.className = "task-item__meta";

    const subject = document.createElement("span");
    subject.className = "task-item__tag";
    subject.textContent = task.subject;

    const type = document.createElement("span");
    type.textContent = `📌 ${task.type}`;

    const pomodoros = document.createElement("span");
    // `task.pomodoros` now stores minutes per task. Show minutes and estimated pomodoro count.
    const estimated = Math.max(1, Math.ceil(task.pomodoros / 25));
    pomodoros.textContent = `⏱ ${task.pomodoros} min • 🍅 ${estimated} pomodoro(s)`;

    meta.appendChild(subject);
    meta.appendChild(type);
    meta.appendChild(pomodoros);

    content.appendChild(title);
    content.appendChild(meta);

    if (task.notes) {
      const notes = document.createElement("div");
      notes.className = "task-item__notes";
      notes.textContent = task.notes;
      content.appendChild(notes);
    }

    const actions = document.createElement("div");
    actions.className = "task-item__actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", () => this.deleteTask(task.id));

    actions.appendChild(deleteBtn);

    div.appendChild(checkbox);
    div.appendChild(content);
    div.appendChild(actions);

    return div;
  }

  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.completed).length;
    // totalMinutes: sum of minutes chosen for each task
    const totalMinutes = this.tasks.reduce(
      (sum, t) => sum + (Number(t.pomodoros) || 0),
      0,
    );
    const estimatedPomodoros = this.tasks.reduce(
      (sum, t) => sum + Math.max(1, Math.ceil((Number(t.pomodoros) || 0) / 25)),
      0,
    );
    const subjects = this.tasks
      .map((t) => (t.subject || "").trim())
      .filter(Boolean);
    const distinctSubjects = new Set(subjects).size;

    this.statTotal.textContent = total;
    this.statCompleted.textContent = completed;
    this.statTotalMinutes.textContent = totalMinutes;
    this.statEstimatedPomodoros.textContent = estimatedPomodoros;
    this.statSubjects.textContent = distinctSubjects;
  }

  exportJSON() {
    const data = {
      exportedAt: new Date().toISOString(),
      tasks: this.tasks,
      stats: {
        total: this.tasks.length,
        completed: this.tasks.filter((t) => t.completed).length,
        totalMinutes: this.tasks.reduce(
          (sum, t) => sum + (Number(t.pomodoros) || 0),
          0,
        ),
        estimatedPomodoros: this.tasks.reduce(
          (sum, t) =>
            sum + Math.max(1, Math.ceil((Number(t.pomodoros) || 0) / 25)),
          0,
        ),
        distinctSubjects: (() => {
          const subjects = this.tasks
            .map((t) => (t.subject || "").trim())
            .filter(Boolean);
          return new Set(subjects).size;
        })(),
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tasks_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    this.showToast("📥 Export réussi !", "success");
  }

  printTasks() {
    window.print();
  }

  showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideInRight 0.3s ease reverse";
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
}

// Initialisation
const taskManager = new TaskManager();
window.taskManager = taskManager;
