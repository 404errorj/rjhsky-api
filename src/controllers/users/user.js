const User = require('../../models/users/user');
const bcrypt = require('bcrypt');

// Créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, mail, password, birthDate, creationDate } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      mail,
      password: hashedPassword,
      birthDate,
      creationDate
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur.' });
  }
}

// Se connecter (vérification du mot de passe)
exports.login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ where: { mail } });
    if (!user) {
      return res.status(401).json({ error: 'Adresse e-mail non valide.' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Mot de passe incorrect.' });
    }
    res.json({ message: 'Connexion réussie.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la connexion.' });
  }
}

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des utilisateurs.' });
  }
}

// Obtenir un utilisateur par son ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de l\'utilisateur.' });
  }
}

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const { firstName, lastName, mail, password, birthDate, creationDate } = req.body;
    const user = await User.findByPk(userId);
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.mail = mail;
      user.password = password;
      user.birthDate = birthDate;
      user.creationDate = creationDate;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour de l\'utilisateur.' });
  }
}

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      res.json({ message: 'Utilisateur supprimé avec succès.' });
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de l\'utilisateur.' });
  }
}
