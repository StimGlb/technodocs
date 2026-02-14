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

    // FIX: #1 #3 - Créer PomodoroTimer dans TaskManager.init()
    this.pomodoroTimer = new PomodoroTimer(this);
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

    const startBtn = document.createElement('button');
    startBtn.className = 'btn-start';
    startBtn.textContent = '▶️';
    startBtn.title = 'Démarrer le timer';
    // FIX: #3 - Guard si pomodoroTimer pas initialisé
    startBtn.addEventListener('click', () => {
        if (!this.pomodoroTimer) return;
        this.pomodoroTimer.open(task);
    });

    // FIX: #7 - Un seul appendChild par élément, ordre correct
    actions.appendChild(startBtn);
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

// ========================================
// POMODORO TIMER - Étape 1
// ========================================

class PomodoroTimer {
    constructor(taskManager) {
        this.taskManager = taskManager;
        this.currentTask = null;
        this.isRunning = false;
        this.isPaused = false;
        this.isLocked = false;
        this.preparationTime = 15; // Secondes avant verrouillage
        this.timeRemaining = 0; // Secondes
        this.timeElapsed = 0; // Secondes réellement écoulées
        this.startTime = null;
        this.timerInterval = null;
        
        // Éléments DOM
        this.modal = document.getElementById('timerModal');
        this.titleEl = document.getElementById('timerTaskTitle');
        this.subjectEl = document.getElementById('timerTaskSubject');
        this.displayEl = document.getElementById('timerDisplay');
        this.phaseEl = document.getElementById('timerPhase');
        this.infoEl = document.getElementById('timerInfo');
        this.btnStart = document.getElementById('timerBtnStart');
        this.btnCancel = document.getElementById('timerBtnCancel');
        
        this.attachEvents();
        // FIX: #1 #2 - Retiré récursion infinie et this.init() inexistant
    }
    
