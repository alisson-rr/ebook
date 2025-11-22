// Countdown Timer
function initCountdown() {
    // Set the countdown time (24 hours from now)
    const countdownTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    let timeLeft = localStorage.getItem('countdownTime');
    
    if (!timeLeft) {
        timeLeft = Date.now() + countdownTime;
        localStorage.setItem('countdownTime', timeLeft);
    } else {
        timeLeft = parseInt(timeLeft);
    }

    function updateCountdown() {
        const now = Date.now();
        const difference = timeLeft - now;

        if (difference > 0) {
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            // Timer expired - reset it
            localStorage.removeItem('countdownTime');
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth Scroll to Checkout - Agora abre o modal
function scrollToCheckout() {
    console.log('scrollToCheckout chamado');
    // Prevenir comportamento padrão se for um link
    event.preventDefault();
    openCheckout();
    return false;
}

// Modal Functions
function openCheckout() {
    console.log('openCheckout chamado');
    
    // Aguardar um pouco para garantir que o DOM está carregado
    setTimeout(() => {
        const modal = document.getElementById('checkout-modal');
        console.log('Modal encontrado:', modal);
        
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            console.log('Modal aberto com sucesso');
        } else {
            console.error('Modal não encontrado! Verificando se existe...');
            console.log('Todos os elementos com ID:', document.querySelectorAll('[id]'));
        }
    }, 100);
}

function closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Limpar o formulário
        document.getElementById('checkout-form').reset();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('checkout-modal');
    if (event.target === modal) {
        closeCheckout();
    }
}

// Intersection Observer for fade-in animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Sticky CTA Button on Mobile
function setupStickyCTA() {
    if (window.innerWidth <= 768) {
        let lastScrollTop = 0;
        const stickyCTA = document.createElement('div');
        stickyCTA.className = 'sticky-cta-mobile';
        stickyCTA.innerHTML = `
            <button class="cta-button-mobile" onclick="scrollToCheckout()">
                GARANTIR OFERTA
            </button>
        `;
        
        // Add CSS for sticky CTA
        const style = document.createElement('style');
        style.textContent = `
            .sticky-cta-mobile {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: white;
                padding: 10px;
                box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
                z-index: 999;
                display: none;
            }
            .cta-button-mobile {
                width: 100%;
                background: linear-gradient(135deg, #ff6b9d 0%, #2563eb 100%);
                color: white;
                border: none;
                padding: 15px;
                font-size: 1rem;
                font-weight: 700;
                border-radius: 50px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(stickyCTA);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 500) {
                stickyCTA.style.display = 'block';
            } else {
                stickyCTA.style.display = 'none';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// Add hover effects to problem items
function setupInteractiveElements() {
    const problemItems = document.querySelectorAll('.problem-item');
    problemItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.background = '#fef3c7';
            setTimeout(() => {
                this.style.background = '';
            }, 500);
        });
    });

    // Add click tracking for CTAs
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Track conversion (you can integrate with analytics here)
            console.log('CTA clicked:', button.textContent);
        });
    });
}

// Testimonial carousel for mobile
function setupTestimonialCarousel() {
    if (window.innerWidth <= 768) {
        const testimonials = document.querySelectorAll('.testimonial-card');
        let currentTestimonial = 0;

        // Hide all except first
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // Add navigation dots
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        if (testimonialsGrid) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'testimonial-dots';
            dotsContainer.style.textAlign = 'center';
            dotsContainer.style.marginTop = '20px';

            testimonials.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = 'dot';
                dot.style.cssText = `
                    height: 10px;
                    width: 10px;
                    margin: 0 5px;
                    background-color: ${index === 0 ? '#ff6b9d' : '#bbb'};
                    border-radius: 50%;
                    display: inline-block;
                    cursor: pointer;
                `;
                dot.addEventListener('click', () => showTestimonial(index));
                dotsContainer.appendChild(dot);
            });

            testimonialsGrid.appendChild(dotsContainer);
        }

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });

            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.style.backgroundColor = i === index ? '#ff6b9d' : '#bbb';
            });

            currentTestimonial = index;
        }

        // Auto-rotate testimonials
        setInterval(() => {
            const nextIndex = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }, 5000);
    }
}

// Urgency notification
function showUrgencyNotification() {
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.className = 'urgency-notification';
        notification.innerHTML = `
            <div style="background: linear-gradient(135deg, #ff6b9d 0%, #2563eb 100%); color: white; padding: 15px; border-radius: 10px; position: fixed; top: 20px; right: 20px; z-index: 9999; box-shadow: 0 10px 25px rgba(0,0,0,0.2); max-width: 300px; animation: slideInRight 0.5s ease;">
                <p style="margin: 0; font-weight: 600;">⚡ Oferta Limitada!</p>
                <p style="margin: 5px 0 0 0; font-size: 0.9rem;">Apenas mais 3 vagas com desconto de 53%!</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }, 10000); // Show after 10 seconds on page
}

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    setupAnimations();
    setupStickyCTA();
    setupInteractiveElements();
    setupTestimonialCarousel();
    showUrgencyNotification();
    
    // Adicionar máscara de telefone
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            maskPhone(this);
        });
        
        // Permitir apenas números, parênteses, espaços e hífens
        phoneInput.addEventListener('keypress', function(e) {
            const allowedChars = /[0-9\(\)\s\-]/;
            if (!allowedChars.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                e.preventDefault();
            }
        });
    }
    
    // Verificar se o modal existe
    const modal = document.getElementById('checkout-modal');
    console.log('Modal no DOM load:', modal);
    
    // Tornar as funções globais para debug
    window.scrollToCheckout = scrollToCheckout;
    window.openCheckout = openCheckout;
    window.closeCheckout = closeCheckout;
    
    // Log page view (for analytics)
    console.log('Landing page loaded successfully');
});

