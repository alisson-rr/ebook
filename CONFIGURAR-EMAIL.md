# 📧 Como Configurar o Envio de Email

O formulário do modal está configurado para enviar os dados por email quando o usuário clica em "FINALIZAR COMPRA".

## 🔧 Opções de Integração

### 1. **EmailJS (Recomendado - Gratuito)**

1. Acesse: https://www.emailjs.com/
2. Crie uma conta gratuita
3. Configure um serviço de email (Gmail, Outlook, etc.)
4. Crie um template de email
5. Substitua no `script.js`:

```javascript
// Substitua a função sendEmail por:
async function sendEmail(data) {
    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: 'seu@email.com',
        from_name: data.nome,
        from_email: data.email,
        phone: data.telefone,
        produto: data.produto,
        valor: data.valor,
        timestamp: data.timestamp
    });
}
```

6. Adicione o script do EmailJS no HTML:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

### 2. **Formspree (Alternativa)**

1. Acesse: https://formspree.io/
2. Crie uma conta e configure um formulário
3. Substitua a função `sendEmail` por uma requisição POST para o endpoint do Formspree

### 3. **Webhook/API Própria**

Se você tem um servidor próprio, pode criar um endpoint para receber os dados:

```javascript
async function sendEmail(data) {
    const response = await fetch('https://seu-servidor.com/api/lead', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Erro ao enviar dados');
    }
    
    return response.json();
}
```

## 📋 Dados Enviados

O email conterá:
- **Nome**: Nome completo do cliente
- **Email**: Email do cliente
- **Telefone**: WhatsApp formatado
- **Produto**: "Método C.A.R.E - Ebook Digital"
- **Valor**: "R$ 47,00"
- **Data/Hora**: Timestamp da compra

## ✅ Status Atual

- ✅ Formulário funcional com validação
- ✅ Máscara de telefone (limitado a 11 dígitos)
- ✅ Validação de campos obrigatórios
- ✅ Estrutura de envio de email preparada
- ⏳ **Pendente**: Configurar serviço de email real

## 🔗 WhatsApp no Rodapé

O rodapé agora contém o link direto para o WhatsApp:
- **Número**: (51) 99440-8307
- **Link**: https://wa.me/5551994408307
