// Esperança ONG - JavaScript com efeitos visuais otimizados
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ Esperança ONG - Site carregado com efeitos visuais!');
    
    // Elementos DOM
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Inicializar efeitos
    initScrollAnimations();
    initParallaxEffects();
    initSmoothScrolling();
    initHeaderEffects();
    
    // Função para alternar menu mobile
    window.toggleMobileMenu = function() {
        if (mobileMenu) {
            if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
                mobileMenu.style.display = 'block';
                mobileMenu.style.animation = 'slideDown 0.3s ease-out';
            } else {
                mobileMenu.style.animation = 'slideUp 0.3s ease-out';
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                }, 300);
            }
        }
    };
    
    // Fechar menu mobile ao clicar em um link
    if (mobileMenu) {
        const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.style.animation = 'slideUp 0.3s ease-out';
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                }, 300);
            });
        });
    }
    
    // Fechar menu mobile ao clicar fora
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.style.display === 'block') {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenu.style.animation = 'slideUp 0.3s ease-out';
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                }, 300);
            }
        }
    });
});

// Efeitos do header melhorados
function initHeaderEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - esconder header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - mostrar header
            header.style.transform = 'translateY(0)';
        }
        
        // Efeito de blur baseado no scroll
        if (scrollTop > 50) {
            header.style.backdropFilter = 'blur(25px)';
            header.style.background = 'rgba(255, 255, 255, 0.88)';
            header.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.12)';
        } else {
            header.style.backdropFilter = 'blur(20px)';
            header.style.background = 'rgba(255, 255, 255, 0.92)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.08)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animações de scroll otimizadas
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Adicionar um pequeno delay para elementos consecutivos
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.style.transitionDelay = '0ms';
                }, delay);
            }
        });
    }, observerOptions);
    
    // Observar elementos com animação
    document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
        el.style.transitionDelay = (index * 50) + 'ms';
        observer.observe(el);
    });
}

// Efeitos de parallax suavizados
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-bg');
        const particles = document.querySelectorAll('.particle');
        const shapes = document.querySelectorAll('.shape');
        
        if (parallax) {
            const speed = scrolled * 0.3;
            parallax.style.transform = 'translateY(' + speed + 'px)';
        }
        
        // Movimento suave das partículas
        particles.forEach((particle, index) => {
            const speed = 0.08 + (index * 0.015);
            const yPos = -(scrolled * speed);
            const xPos = Math.sin(scrolled * 0.001 + index) * 20;
            particle.style.transform = 'translateY(' + yPos + 'px) translateX(' + xPos + 'px)';
        });
        
        // Movimento das formas flutuantes
        shapes.forEach((shape, index) => {
            const speed = 0.05 + (index * 0.01);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * 0.05 + (index * 30);
            shape.style.transform = 'translateY(' + yPos + 'px) rotate(' + rotation + 'deg)';
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Scroll suave melhorado
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Função para copiar chave PIX com efeitos visuais
window.copyPixKey = function() {
    const pixKey = 'esperanca.ong@email.com';
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pixKey).then(function() {
            showNotification('🎉 Chave PIX copiada: ' + pixKey, 'success');
            createCopyEffect();
        }).catch(function(err) {
            console.error('Erro ao copiar: ', err);
            fallbackCopyTextToClipboard(pixKey);
        });
    } else {
        fallbackCopyTextToClipboard(pixKey);
    }
};

// Efeito visual melhorado ao copiar
function createCopyEffect() {
    const pixBox = document.querySelector('.pix-key-box');
    if (pixBox) {
        pixBox.style.animation = 'copySuccess 0.8s ease-out';
        pixBox.style.transform = 'scale(1.02)';
        setTimeout(() => {
            pixBox.style.animation = '';
            pixBox.style.transform = '';
        }, 800);
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
            showNotification('🎉 Chave PIX copiada: ' + text, 'success');
            createCopyEffect();
        } else {
            showNotification('❌ Erro ao copiar a chave PIX', 'error');
        }
    } catch (err) {
        console.error('Fallback: Erro ao copiar', err);
        showNotification('❌ Erro ao copiar a chave PIX', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Função para download do formulário de voluntário
window.downloadVolunteerForm = function() {
    const btn = event.target.closest('.btn');
    const originalText = btn.innerHTML;
    
    // Efeito de loading com animação
    btn.innerHTML = '<span data-filename="pages/Home" data-linenumber="2855" data-visual-selector-id="pages/Home2855" class="btn-icon">⏳</span> Baixando...';
    btn.style.opacity = '0.7';
    btn.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        // Simular download
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1F1dGxpbmVzIDIgMCBSCi9QYWdlcyAzIDAgUgo+PgplbmRvYmoK';
        link.download = 'formulario-voluntario-esperanca-ong.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        btn.innerHTML = '<span data-filename="pages/Home" data-linenumber="2868" data-visual-selector-id="pages/Home2868" class="btn-icon">✅</span> Baixado!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        showNotification('📄 Formulário baixado com sucesso!', 'success');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.style.transform = '';
            btn.style.background = '';
        }, 2500);
    }, 1200);
};

