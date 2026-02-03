
export function showConfirm(message, title = 'Konfirmasi') {
    return new Promise((resolve) => {
        const modalId = 'custom-confirm-modal';
        // Remove existing if any
        const existing = document.getElementById(modalId);
        if (existing) existing.remove();

        const modalOverlay = document.createElement('div');
        modalOverlay.id = modalId;
        modalOverlay.className = 'modal-overlay active';
        modalOverlay.style.zIndex = '9999';

        modalOverlay.innerHTML = `
            <div class="modal-content" style="max-width: 400px; text-align: center; animation: modalSlideIn 0.3s ease;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">❓</div>
                <h3 style="margin-bottom: 0.5rem;">${title}</h3>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">${message}</p>
                <div class="modal-footer" style="justify-content: center; gap: 10px;">
                    <button id="btn-cancel" class="btn-secondary" style="min-width: 100px;">Batal</button>
                    <button id="btn-confirm" class="btn-primary" style="background: var(--danger); min-width: 100px;">Ya, Hapus</button>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        const btnCancel = modalOverlay.querySelector('#btn-cancel');
        const btnConfirm = modalOverlay.querySelector('#btn-confirm');
        const content = modalOverlay.querySelector('.modal-content');

        // Allow closing by clicking background
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) close(false);
        });

        const close = (result) => {
            modalOverlay.classList.remove('active');
            setTimeout(() => {
                if (modalOverlay.parentElement) modalOverlay.remove();
            }, 300);
            resolve(result);
        };

        btnCancel.addEventListener('click', () => close(false));
        btnConfirm.addEventListener('click', () => close(true));
        
        // Focus confirm for quick access, or cancel for safety? Safety first -> focus cancel.
        btnCancel.focus();
    });
}
