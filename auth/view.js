const { layout } = require('../layout');

function register(error = null, session = null) {
  return layout('Registro', `
    <div class="auth-wrapper">
      <div class="auth-card">
        <h1 class="auth-title">Crear cuenta</h1>
        <p class="auth-sub">Únete y crea tu portafolio profesional</p>
        ${error ? `<div class="alert alert-error">${error}</div>` : ''}
        <form action="/register" method="POST" class="form">
          <div class="form-group">
            <label>Usuario *</label>
            <input type="text" name="username" required placeholder="tu_usuario" autocomplete="username">
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input type="email" name="email" required placeholder="tu@email.com">
          </div>
          <div class="form-group">
            <label>Contraseña *</label>
            <input type="password" name="password" required placeholder="••••••••" autocomplete="new-password">
          </div>
          <button type="submit" class="btn btn-primary btn-block">Crear cuenta</button>
        </form>
        <p class="auth-switch">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
      </div>
    </div>`, session);
}

function login(error = null, session = null) {
  return layout('Login', `
    <div class="auth-wrapper">
      <div class="auth-card">
        <h1 class="auth-title">Bienvenido</h1>
        <p class="auth-sub">Accede a tu panel de control</p>
        ${error ? `<div class="alert alert-error">${error}</div>` : ''}
        <form action="/login" method="POST" class="form">
          <div class="form-group">
            <label>Usuario *</label>
            <input type="text" name="username" required placeholder="tu_usuario" autocomplete="username">
          </div>
          <div class="form-group">
            <label>Contraseña *</label>
            <input type="password" name="password" required placeholder="••••••••" autocomplete="current-password">
          </div>
          <button type="submit" class="btn btn-primary btn-block">Entrar</button>
        </form>
        <p class="auth-switch">¿No tienes cuenta? <a href="/register">Regístrate</a></p>
      </div>
    </div>`, session);
}

module.exports = { register, login };
