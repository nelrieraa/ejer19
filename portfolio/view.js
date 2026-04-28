const { layout } = require('../layout');

const PLATFORM_ICONS = {
  github: '🐙', linkedin: '💼', twitter: '🐦', x: '✖',
  instagram: '📸', youtube: '▶', website: '🌐', portfolio: '📂',
};

function portfolio(user, projects, socialLinks, isOwner, session = null) {
  const avatar = user.photo
    ? `<img src="${user.photo}" alt="${user.username}" class="avatar">`
    : `<div class="avatar-placeholder">${user.username.charAt(0).toUpperCase()}</div>`;

  const sociales = socialLinks.length
    ? socialLinks.map(l => {
        const icon = PLATFORM_ICONS[l.platform.toLowerCase()] || '🔗';
        return `<a href="${l.url}" target="_blank" rel="noopener" class="social-link">${icon} ${l.platform}</a>`;
      }).join('')
    : '<p class="muted">Sin enlaces sociales.</p>';

  const proyectos = projects.length
    ? projects.map(p => `
      <div class="project-card">
        <h3 class="project-title">${p.title}</h3>
        ${p.description ? `<p class="project-desc">${p.description}</p>` : ''}
        <div class="project-links">
          ${p.repo_url ? `<a href="${p.repo_url}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost">Repositorio</a>` : ''}
          ${p.live_url ? `<a href="${p.live_url}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">Demo en vivo</a>` : ''}
        </div>
      </div>`).join('')
    : '<p class="muted">Sin proyectos aún.</p>';

  const ownerBanner = isOwner
    ? `<div class="owner-banner">
        <span>Este es tu portafolio público</span>
        <a href="/dashboard" class="btn btn-sm btn-primary">Gestionar mi Portafolio</a>
       </div>`
    : '';

  return layout(`@${user.username}`, `
    ${ownerBanner}
    <div class="portfolio-layout">
      <aside class="portfolio-sidebar">
        <div class="profile-card">
          ${avatar}
          <h1 class="profile-username">@${user.username}</h1>
          ${user.bio ? `<p class="profile-bio">${user.bio}</p>` : ''}
          ${user.email ? `<p class="profile-email"><a href="mailto:${user.email}">${user.email}</a></p>` : ''}
        </div>
        <div class="social-section">
          <h2 class="section-label">Redes</h2>
          <div class="social-links-list">${sociales}</div>
        </div>
      </aside>
      <main class="portfolio-main">
        <div class="section-header">
          <h2 class="section-label">Proyectos <span class="badge-count">${projects.length}</span></h2>
        </div>
        <div class="projects-grid">${proyectos}</div>
      </main>
    </div>`, session);
}

module.exports = { portfolio };
