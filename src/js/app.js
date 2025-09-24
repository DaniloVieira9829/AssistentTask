// Configuração principal da aplicação
class TaskManagerApp {
    constructor() {
        this.currentSection = 'tasks';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.loadTasks();
        this.setupEventListeners();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.sidebar a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);
                this.showSection(target);
            });
        });
    }

    showSection(sectionId) {
        // Esconder todas as seções
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Mostrar seção selecionada
        document.getElementById(sectionId).classList.add('active');

        // Atualizar navegação
        document.querySelectorAll('.sidebar a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');

        this.currentSection = sectionId;
    }

    setupEventListeners() {
        // Formulário de tarefa
        document.getElementById('task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Filtros de tarefa
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterTasks(e.target.dataset.filter);
            });
        });
    }

    addTask() {
        const taskData = {
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-description').value,
            priority: document.getElementById('task-priority').value,
            deadline: document.getElementById('task-deadline').value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        const taskManager = new TaskManager();
        taskManager.addTask(taskData);
        this.closeTaskModal();
        this.loadTasks();
    }

    openTaskModal() {
        document.getElementById('task-modal').style.display = 'block';
    }

    closeTaskModal() {
        document.getElementById('task-modal').style.display = 'none';
        document.getElementById('task-form').reset();
    }

    loadTasks() {
        const taskManager = new TaskManager();
        const tasks = taskManager.getTasks();
        this.displayTasks(tasks);
    }

    displayTasks(tasks) {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    }

    createTaskElement(task) {
        const div = document.createElement('div');
        div.className = `task-item ${task.priority}-priority`;
        div.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <small>Prazo: ${task.deadline || 'Sem prazo'}</small>
            </div>
            <div>
                <button onclick="taskManager.toggleTask('${task.id}')">
                    ${task.completed ? '↶' : '✓'}
                </button>
                <button onclick="taskManager.deleteTask('${task.id}')">🗑️</button>
            </div>
        `;
        return div;
    }

    filterTasks(filter) {
        const taskManager = new TaskManager();
        let tasks = taskManager.getTasks();

        switch(filter) {
            case 'pending':
                tasks = tasks.filter(task => !task.completed);
                break;
            case 'completed':
                tasks = tasks.filter(task => task.completed);
                break;
            case 'high':
                tasks = tasks.filter(task => task.priority === 'high');
                break;
        }

        this.displayTasks(tasks);

        // Atualizar botões de filtro
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }
}

// Funções globais para uso no HTML
function openTaskModal() {
    app.openTaskModal();
}

function closeTaskModal() {
    app.closeTaskModal();
}

function showTerms() {
    alert('Termos de Uso: Veja o arquivo TERMS_OF_USE.md para detalhes.');
}

// Inicializar aplicação quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TaskManagerApp();
    window.taskManager = new TaskManager();
    window.aiAssistant = new AIAssistant();
});
