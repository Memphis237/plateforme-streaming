-- =====================================================
-- Base de données : plateforme_streaming
-- =====================================================

CREATE DATABASE IF NOT EXISTS plateforme-streaming
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- =====================================================
-- Table : users
-- =====================================================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =====================================================
-- Table : favorites_films
-- =====================================================

CREATE TABLE favorites_films (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    date_film DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    UNIQUE (user_id, movie_id)
) ENGINE=InnoDB;

-- =====================================================
-- Table : favorites_series
-- =====================================================

CREATE TABLE favorites_series (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    serie_id INT NOT NULL,
    date_serie DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    UNIQUE (user_id, serie_id)
) ENGINE=InnoDB;
