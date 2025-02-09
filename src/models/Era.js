const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Era = sequelize.define('Era', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'Era',
  timestamps: false,
});

module.exports = Era;
