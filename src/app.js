const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users/user');


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); 

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Utilisation des routes définies dans routes.js
app.use('/user', userRoutes);

// Gestionnaire d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur s\'est produite.' });
});

module.exports = app;