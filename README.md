Descripción General
El sistema permite la gestión de libros mediante operaciones CRUD (Crear, Leer, Actualizar, Eliminar). Está dividido en dos partes:

Backend: Desarrollado con Node.js y Express, utilizando una base de datos MySQL para almacenamiento y gestionando la autenticación mediante JWT.
Frontend: Creado con React y estilizado con Bootstrap, proporcionando una interfaz de usuario interactiva y fácil de navegar.
Requisitos Previos
Antes de comenzar, se debe  tener instalados los siguientes programas:

Node.js y npm: Puedes descargarlos en Node.js. npm se incluye con la instalación de Node.
MySQL: Instala y configura una base de datos MySQL

Backend (bookBack)
Para instalar todas las dependencias del backend de una vez:
npm install bcrypt body-parser cors dotenv express jsonwebtoken mysql mysql2

npm install bcrypt         # Para encriptar contraseñas
npm install body-parser    # Para parsear peticiones HTTP
npm install cors           # Para permitir cross-origin requests
npm install dotenv         # Para manejar variables de entorno
npm install express        # Framework para crear el servidor
npm install jsonwebtoken   # Para manejo de JWT
npm install mysql          # Conector para MySQL
npm install mysql2         # Otra librería para MySQL con soporte adicional

Frontend (bookFront)
Para instalar todas las dependencias del frontend de una vez:

npm install bcryptjs                          # Para encriptar contraseñas en el frontend
npm install bootstrap                         # Para estilos y componentes de diseño
npm install crypto-browserify                 # Implementación de cifrado en el navegador
npm install react                             # Biblioteca principal de React
npm install react-bootstrap                   # Componentes de Bootstrap en React
npm install react-dom                         # Para manipulación del DOM con React
npm install react-router-dom                  # Para la navegación en la aplicación


con package.json
npm install
cada uno inixia con npm start
