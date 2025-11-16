# Script para fazer push do conteúdo local para o GitHub
# Push para o repositório https://github.com/alisson-rr/ebook

Write-Host "🚀 Iniciando push para GitHub..." -ForegroundColor Green

# Verificar se Git está instalado
try {
    git --version
    Write-Host "✅ Git encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não encontrado. Instale o Git primeiro." -ForegroundColor Red
    exit 1
}

# Inicializar repositório Git se não existir
if (-not (Test-Path ".git")) {
    Write-Host "📁 Inicializando repositório Git..." -ForegroundColor Yellow
    git init
}

# Adicionar remote origin (sobrescrever se já existir)
Write-Host "🔗 Configurando remote origin..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/alisson-rr/ebook.git

# Adicionar todos os arquivos
Write-Host "📦 Adicionando arquivos..." -ForegroundColor Yellow
git add .

# Fazer commit
Write-Host "💾 Fazendo commit..." -ForegroundColor Yellow
$commitMessage = "feat: Nova landing page do Método C.A.R.E - Sobrescreve conteúdo anterior"
git commit -m $commitMessage

# Push para o repositório
Write-Host "🚀 Fazendo push para o repositório..." -ForegroundColor Yellow

# Tentar push normal primeiro
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Push normal falhou. Tentando push forçado..." -ForegroundColor Yellow
    Write-Host "⚠️  ATENÇÃO: Isso pode sobrescrever conteúdo existente!" -ForegroundColor Red
    $confirm = Read-Host "Deseja continuar com push forçado? (s/N)"
    
    if ($confirm -eq "s" -or $confirm -eq "S") {
        git push -f origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Push forçado realizado com sucesso!" -ForegroundColor Green
            Write-Host "🌐 Repositório atualizado: https://github.com/alisson-rr/ebook" -ForegroundColor Cyan
        } else {
            Write-Host "❌ Erro no push. Verifique suas credenciais do GitHub." -ForegroundColor Red
            Write-Host "💡 Dica: Configure suas credenciais com:" -ForegroundColor Yellow
            Write-Host "   git config --global user.name 'Seu Nome'" -ForegroundColor Gray
            Write-Host "   git config --global user.email 'seu@email.com'" -ForegroundColor Gray
        }
    } else {
        Write-Host "❌ Push cancelado pelo usuário." -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ Push realizado com sucesso!" -ForegroundColor Green
    Write-Host "🌐 Repositório atualizado: https://github.com/alisson-rr/ebook" -ForegroundColor Cyan
}

Write-Host "🏁 Script finalizado." -ForegroundColor Green
