const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Player = require('./Player');
const Card = require('./Card');

const PlayerCard = sequelize.define('PlayerCard', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  player_id: {
    type: DataTypes.STRING,
    references: {
      model: Player,
      key: 'id',
    },
  },
  card_id: {
    type: DataTypes.STRING,
    references: {
      model: Card,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
}, {
  tableName: 'Player_Card', // Spécifie explicitement le nom de la table
});

module.exports = PlayerCard;
