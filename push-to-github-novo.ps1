# Script para fazer push do conteudo local para o GitHub
# Push para o repositorio https://github.com/alisson-rr/ebook

Write-Host "Iniciando push para GitHub..." -ForegroundColor Green

# Verificar se Git esta instalado
try {
    git --version
    Write-Host "Git encontrado" -ForegroundColor Green
} catch {
    Write-Host "Git nao encontrado. Instale o Git primeiro." -ForegroundColor Red
    exit 1
}

# Inicializar repositorio Git se nao existir
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
}

# Adicionar remote origin (sobrescrever se ja existir)
Write-Host "Configurando remote origin..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/alisson-rr/ebook.git

# Adicionar todos os arquivos
Write-Host "Adicionando arquivos..." -ForegroundColor Yellow
git add .

# Fazer commit
Write-Host "Fazendo commit..." -ForegroundColor Yellow
$commitMessage = "feat: Nova landing page do Metodo C.A.R.E"
git commit -m $commitMessage

# Push para o repositorio
Write-Host "Fazendo push para o repositorio..." -ForegroundColor Yellow

# Tentar push normal primeiro
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Push normal falhou. Tentando push forcado..." -ForegroundColor Yellow
    Write-Host "ATENCAO: Isso pode sobrescrever conteudo existente!" -ForegroundColor Red
    $confirm = Read-Host "Deseja continuar com push forcado? (s/N)"
    
    if ($confirm -eq "s" -or $confirm -eq "S") {
        git push -f origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Push forcado realizado com sucesso!" -ForegroundColor Green
            Write-Host "Repositorio atualizado: https://github.com/alisson-rr/ebook" -ForegroundColor Cyan
        } else {
            Write-Host "Erro no push. Verifique suas credenciais do GitHub." -ForegroundColor Red
            Write-Host "Dica: Configure suas credenciais com:" -ForegroundColor Yellow
            Write-Host "   git config --global user.name 'Seu Nome'" -ForegroundColor Gray
            Write-Host "   git config --global user.email 'seu@email.com'" -ForegroundColor Gray
        }
    } else {
        Write-Host "Push cancelado pelo usuario." -ForegroundColor Yellow
    }
} else {
    Write-Host "Push realizado com sucesso!" -ForegroundColor Green
    Write-Host "Repositorio atualizado: https://github.com/alisson-rr/ebook" -ForegroundColor Cyan
}

Write-Host "Script finalizado." -ForegroundColor Green
