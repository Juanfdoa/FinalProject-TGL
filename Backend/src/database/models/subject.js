const { DataTypes } = require('sequelize');
const sequelize = require('../sequalize'); 

const subject = sequelize.define('subject', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  teacher: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = subject;