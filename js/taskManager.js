class TaskManager {
    constructor() {
        this.storageKey = 'smartTasks';
        this.init();
    }

    init() {
        if (!this.getTasks()) {
            this.saveTasks([]);
        }
    }

    getTasks() {
        const tasks = localStorage.getItem(this.storageKey);
        return tasks ? JSON.parse(tasks) : [];
    }

    saveTasks(tasks) {
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }

    addTask(taskData) {
        const tasks = this.getTasks();
        const newTask = {
            id: this.generateId(),
            ...taskData
        };
        tasks.push(newTask);
        this.saveTasks(tasks);
        this.notifyAI('taskAdded', newTask);
    }

    deleteTask(taskId) {
        let tasks = this.getTasks();
        tasks = tasks.filter(task => task.id !== taskId);
        this.saveTasks(tasks);
        this.notifyAI('taskDeleted', taskId);
    }

    toggleTask(taskId) {
        const tasks = this.getTasks();
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveTasks(tasks);
            this.notifyAI('taskToggled', task);
        }
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    notifyAI(action, data) {
        // Integração futura com IA
        console.log(`Ação: ${action}`, data);
    }

    getStatistics() {
        const tasks = this.getTasks();
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        
        return {
            total,
            completed,
            pending,
            completionRate: total > 0 ? (completed / total * 100).toFixed(1) : 0
        };
    }
}
