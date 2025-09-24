#!/data/data/com.termux/files/usr/bin/bash
echo "📱 ASSISTENTTASK - DEPLOY NO TERMUX"
echo "===================================="

# Verificar se o Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git não instalado. Instalando..."
    pkg install git -y
fi

# Configurar Git
echo "🔧 Configurando Git..."
git config --global user.name "DaniloVieira9829"
git config --global user.email "vieiradanilo272@gmail.com"

# Verificar se está no diretório correto
if [ ! -f "README.md" ]; then
    echo "⚠️  Certifique-se de estar na pasta do projeto AssistentTask"
    echo "📁 Use: cd /caminho/para/AssistentTask"
    exit 1
fi

# Inicializar repositório
echo "🔄 Inicializando repositório Git..."
git init

# Adicionar arquivos
echo "📁 Adicionando arquivos..."
git add .

# Primeiro commit
echo "💾 Fazendo commit..."
git commit -m "🚀 Deploy from Termux: AssistentTask - Gerenciador de Tarefas IA

- Sistema completo de gerenciamento de tarefas
- Integração com IA para sugestões automáticas
- Chat inteligente com assistente virtual
- Design responsivo e moderno
- Documentação completa"

# Ajustar branch para main
echo "🌿 Ajustando branch..."
git branch -M main

# Conectar com GitHub
echo "🔗 Conectando com GitHub..."
git remote add origin https://github.com/DaniloVieira9829/AssistentTask.git

# Fazer push
echo "🚀 Enviando para GitHub..."
git push -u origin main --force

echo ""
echo "✅ DEPLOY CONCLUÍDO!"
echo "===================="
echo "🌐 Acesse: https://github.com/DaniloVieira9829/AssistentTask"
echo "📧 Suporte: vieiradanilo272@gmail.com"
