const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Player = require('./Player');
const Card = require('./Card');

const PlayerCard = sequelize.define('PlayerCard', {
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
}, {
  tableName: 'Player_Card',
  indexes: [
    {
      unique: true,
      fields: ['player_id', 'card_id'],
    },
  ],
});

module.exports = PlayerCard;
