// Esperança ONG - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Esperança ONG - Site carregado com sucesso!');
    
    // Elementos DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');
    
    // Navegação suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Destacar seção ativa na navegação
    function updateActiveNav() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 50;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Efeito do header no scroll
    function updateHeaderOnScroll() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.12)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 20px rgba(0, 0, 0, 0.08)';
        }
    }

    // Event listeners para scroll
    window.addEventListener('scroll', function() {
        updateActiveNav();
        updateHeaderOnScroll();
        animateOnScroll();
    });
    
    // Chamar funções iniciais
    updateActiveNav();
    animateOnScroll();
});

// Função para copiar chave PIX
function copyPixKey() {
    const pixKey = '19994717011';
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pixKey).then(function() {
            showNotification('Chave PIX copiada: ' + pixKey, 'success');
        }).catch(function(err) {
            console.error('Erro ao copiar: ', err);
            fallbackCopyTextToClipboard(pixKey);
        });
    } else {
        fallbackCopyTextToClipboard(pixKey);
    }
}

// Fallback para copiar texto
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Chave PIX copiada: ' + text, 'success');
        } else {
            showNotification('Erro ao copiar a chave PIX', 'error');
        }
    } catch (err) {
        console.error('Fallback: Erro ao copiar', err);
        showNotification('Erro ao copiar a chave PIX', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Sistema de notificações
function showNotification(message, type) {
    type = type || 'info';
    
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.textContent = message;
    
    // Definir cor de fundo baseada no tipo
    let backgroundColor = '#3b82f6';
    if (type === 'success') backgroundColor = '#10b981';
    if (type === 'error') backgroundColor = '#ef4444';
    
    // Estilos inline para a notificação
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = backgroundColor;
    notification.style.color = 'white';
    notification.style.padding = '16px 24px';
    notification.style.borderRadius = '12px';
    notification.style.fontWeight = '600';
    notification.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    notification.style.maxWidth = '400px';
    notification.style.wordWrap = 'break-word';
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(function() {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 4 segundos
    setTimeout(function() {
        notification.style.transform = 'translateX(100%)';
        setTimeout(function() {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Animações no scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .contact-item, .help-item, .volunteer-area, .stat-item');
    
    elements.forEach(function(element) {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Aplicar estilos iniciais para animação
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .contact-item, .help-item, .volunteer-area, .stat-item');
    
    elements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Chamar animação inicial
    setTimeout(animateOnScroll, 100);
});

// Validação e envio do formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(function(input) {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#e5e7eb';
                }
            });
            
            if (!isValid) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Validação básica de email
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput) {
                const emailRegex = /^[^\\s@]+@[^\\s@]+\\\.[^\\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    showNotification('Por favor, insira um email válido.', 'error');
                    emailInput.style.borderColor = '#ef4444';
                    return;
                }
            }
            
            // Simular envio
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(function() {
                showNotification('Obrigado pela sua mensagem! Entraremos em contato em breve.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
});

// Contador animado para estatísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const numbers = [2547, 892, 23, 45];
    
    counters.forEach(function(counter, index) {
        const target = numbers[index];
        const increment = target / 100;
        let current = 0;
        
        function updateCounter() {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        updateCounter();
    });
}

// Observer para animar contadores quando visíveis
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting && entry.target.classList.contains('stats-section')) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Função para melhorar acessibilidade
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Log de inicialização
console.log('🎉 Esperança ONG - Site carregado com sucesso!');
console.log('Transformando vidas através da tecnologia.');