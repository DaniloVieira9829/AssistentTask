class AIAssistant {
    constructor() {
        this.apiKey = null; // Configurar posteriormente
        this.context = this.getInitialContext();
    }

    getInitialContext() {
        return {
            userPreferences: {},
            taskPatterns: [],
            productivityTips: []
        };
    }

    async analyzeTasks(tasks) {
        // Simulação de análise de IA
        return {
            suggestions: this.generateSuggestions(tasks),
            priorities: this.calculatePriorities(tasks),
            insights: this.generateInsights(tasks)
        };
    }

    generateSuggestions(tasks) {
        const pendingTasks = tasks.filter(t => !t.completed);
        
        return [
            'Considere agrupar tarefas similares',
            'Priorize tarefas com prazos próximos',
            'Revise tarefas pendentes há mais de uma semana'
        ];
    }

    calculatePriorities(tasks) {
        // Lógica simples de priorização
        return tasks.map(task => ({
            taskId: task.id,
            priorityScore: this.calculatePriorityScore(task)
        }));
    }

    calculatePriorityScore(task) {
        let score = 0;
        if (task.priority === 'high') score += 3;
        if (task.priority === 'medium') score += 2;
        if (task.deadline) {
            const daysUntilDeadline = this.getDaysUntil(task.deadline);
            if (daysUntilDeadline < 3) score += 2;
        }
        return score;
    }

    getDaysUntil(dateString) {
        const today = new Date();
        const deadline = new Date(dateString);
        return Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    }

    generateInsights(tasks) {
        const stats = {
            completedThisWeek: tasks.filter(t => 
                t.completed && this.isThisWeek(t.completedAt)
            ).length,
            averageCompletionTime: this.calculateAverageCompletionTime(tasks)
        };

        return {
            weeklyProgress: `Você completou ${stats.completedThisWeek} tarefas esta semana`,
            productivityTip: this.getRandomProductivityTip()
        };
    }

    isThisWeek(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        return date >= startOfWeek;
    }

    calculateAverageCompletionTime(tasks) {
        const completedTasks = tasks.filter(t => t.completed && t.createdAt && t.completedAt);
        if (completedTasks.length === 0) return 0;

        const totalTime = completedTasks.reduce((sum, task) => {
            const created = new Date(task.createdAt);
            const completed = new Date(task.completedAt);
            return sum + (completed - created);
        }, 0);

        return Math.round(totalTime / completedTasks.length / (1000 * 60 * 60 * 24)); // em dias
    }

    getRandomProductivityTip() {
        const tips = [
            "Trabalhe em blocos de 25 minutos com pausas de 5 minutos (Técnica Pomodoro)",
            "Comece pelo item mais difícil do dia primeiro",
            "Revise suas tarefas no final do dia para planejar o próximo"
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }
}
