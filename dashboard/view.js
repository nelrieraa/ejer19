const { layout } = require('../layout');

function dashboard(user, projects, socialLinks, session) {
  const avatar = user.photo
    ? `<img src="${user.photo}" alt="${user.username}" class="avatar avatar-sm">`
    : `<div class="avatar-placeholder avatar-placeholder-sm">${user.username.charAt(0).toUpperCase()}</div>`;

  const socialRows = socialLinks.length
    ? socialLinks.map(l => `
        <div class="item-row">
          <div class="item-info">
            <span class="item-title">${l.platform}</span>
            <a href="${l.url}" target="_blank" class="item-sub">${l.url}</a>
          </div>
          <form action="/dashboard/social/delete/${l.id}" method="POST">
            <button class="btn btn-sm btn-danger" onclick="return confirm('¿Eliminar enlace?')">Borrar</button>
          </form>
        </div>`).join('')
    : '<p class="muted">Sin enlaces sociales todavía.</p>';

  const projectRows = projects.length
    ? projects.map(p => `
        <div class="item-row">
          <div class="item-info">
            <span class="item-title">${p.title}</span>
            ${p.description ? `<span class="item-sub">${p.description.substring(0, 90)}${p.description.length > 90 ? '…' : ''}</span>` : ''}
          </div>
          <div class="item-actions">
            <a href="/dashboard/project/edit/${p.id}" class="btn btn-sm btn-ghost">Editar</a>
            <form action="/dashboard/project/delete/${p.id}" method="POST" style="display:inline">
              <button class="btn btn-sm btn-danger" onclick="return confirm('¿Eliminar proyecto?')">Borrar</button>
            </form>
          </div>
        </div>`).join('')
    : '<p class="muted">Sin proyectos todavía.</p>';

  return layout('Dashboard', `
    <div class="page-header">
      <div style="display:flex;align-items:center;gap:1rem">
        ${avatar}
        <div>
          <h1>Hola, @${user.username}</h1>
          <a href="/portfolio/${user.username}" class="text-link">Ver mi portafolio público →</a>
        </div>
      </div>
    </div>

    <div class="dash-grid">

      <section class="card">
        <h2 class="card-title">Mi Perfil</h2>
        <form action="/dashboard/profile" method="POST" class="form">
          <div class="form-group">
            <label>Biografía</label>
            <textarea name="bio" rows="3" placeholder="Cuéntanos sobre ti...">${user.bio || ''}</textarea>
          </div>
          <div class="form-group">
            <label>Email de contacto</label>
            <input type="email" name="email" value="${user.email || ''}" placeholder="tu@email.com">
          </div>
          <div class="form-group">
            <label>URL de foto de perfil</label>
            <input type="url" name="photo" value="${user.photo || ''}" placeholder="https://...">
          </div>
          <button type="submit" class="btn btn-primary">Guardar cambios</button>
        </form>
      </section>

      <section class="card">
        <h2 class="card-title">Redes Sociales</h2>
        <div class="item-list">${socialRows}</div>
        <hr class="divider">
        <h3 class="sub-title">Añadir enlace</h3>
        <form action="/dashboard/social/add" method="POST" class="form">
          <div class="form-group">
            <label>Plataforma</label>
            <input type="text" name="platform" placeholder="GitHub, LinkedIn, Twitter…" list="platforms" required>
            <datalist id="platforms">
              <option value="GitHub"><option value="LinkedIn"><option value="Twitter">
              <option value="Instagram"><option value="YouTube"><option value="Website">
            </datalist>
          </div>
          <div class="form-group">
            <label>URL</label>
            <input type="url" name="url" placeholder="https://github.com/tu_usuario" required>
          </div>
          <button type="submit" class="btn btn-primary">Añadir</button>
        </form>
      </section>

    </div>

    <section class="card" style="margin-top:1.5rem">
      <h2 class="card-title">Mis Proyectos <span class="badge-count">${projects.length}</span></h2>
      <div class="item-list">${projectRows}</div>
      <hr class="divider">
      <h3 class="sub-title">Añadir proyecto</h3>
      <form action="/dashboard/project/add" method="POST" class="form">
        <div class="form-row">
          <div class="form-group">
            <label>Título *</label>
            <input type="text" name="title" required placeholder="Nombre del proyecto">
          </div>
          <div class="form-group">
            <label>URL del repositorio</label>
            <input type="url" name="repo_url" placeholder="https://github.com/...">
          </div>
          <div class="form-group">
            <label>URL demo en vivo</label>
            <input type="url" name="live_url" placeholder="https://...">
          </div>
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <textarea name="description" rows="2" placeholder="Breve descripción del proyecto..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Añadir proyecto</button>
      </form>
    </section>
  `, session);
}

function editProject(project, session) {
  return layout(`Editar: ${project.title}`, `
    <div class="page-header">
      <h1>Editar Proyecto</h1>
      <a href="/dashboard" class="btn btn-ghost">← Dashboard</a>
    </div>
    <div class="card form-card">
      <form action="/dashboard/project/save" method="POST" class="form">
        <input type="hidden" name="id" value="${project.id}">
        <div class="form-group">
          <label>Título *</label>
          <input type="text" name="title" value="${project.title}" required>
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <textarea name="description" rows="3">${project.description || ''}</textarea>
        </div>
        <div class="form-group">
          <label>URL del repositorio</label>
          <input type="url" name="repo_url" value="${project.repo_url || ''}">
        </div>
        <div class="form-group">
          <label>URL demo en vivo</label>
          <input type="url" name="live_url" value="${project.live_url || ''}">
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Guardar cambios</button>
          <a href="/dashboard" class="btn btn-ghost">Cancelar</a>
        </div>
      </form>
    </div>
  `, session);
}

module.exports = { dashboard, editProject };
