/**
 * Task Manager avec méthode Pomodoro
 * Stockage localStorage + export JSON + impression
 */

class TaskManager {
    constructor() {
        this.tasks = [];
        this.storageKey = 'technodocs_tasks';
        
        this.form = document.getElementById('taskForm');
        this.taskList = document.getElementById('taskList');
        
        this.statTotal = document.getElementById('statTotal');
        this.statCompleted = document.getElementById('statCompleted');
        this.statPomodoros = document.getElementById('statPomodoros');
        
        this.init();
    }
    
    init() {
        // Charger les tâches depuis localStorage
        this.loadTasks();
        
        // Attacher l'événement du formulaire
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });
        
        // Afficher les tâches et stats
        this.render();
    }
    
    loadTasks() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                this.tasks = JSON.parse(stored);
            } catch (e) {
                console.error('Erreur chargement tâches:', e);
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
            title: document.getElementById('taskTitle').value.trim(),
            subject: document.getElementById('taskSubject').value,
            type: document.getElementById('taskType').value,
            pomodoros: parseInt(document.getElementById('taskPomodoros').value),
            notes: document.getElementById('taskNotes').value.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.unshift(task);
        this.saveTasks();
        this.render();
        this.form.reset();
        
        // Animation de confirmation
        this.showToast('✅ Tâche ajoutée !');
    }
    
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveTasks();
            this.render();
        }
    }
    
    deleteTask(id) {
        if (confirm('Supprimer cette tâche ?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.render();
            this.showToast('🗑️ Tâche supprimée');
        }
    }
    
    clearCompleted() {
        const count = this.tasks.filter(t => t.completed).length;
        if (count === 0) {
            this.showToast('Aucune tâche terminée');
            return;
        }
        
        if (confirm(`Supprimer ${count} tâche(s) terminée(s) ?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.render();
            this.showToast(`✅ ${count} tâche(s) supprimée(s)`);
        }
    }
    
    render() {
        // Vider la liste
        this.taskList.innerHTML = '';
        
        if (this.tasks.length === 0) {
            this.taskList.innerHTML = `
                <div style="text-align: center; padding: var(--space-8); color: var(--color-gray-500);">
                    <p style="font-size: var(--text-lg);">📝 Aucune tâche</p>
                    <p style="font-size: var(--text-sm);">Ajoute ta première tâche ci-dessus !</p>
                </div>
            `;
        } else {
            this.tasks.forEach(task => {
                const item = this.createTaskElement(task);
                this.taskList.appendChild(item);
            });
        }
        
        // Mettre à jour les stats
        this.updateStats();
    }
    
    createTaskElement(task) {
        const div = document.createElement('div');
        div.className = `task-item ${task.completed ? 'task-item--completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => this.toggleTask(task.id));
        
        const content = document.createElement('div');
        content.className = 'task-item__content';
        
        const title = document.createElement('div');
        title.className = 'task-item__title';
        title.textContent = task.title;
        
        const meta = document.createElement('div');
        meta.className = 'task-item__meta';
        
        const subject = document.createElement('span');
        subject.className = 'task-item__tag';
        subject.textContent = task.subject;
        
        const type = document.createElement('span');
        type.textContent = task.type;
        
        const pomodoros = document.createElement('span');
        pomodoros.textContent = `🍅 ${task.pomodoros} × 25 min`;
        
        meta.appendChild(subject);
        meta.appendChild(type);
        meta.appendChild(pomodoros);
        
        if (task.notes) {
            const notes = document.createElement('div');
            notes.style.fontSize = 'var(--text-sm)';
            notes.style.color = 'var(--color-gray-500)';
            notes.textContent = task.notes;
            content.appendChild(title);
            content.appendChild(meta);
            content.appendChild(notes);
        } else {
            content.appendChild(title);
            content.appendChild(meta);
        }
        
        const actions = document.createElement('div');
        actions.className = 'task-item__actions';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-btn task-btn--delete';
        deleteBtn.textContent = '🗑️';
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
        
        actions.appendChild(deleteBtn);
        
        div.appendChild(checkbox);
        div.appendChild(content);
        div.appendChild(actions);
        
        return div;
    }
    
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const totalPomodoros = this.tasks.reduce((sum, t) => sum + t.pomodoros, 0);
        
        this.statTotal.textContent = total;
        this.statCompleted.textContent = completed;
        this.statPomodoros.textContent = totalPomodoros;
    }
    
    exportJSON() {
        const data = {
            exportedAt: new Date().toISOString(),
            tasks: this.tasks,
            stats: {
                total: this.tasks.length,
                completed: this.tasks.filter(t => t.completed).length,
                totalPomodoros: this.tasks.reduce((sum, t) => sum + t.pomodoros, 0)
            }
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tasks_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showToast('📥 Export réussi !');
    }
    
    printTasks() {
        window.print();
    }
    
    showToast(message) {
        // Toast simple (peut être amélioré avec un système de toast global)
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: var(--space-6);
            right: var(--space-6);
            background: var(--color-gray-900);
            color: var(--color-white);
            padding: var(--space-3) var(--space-4);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
}

// Initialisation
const taskManager = new TaskManager();

// Exposer globalement pour les boutons onclick
window.taskManager = taskManager;

// Animations toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);