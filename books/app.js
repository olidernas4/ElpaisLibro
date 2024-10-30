const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const bookRoutes = require('./src/routes/bookRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Configura las opciones de CORS
const corsOptions = {
  origin: 'http://localhost:3001', // Permite solo esta URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  credentials: true, // Permitir cookies si es necesario
};

// Usa el middleware cors con las opciones configuradas
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', bookRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});