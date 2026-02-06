// Authentication Module
import { showConfirm } from '../ui/components/ConfirmationModal.js';
import { authAPI } from './api.js';

export function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
}

export async function login(username, password) {
    try {
        const response = await authAPI.login(username, password);
        if (response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            return { success: true };
        }
        return { success: false, error: response.error };
    } catch (error) {
        console.error('Login failed', error);
        return { success: false, error: error.message || 'Gagal terhubung ke server' };
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // localStorage.removeItem('isAuthenticated'); // Cleanup old key if exists
}

export async function handleLogin(e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.textContent = 'Memuat...';
    submitBtn.disabled = true;

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    const result = await login(username, password);

    if (result.success) {
        window.showToast('Login berhasil!', 'success');
        setTimeout(() => window.location.reload(), 500);
    } else {
        window.showToast(result.error || 'Username atau password salah!', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
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
