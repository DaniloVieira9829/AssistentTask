class Chat {
    constructor() {
        this.messages = [];
        this.init();
    }

    init() {
        this.loadMessages();
        this.setupChatInput();
    }

    setupChatInput() {
        const input = document.getElementById('chat-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (!message) return;

        this.addMessage('user', message);
        input.value = '';

        // Simular resposta da IA
        const aiResponse = await this.generateAIResponse(message);
        setTimeout(() => {
            this.addMessage('ai', aiResponse);
        }, 1000);
    }

    addMessage(sender, content) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<strong>${sender === 'ai' ? 'Assistente IA' : 'Você'}:</strong> ${content}`;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.messages.push({ sender, content, timestamp: new Date() });
        this.saveMessages();
    }

    async generateAIResponse(message) {
        // Simulação de resposta da IA
        const responses = {
            'ola': 'Olá! Como posso ajudar você com suas tarefas hoje?',
            'prioridade': 'Baseado em suas tarefas, recomendo focar nas com prazos próximos primeiro.',
            'estatísticas': 'Vou analisar seu progresso...',
            'default': 'Entendi. Posso ajudar você a organizar melhor suas tarefas. Que tal revisarmos suas prioridades?'
        };

        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('ola') || lowerMessage.includes('oi')) {
            return responses['ola'];
        } else if (lowerMessage.includes('prioridad')) {
            return responses['prioridade'];
        } else if (lowerMessage.includes('estatística') || lowerMessage.includes('progresso')) {
            return responses['estatísticas'];
        } else {
            return responses['default'];
        }
    }

    saveMessages() {
        localStorage.setItem('chatMessages', JSON.stringify(this.messages));
    }

    loadMessages() {
        const saved = localStorage.getItem('chatMessages');
        if (saved) {
            this.messages = JSON.parse(saved);
            this.messages.forEach(msg => {
                this.addMessage(msg.sender, msg.content, false);
            });
        }
    }
}

// Função global para uso no HTML
function sendMessage() {
    if (window.chat) {
        window.chat.sendMessage();
    }
}

// Inicializar chat quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    window.chat = new Chat();
});
