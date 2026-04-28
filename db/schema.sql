CREATE DATABASE IF NOT EXISTS Portafolios
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE Portafolios;

CREATE TABLE IF NOT EXISTS users (
  id       INTEGER      NOT NULL AUTO_INCREMENT,
  username VARCHAR(50)  NOT NULL,
  password VARCHAR(32)  NOT NULL,
  bio      TEXT,
  email    VARCHAR(255),
  photo    VARCHAR(500),
  PRIMARY KEY (id),
  UNIQUE KEY uq_username (username),
  UNIQUE KEY uq_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS projects (
  id          INTEGER      NOT NULL AUTO_INCREMENT,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  repo_url    VARCHAR(500),
  live_url    VARCHAR(500),
  user_id     INTEGER      NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_project_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS social_links (
  id       INTEGER      NOT NULL AUTO_INCREMENT,
  platform VARCHAR(50)  NOT NULL,
  url      VARCHAR(500) NOT NULL,
  user_id  INTEGER      NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_social_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
