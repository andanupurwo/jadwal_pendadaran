
// Toast Notification Component
// Replaces standard browser alert() with elegant floating notifications

const style = `
.toast-container {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 99999;
    font-family: 'Inter', system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: none;
}

.toast {
    background: white;
    min-width: 300px;
    max-width: 400px;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.05);
    border: 1px solid rgba(0,0,0,0.04);
    border-left: 5px solid #ccc;
    font-size: 0.95rem;
    font-weight: 500;
    color: #333;
    pointer-events: auto;
    
    transform: translateX(120%);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
    opacity: 0;
    
    display: flex;
    align-items: center;
    gap: 12px;
}

.toast.show {
    transform: translateX(0);
    opacity: 1;
}

.toast.removing {
    transform: translateX(20px);
    opacity: 0;
}

.toast-success { border-left-color: #10B981; }
.toast-error { border-left-color: #EF4444; }
.toast-info { border-left-color: #3B82F6; }
.toast-warning { border-left-color: #F59E0B; }

.toast-icon {
    font-size: 1.2rem;
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = style;
document.head.appendChild(styleSheet);

// Create container
let container = document.querySelector('.toast-container');
if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
}

const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
};

export function showToast(message, type = 'info', duration = 4000) {
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `
        <span class="toast-icon">${icons[type] || ''}</span>
        <span style="flex:1; line-height:1.4;">${message}</span>
    `;

    container.appendChild(el);

    // Trigger animation
    requestAnimationFrame(() => {
        el.classList.add('show');
    });

    // Auto remove
    setTimeout(() => {
        el.classList.remove('show');
        el.classList.add('removing');
        el.addEventListener('transitionend', () => el.remove());
    }, duration);
}

// Expose to window globally
window.showToast = showToast;
