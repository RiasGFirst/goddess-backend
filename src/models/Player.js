const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  discord: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Player',
});

Player.associate = function(models) {
  Player.belongsToMany(models.Card, { through: models.PlayerCard, foreignKey: 'player_id' });
};

  

module.exports = Player;
