// Simple Authentication Module
import { showConfirm } from '../ui/components/ConfirmationModal.js';

export function isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
}

export function login(username, password) {
    // Simple hardcoded auth (dapat diganti dengan API call)
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isAuthenticated', 'true');
        return true;
    }
    return false;
}

export function logout() {
    localStorage.removeItem('isAuthenticated');
}

export function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    if (login(username, password)) {
        window.showToast('Login berhasil!', 'success');
        setTimeout(() => window.location.reload(), 800);
    } else {
        window.showToast('Username atau password salah!', 'error');
    }
}

export async function handleLogout() {
    if (await showConfirm('Keluar dari aplikasi?', 'Konfirmasi Logout', { text: 'Keluar', variant: 'danger' })) {
        logout();
        window.location.reload();
    }
}

// Expose to window
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
