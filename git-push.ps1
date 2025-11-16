# Script simples para push no GitHub
Write-Host "=== PUSH PARA GITHUB ===" -ForegroundColor Green

# Verificar Git
git --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Git nao encontrado!" -ForegroundColor Red
    exit 1
}

# Inicializar se necessario
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando Git..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Configurar remote
Write-Host "Configurando repositorio..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/alisson-rr/ebook.git

# Adicionar arquivos
Write-Host "Adicionando arquivos..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "Fazendo commit..." -ForegroundColor Yellow
git commit -m "Landing page Metodo CARE"

# Push
Write-Host "Fazendo push..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: Push realizado!" -ForegroundColor Green
    Write-Host "Repositorio: https://github.com/alisson-rr/ebook" -ForegroundColor Cyan
} else {
    Write-Host "ERRO no push. Tentando push forcado..." -ForegroundColor Red
    git push -f origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS: Push forcado realizado!" -ForegroundColor Green
    } else {
        Write-Host "ERRO: Verifique credenciais do GitHub" -ForegroundColor Red
    }
}

Write-Host "=== FIM ===" -ForegroundColor Green
