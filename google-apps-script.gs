// Google Apps Script para receber dados do formulário
// Cole este código no Google Apps Script e publique como Web App

function doPost(e) {
  try {
    // ID da sua planilha
    const SHEET_ID = '1E6tOhN2KvPyfihBIpmOSBChZj1lx0TK9Wk1BNMySwQ0';
    
    // Abrir a planilha
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Pegar dados do formulário
    const nome = e.parameter.nome || '';
    const email = e.parameter.email || '';
    const telefone = e.parameter.telefone || '';
    
    // Validar dados
    if (!nome || !email || !telefone) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: 'Dados incompletos'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Adicionar nova linha na planilha
    sheet.appendRow([nome, email, telefone, new Date()]);
    
    // Retornar sucesso
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retornar erro
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Google Apps Script funcionando!')
    .setMimeType(ContentService.MimeType.TEXT);
}
