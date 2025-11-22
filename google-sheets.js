// Google Sheets Integration
class GoogleSheetsAPI {
    constructor() {
        this.spreadsheetId = '1E6tOhN2KvPyfihBIpmOSBChZj1lx0TK9Wk1BNMySwQ0';
        this.apiKey = null;
        this.accessToken = null;
    }

    // Função para obter token de acesso usando service account
    async getAccessToken() {
        try {
            const response = await fetch('/credentials.json');
            const credentials = await response.json();
            
            // Criar JWT token
            const jwt = await this.createJWT(credentials);
            
            // Trocar JWT por access token
            const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                    assertion: jwt
                })
            });
            
            const tokenData = await tokenResponse.json();
            this.accessToken = tokenData.access_token;
            return this.accessToken;
        } catch (error) {
            console.error('Erro ao obter token:', error);
            throw error;
        }
    }

    // Função simplificada para adicionar dados à planilha
    async addRowToSheet(nome, email, telefone) {
        try {
            // Usar Google Apps Script como proxy (método mais simples)
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbyN_5MweMGq5KOv5dCNyQvgKjRjzLnXPH0pS1in6dZcjZECUOvtp-eFtIpYnrbCcqZ0/exec';
            
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('email', email);
            formData.append('telefone', telefone);
            
            const response = await fetch(scriptUrl, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                return { success: true };
            } else {
                throw new Error('Erro ao salvar dados');
            }
        } catch (error) {
            console.error('Erro ao adicionar linha:', error);
            // Fallback: usar método direto com fetch
            return await this.addRowDirect(nome, email, telefone);
        }
    }

    // Método alternativo usando fetch direto
    async addRowDirect(nome, email, telefone) {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Sheet1:append?valueInputOption=RAW&key=YOUR_API_KEY`;
        
        const data = {
            values: [[nome, email, telefone]]
        };
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            return { success: response.ok };
        } catch (error) {
            console.error('Erro no método direto:', error);
            return { success: false, error };
        }
    }
}

// Instância global da API
const googleSheetsAPI = new GoogleSheetsAPI();