    attachEvents() {
        this.btnStart.addEventListener('click', () => this.handleStart());
        this.btnCancel.addEventListener('click', () => this.handleCancel());
        
        // Clic sur overlay pour fermer (seulement si non verrouillé)
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal && !this.isLocked) {
                this.handleCancel();
            }
        });
        
        // FIX: #8 - Stocker la référence pour pouvoir retirer le listener
        this.keydownHandler = (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('is-open') && !this.isLocked) {
                this.handleCancel();
            }
        };
        document.addEventListener('keydown', this.keydownHandler);
    }
    
    // Ouvrir le modal avec une tâche
    open(task) {
        // FIX: #6 - Nettoyer les anciens intervals avant de réouvrir
        this.cleanup();

        this.currentTask = task;
        this.timeRemaining = task.pomodoros * 60; // Convertir minutes en secondes
        this.timeElapsed = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.isLocked = false;
        
        // Mettre à jour l'affichage
        this.titleEl.textContent = task.title;
        this.subjectEl.textContent = task.subject;
        this.updateDisplay();
        
        // État initial
        this.phaseEl.innerHTML = '<span class="phase-badge phase-badge--prep">Préparation</span>';
        this.infoEl.textContent = `Prêt(e) à travailler ${task.pomodoros} minutes ?`;
        this.btnStart.textContent = 'Démarrer';
        this.btnStart.disabled = false;
        this.btnCancel.disabled = false;
        
        // FIX: #10 - classList + reflow pour fiabiliser l'animation
        this.modal.style.display = 'flex';
        void this.modal.offsetWidth;
        this.modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        // FIX: #8 - Réattacher le listener keydown
        document.addEventListener('keydown', this.keydownHandler);
    }
    
    // Fermer le modal
    close() {
        // FIX: #10 - Retirer la classe d'animation
        this.modal.classList.remove('is-open');
        this.modal.style.display = 'none';
        document.body.style.overflow = '';
        this.cleanup();
    }
    
    // Gérer le bouton Démarrer
    handleStart() {
        if (!this.isRunning) {
            this.start();
        }
    }
    
    // Démarrer le timer
    start() {
        this.isRunning = true;
        this.startTime = Date.now();
        
        // Phase de préparation (5 secondes pour annuler)
        this.phaseEl.innerHTML = '<span class="phase-badge phase-badge--prep">🚀 Démarrage...</span>';
        this.infoEl.textContent = `Tu as ${this.preparationTime} secondes pour annuler`;
        this.btnStart.disabled = true;
        
        let prepCountdown = this.preparationTime;
        
        const prepInterval = setInterval(() => {
            prepCountdown--;
            this.infoEl.textContent = `Tu as ${prepCountdown} seconde${prepCountdown > 1 ? 's' : ''} pour annuler`;
            
            if (prepCountdown <= 0) {
                clearInterval(prepInterval);
                this.lock();
            }
        }, 1000);
        
        // Stocker pour pouvoir nettoyer si annulation
        this.preparationInterval = prepInterval;
    }
    
    // Verrouiller le timer (plus d'annulation possible)
    lock() {
        this.isLocked = true;
        this.btnCancel.disabled = true;
        this.btnCancel.style.opacity = '0.5';
        this.btnCancel.style.cursor = 'not-allowed';
        
        this.phaseEl.innerHTML = '<span class="phase-badge phase-badge--work">🔥 En cours</span>';
        this.infoEl.textContent = 'Timer verrouillé - Reste concentré !';
        
        // Démarrer le vrai compte à rebours
        this.startCountdown();
        
        // Avertissement si fermeture de fenêtre
        window.addEventListener('beforeunload', this.beforeUnloadHandler);
    }
    
    // Compte à rebours principal
    startCountdown() {
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.timeElapsed++;
            this.updateDisplay();
            
            if (this.timeRemaining <= 0) {
                this.complete();
            }
        }, 1000);
    }
    
    // Mise à jour de l'affichage MM:SS
    updateDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        this.displayEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    // Timer terminé
    complete() {
        clearInterval(this.timerInterval);
        window.removeEventListener('beforeunload', this.beforeUnloadHandler);

        // FIX: #9 - Vérifier que la tâche existe encore
        if (!this.taskManager.tasks.find(t => t.id === this.currentTask.id)) {
            console.warn('Tâche supprimée pendant le timer');
            this.taskManager.showToast('⚠️ Tâche introuvable', 'error');
            this.close();
            return;
        }

        this.phaseEl.innerHTML = '<span class="phase-badge phase-badge--done">✅ Terminé !</span>';
        this.infoEl.textContent = 'Bravo ! Prends une pause de 5 minutes.';
        this.displayEl.textContent = '00:00';
        
        // Marquer la tâche comme terminée
        this.taskManager.toggleTask(this.currentTask.id);
        
        // Notification
        this.taskManager.showToast('🎉 Timer terminé ! Bien joué !', 'success');
        
        // Fermer après 3 secondes
        setTimeout(() => {
            this.close();
        }, 3000);
    }
    
    // Gérer l'annulation
    handleCancel() {
        if (this.isLocked) {
            return; // Ne rien faire si verrouillé
        }
        
        if (this.preparationInterval) {
            clearInterval(this.preparationInterval);
        }
        
        this.close();
    }
    
    // Nettoyage
    cleanup() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        if (this.preparationInterval) {
            clearInterval(this.preparationInterval);
        }
        window.removeEventListener('beforeunload', this.beforeUnloadHandler);
        // FIX: #8 - Retirer le listener keydown
        if (this.keydownHandler) {
            document.removeEventListener('keydown', this.keydownHandler);
        }

        this.currentTask = null;
        this.isRunning = false;
        this.isLocked = false;
    }
    
    // Handler pour beforeunload
    beforeUnloadHandler = (e) => {
        e.preventDefault();
        e.returnValue = 'Timer en cours ! Tu vas perdre ta progression.';
        return e.returnValue;
    };
}

// Initialisation
const taskManager = new TaskManager();
window.taskManager = taskManager;
