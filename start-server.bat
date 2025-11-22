@echo off
echo Tentando iniciar servidor web...
cd /d "c:\Users\Aliss\CascadeProjects\eBook-hotmart"

echo Testando porta 8081...
python -m http.server 8081 2>nul
if %errorlevel% neq 0 (
    echo Porta 8081 ocupada, tentando 8082...
    python -m http.server 8082 2>nul
    if %errorlevel% neq 0 (
        echo Porta 8082 ocupada, tentando 3000...
        python -m http.server 3000
    )
)
pause
