-- Crear la base de datos
-- CREATE DATABASE IF NOT EXISTS book_management;
USE book_management;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Crear la tabla de libros
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    status INT NOT NULL CHECK (status IN (1, 2, 3)), -- Estado del libro (1: por leer, 2: leyendo, 3: leído)
    rating INT CHECK (rating BETWEEN 1 AND 5), 
    genre VARCHAR(100) NOT NULL
);

-- Opcional: Agregar datos de ejemplo
INSERT INTO books (title, author, status, rating, genre)
VALUES 
    ('1984', 'George Orwell', 1, 5, 'Dystopian'),
    ('The Catcher in the Rye', 'J.D. Salinger', 2, 4, 'Classic Fiction'),
    ('To Kill a Mockingbird', 'Harper Lee', 3, 5, 'Classic Fiction');