// Função para enviar formulário de contato
window.submitContactForm = function(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Efeito de loading
    submitBtn.innerHTML = '<span data-filename="pages/Home" data-linenumber="2890" data-visual-selector-id="pages/Home2890" class="btn-icon">⏳</span> Enviando...';
    submitBtn.style.opacity = '0.7';
    submitBtn.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        submitBtn.innerHTML = '<span data-filename="pages/Home" data-linenumber="2895" data-visual-selector-id="pages/Home2895" class="btn-icon">✅</span> Enviado!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        showNotification('📧 Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        
        // Limpar formulário com animação suave
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach((input, index) => {
            setTimeout(() => {
                input.style.transition = 'all 0.4s ease';
                input.style.background = 'rgba(240, 249, 255, 0.8)';
                input.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    input.value = '';
                    input.style.background = '';
                    input.style.transform = '';
                }, 300);
            }, index * 100);
        });
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.style.transform = '';
            submitBtn.style.background = '';
        }, 3000);
    }, 1500);
};

// Sistema de notificações com animações suaves
function showNotification(message, type) {
    type = type || 'info';
    
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => existingNotification.remove(), 300);
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.innerHTML = 
        '<div data-filename="pages/Home" data-linenumber="2937" data-visual-selector-id="pages/Home2937" class="notification-content">' +
            '<span data-filename="pages/Home" data-linenumber="2938" data-visual-selector-id="pages/Home2938" class="notification-message">' + message + '</span>' +
            '<button data-filename="pages/Home" data-linenumber="2939" data-visual-selector-id="pages/Home2939" class="notification-close" onclick="closeNotification(this)">×</button>' +
        '</div>';
    
    // Estilos da notificação
    notification.style.cssText = 
        'position: fixed;' +
        'top: 5rem;' +
        'right: 1rem;' +
        'padding: 1rem 1.5rem;' +
        'border-radius: 1rem;' +
        'box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);' +
        'z-index: 10000;' +
        'max-width: 380px;' +
        'font-size: 0.875rem;' +
        'font-weight: 500;' +
        'color: white;' +
        'backdrop-filter: blur(25px);' +
        'border: 1px solid rgba(255, 255, 255, 0.2);' +
        'transform: translateX(100%) scale(0.8);' +
        'transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);';
    notification.className = 'notification';
    
    // Definir cor baseada no tipo
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95))';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))';
    } else {
        notification.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(29, 78, 216, 0.95))';
    }
    
    // Adicionar à página
    document.body.appendChild(notification);
    
    // Animar entrada
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    });
    
    // Auto-remover após 6 segundos
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.style.transform = 'translateX(100%) scale(0.8)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }
    }, 6000);
}

// Função para fechar notificação
window.closeNotification = function(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
};

// Adicionar estilos CSS dinamicamente
const styles = document.createElement('style');
styles.textContent = 
'@keyframes slideDown {' +
'    from { transform: translateY(-20px); opacity: 0; }' +
'    to { transform: translateY(0); opacity: 1; }' +
'}' +

'@keyframes slideUp {' +
'    from { transform: translateY(0); opacity: 1; }' +
'    to { transform: translateY(-20px); opacity: 0; }' +
'}' +

'@keyframes copySuccess {' +
'    0% { transform: scale(1); background: rgba(249, 250, 251, 0.8); }' +
'    50% { transform: scale(1.05); background: rgba(220, 252, 231, 0.9); border-color: #10b981; }' +
'    100% { transform: scale(1); background: rgba(249, 250, 251, 0.8); }' +
'}' +

'.notification-content {' +
'    display: flex;' +
'    align-items: center;' +
'    justify-content: space-between;' +
'    gap: 1rem;' +
'}' +

'.notification-close {' +
'    background: none;' +
'    border: none;' +
'    color: white;' +
'    font-size: 1.25rem;' +
'    cursor: pointer;' +
'    padding: 0;' +
'    opacity: 0.8;' +
'    transition: all 0.2s ease;' +
'    width: 24px;' +
'    height: 24px;' +
'    display: flex;' +
'    align-items: center;' +
'    justify-content: center;' +
'    border-radius: 50%;' +
'}' +

'.notification-close:hover {' +
'    opacity: 1;' +
'    background: rgba(255, 255, 255, 0.2);' +
'    transform: scale(1.1);' +
'}' +

'.btn:active {' +
'    transform: scale(0.96) !important;' +
'}' +

'.card-hover-effect {' +
'    cursor: pointer;' +
'}' +

'/* Melhorias para mobile */' +
'@media (max-width: 640px) {' +
'    .notification {' +
'        right: 0.5rem !important;' +
'        left: 0.5rem !important;' +
'        max-width: none !important;' +
'        top: 4.5rem !important;' +
'    }' +
'    ' +
'    .floating-shapes {' +
'        opacity: 0.4 !important;' +
'    }' +
'    ' +
'    .hero-particles {' +
'        opacity: 0.6 !important;' +
'    }' +
'}';

document.head.appendChild(styles);

// Log de inicialização
console.log('🎨 Efeitos visuais inicializados com sucesso!');