// Handle form submissions
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Pegar dados do formulário
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validar telefone (deve ter pelo menos 10 dígitos)
    const phoneNumbers = data.telefone.replace(/\D/g, '');
    if (phoneNumbers.length < 10) {
        alert('Por favor, digite um número de telefone válido com DDD.');
        return;
    }
    
    console.log('Dados do cliente:', data);
    
    // Simular processamento
    const button = event.target.querySelector('.checkout-button');
    const originalText = button.textContent;
    button.textContent = 'Salvando dados...';
    button.disabled = true;
    
    try {
        // Enviar dados para Google Sheets
        const result = await saveToGoogleSheets(data.nome, data.email, data.telefone);
        
        if (result.success) {
            closeCheckout();
            
            // Redirecionar para Hotmart após sucesso
            window.location.href = 'https://pay.hotmart.com/T103078718Y';
        } else {
            throw new Error('Falha ao salvar dados');
        }
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        closeCheckout();
        
        // Redirecionar mesmo com erro (fallback)
        window.location.href = 'https://pay.hotmart.com/T103078718Y';
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Função para enviar email (integração com serviço de email)
async function sendEmail(data) {
    // Exemplo de integração com EmailJS
    // Você precisa configurar sua conta no EmailJS e substituir os IDs
    
    const emailBody = `
        Nova compra do Método C.A.R.E!
        
        Nome: ${data.nome}
        Email: ${data.email}
        Telefone: ${data.telefone}
        Produto: ${data.produto}
        Valor: ${data.valor}
        Data/Hora: ${data.timestamp}
    `;
    
    // Simulação de envio - substitua pela sua integração real
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Email enviado:', emailBody);
            resolve();
        }, 1000);
    });
    
    /* Exemplo de integração real com EmailJS:
    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: 'seu@email.com',
        from_name: data.nome,
        from_email: data.email,
        phone: data.telefone,
        message: emailBody
    });
    */
}

// Máscara de telefone com limitação de dígitos
function maskPhone(input) {
    let value = input.value.replace(/\D/g, '');
    
    // Limitar a 11 dígitos (DDD + 9 dígitos)
    if (value.length > 11) {
        value = value.substring(0, 11);
    }
    
    if (value.length <= 11) {
        if (value.length >= 3) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        }
        if (value.length >= 10) {
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
    }
    
    input.value = value;
}

// Função para salvar dados no Google Sheets
async function saveToGoogleSheets(nome, email, telefone) {
    try {
        // Verificar se a API do Google Sheets está disponível
        if (typeof googleSheetsAPI !== 'undefined') {
            return await googleSheetsAPI.addRowToSheet(nome, email, telefone);
        } else {
            // Fallback: usar método simples com fetch
            return await saveToSheetsSimple(nome, email, telefone);
        }
    } catch (error) {
        console.error('Erro ao salvar no Google Sheets:', error);
        return { success: false, error };
    }
}

// Método simplificado para salvar dados
async function saveToSheetsSimple(nome, email, telefone) {
    try {
        // Simular salvamento (substitua pela sua implementação)
        console.log('Salvando dados:', { nome, email, telefone });
        
        // Em produção, você pode usar:
        // 1. Google Apps Script Web App
        // 2. Zapier Webhook
        // 3. Make.com (Integromat)
        // 4. Sua própria API backend
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });
    } catch (error) {
        return { success: false, error };
    }
}

// Utility function for formatting currency
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Track scroll depth for analytics
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = Math.round(scrollPercentage);
        // Send to analytics
        if (maxScrollDepth % 25 === 0) {
            console.log(`Scroll depth: ${maxScrollDepth}%`);
        }
    }
});
