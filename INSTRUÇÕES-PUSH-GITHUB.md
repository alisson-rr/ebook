# 🚀 Como Fazer Push para o GitHub

Este guia te ajudará a fazer push do conteúdo da landing page para o repositório `https://github.com/alisson-rr/ebook`.

## 📁 Repositório de Destino
**Novo repositório**: https://github.com/alisson-rr/ebook

## 🛠️ Método 1: Usando o Script PowerShell (Recomendado)

1. **Abra o PowerShell como Administrador**
2. **Navegue até a pasta do projeto**:
   ```powershell
   cd "c:\Users\Aliss\CascadeProjects\eBook-hotmart"
   ```

3. **Execute o script**:
   ```powershell
   .\push-to-github.ps1
   ```

4. **Siga as instruções** que aparecerão na tela
5. **Confirme quando perguntado** se deseja sobrescrever o repositório

## 🛠️ Método 2: Comandos Manuais

Se preferir executar manualmente, use estes comandos no PowerShell:

```powershell
# Navegar para a pasta
cd "c:\Users\Aliss\CascadeProjects\eBook-hotmart"

# Inicializar Git (se necessário)
git init

# Configurar remote
git remote add origin https://github.com/alisson-rr/ebook.git

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "feat: Nova landing page do Método C.A.R.E - Sobrescreve conteúdo anterior"

# Push forçado (CUIDADO: Apaga tudo no repositório)
git push -f origin main
```

## 🔐 Configuração de Credenciais

Se for a primeira vez usando Git, configure suas credenciais:

```powershell
git config --global user.name "Alisson Rosa"
git config --global user.email "seu@email.com"
```

## 🔑 Autenticação GitHub

Você pode precisar de:
1. **Token de Acesso Pessoal** (recomendado)
2. **GitHub CLI** (`gh auth login`)
3. **SSH Key** configurada

## 📁 Arquivos que Serão Enviados

✅ **Incluídos no push**:
- `index.html` - Página principal
- `styles.css` - Estilos
- `script.js` - JavaScript
- `assets/` - Todas as imagens
- `README.md` - Documentação
- `CONFIGURAR-EMAIL.md` - Instruções de email
- Arquivos de configuração (`.gitignore`, etc.)

❌ **Excluídos** (via .gitignore):
- Arquivos temporários
- Logs
- Arquivos do sistema

## 🎯 Resultado Esperado

Após o push bem-sucedido:
- ✅ Repositório `ebook` terá os arquivos da landing page
- ✅ Landing page estará disponível via GitHub Pages (se configurado)
- ✅ Repositório estará atualizado com o conteúdo mais recente

## 🚨 Troubleshooting

### Erro de Autenticação
```
git config --global credential.helper manager-core
```

### Erro de Branch
```
git branch -M main
git push -f origin main
```

### Erro de Remote
```
git remote remove origin
git remote add origin https://github.com/alisson-rr/ebook.git
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o Git está instalado: `git --version`
2. Verifique suas credenciais do GitHub
3. Certifique-se de ter permissões no repositório

---

**⚠️ LEMBRE-SE**: Este processo é irreversível. O conteúdo atual do repositório BeautyLab será perdido permanentemente.
