const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/my-api');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

// Synchronisation du modèle avec la base de données
User.sync()
  .then(() => {
    console.log('Le modèle User a été synchronisé avec la base de données.');
  })
  .catch((error) => {
    console.error('Une erreur s\'est produite lors de la synchronisation du modèle User :', error);
  });
 

// // Contrôleur pour récupérer tous les utilisateurs
// async function getAllUsers(req, res) {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des utilisateurs.' });
//   }
// }

// module.exports = {
//   getAllUsers
// };


module.exports = User;