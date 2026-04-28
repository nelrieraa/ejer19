function layout(title, content, session = null) {
  const isLoggedIn = !!(session && session.userId);

  const navRight = isLoggedIn
    ? `<a href="/portfolio/${session.username}" class="nav-link">Mi Portfolio</a>
       <a href="/dashboard" class="nav-link">Dashboard</a>
       <a href="/logout" class="btn-outline-nav">Salir</a>`
    : `<a href="/login" class="nav-link">Login</a>
       <a href="/register" class="btn-primary-nav">Registro</a>`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — DevFolio</title>
  <link rel="stylesheet" href="/css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <nav class="navbar">
    <a href="/" class="nav-logo">&lt;DevFolio /&gt;</a>
    <div class="nav-links">${navRight}</div>
  </nav>
  <main class="main-content">
    ${content}
  </main>
  <footer class="footer">
    <p>DevFolio &copy; ${new Date().getFullYear()}</p>
  </footer>
</body>
</html>`;
}

module.exports = { layout };
