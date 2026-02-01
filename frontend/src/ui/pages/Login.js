
export const LoginView = () => `
<div style="display:flex; justify-content:center; align-items:center; height:100vh; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
    <div class="card" style="width:100%; max-width:400px; padding:2.5rem; border-radius:16px; box-shadow:0 10px 40px rgba(0,0,0,0.1);">
        <div style="text-align:center; margin-bottom:2rem;">
            <div style="font-size:2.5rem; font-weight:800; margin-bottom:0.5rem; background: -webkit-linear-gradient(45deg, #007aff, #00c6ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                AI Pendadaran
            </div>
            <p style="color:var(--text-muted);">Silakan login untuk mengelola jadwal.</p>
        </div>
        
        <form onsubmit="window.handleLogin(event)">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" class="form-input" placeholder="admin" required value="admin">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" class="form-input" placeholder="••••••" required>
            </div>
            <button type="submit" class="btn-primary" style="width:100%; padding:12px; margin-top:1rem; font-size:1rem; justify-content:center;">
                Masuk Dashboard ➜
            </button>
        </form>
        
        <div style="text-align:center; margin-top:2rem; font-size:0.8rem; color:var(--text-muted);">
            &copy; 2026 Universitas Amikom Yogyakarta
        </div>
    </div>
</div>
`;
