USE Portafolios;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE social_links;
TRUNCATE TABLE projects;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO users (username, password, bio, email, photo) VALUES
('ana_dev',     MD5('password123'), 'Desarrolladora Full Stack con 3 años de experiencia en React y Node.js. Apasionada por el código limpio y la UX.', 'ana@example.com',    'https://i.pravatar.cc/150?img=47'),
('carlos_code', MD5('password123'), 'Backend developer. Python y Django son mi stack principal. Actualmente aprendiendo Rust.',                          'carlos@example.com', 'https://i.pravatar.cc/150?img=12');

INSERT INTO projects (title, description, repo_url, live_url, user_id) VALUES
('Portfolio Personal',     'Construido con React y TailwindCSS, desplegado en Vercel.',                          'https://github.com/example/portfolio',     'https://ana-dev.vercel.app',              1),
('API REST con Node.js',   'API completa con autenticación JWT, CRUD y documentación Swagger.',                  'https://github.com/example/node-api',      NULL,                                      1),
('Chat en tiempo real',    'Aplicación de chat usando Socket.io, Express y MongoDB.',                            'https://github.com/example/chat-app',      'https://chat-demo.up.railway.app',        1),
('Blog con Django',        'Blog completo con Django, autenticación y panel de administración.',                 'https://github.com/example/django-blog',   'https://blog.pythonanywhere.com',         2),
('Scraper de noticias',    'Bot de scraping con BeautifulSoup que agrega noticias de tecnología diariamente.',  'https://github.com/example/news-scraper',  NULL,                                      2);

INSERT INTO social_links (platform, url, user_id) VALUES
('GitHub',   'https://github.com/ana_dev',          1),
('LinkedIn', 'https://linkedin.com/in/ana_dev',     1),
('Twitter',  'https://twitter.com/ana_dev',          1),
('GitHub',   'https://github.com/carlos_code',      2),
('LinkedIn', 'https://linkedin.com/in/carlos_code', 2);
