// src/services/authService.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Función para registrar un nuevo usuario
const registerUser = async (username, password) => {
    try {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crear el nuevo usuario
        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        return { message: 'Usuario registrado con éxito', userId: newUser.id };
    } catch (error) {
        throw new Error('Error al registrar el usuario: ' + error.message);
    }
};

// Función para autenticar un usuario
const authenticateUser = async (username, password) => {
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { message: 'Autenticación exitosa', token };
    } catch (error) {
        throw new Error('Error al autenticar el usuario: ' + error.message);
    }
};

module.exports = {
    registerUser,
    authenticateUser
};
