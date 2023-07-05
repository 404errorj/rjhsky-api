const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users/user');

// Route pour obtenir tous les utilisateurs
router.get('/', usersController.getAllUsers);

// Route pour créer un utilisateur
router.post('/', usersController.createUser);

// Route pour authentifier un utilisateur au login
router.post('/auth', usersController.login);

// Route pour obtenir un utilisateur par son ID
router.get('/:id', usersController.getUserById);

// Route pour mettre à jour un utilisateur
router.put('/:id', usersController.updateUser);

// Route pour supprimer un utilisateur
router.delete('/:id', usersController.deleteUser);

module.exports = router;
