# Script PowerShell para iniciar servidor web
Write-Host "🚀 Iniciando servidor para Landing Page Método C.A.R.E..." -ForegroundColor Green

# Navegar para o diretório do projeto
Set-Location "c:\Users\Aliss\CascadeProjects\eBook-hotmart"

# Função para testar se uma porta está disponível
function Test-Port {
    param([int]$Port)
    try {
        $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
        $listener.Start()
        $listener.Stop()
        return $true
    }
    catch {
        return $false
    }
}

# Lista de portas para tentar (suas preferidas: 8080, 8081, 8082)
$ports = @(8081, 8082, 3000, 5000, 8000)

foreach ($port in $ports) {
    if (Test-Port -Port $port) {
        Write-Host "✅ Porta $port disponível! Iniciando servidor..." -ForegroundColor Green
        Write-Host "📍 Acesse: http://localhost:$port" -ForegroundColor Yellow
        Write-Host "⏹️  Pressione Ctrl+C para parar o servidor" -ForegroundColor Cyan
        Write-Host ""
        
        # Tentar abrir o navegador automaticamente
        Start-Process "http://localhost:$port"
        
        # Iniciar o servidor
        python -m http.server $port
        break
    }
    else {
        Write-Host "❌ Porta $port ocupada, tentando próxima..." -ForegroundColor Red
    }
}

Write-Host "❌ Nenhuma porta disponível encontrada!" -ForegroundColor Red
Read-Host "Pressione Enter para sair"
