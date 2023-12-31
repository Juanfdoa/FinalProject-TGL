const { DataTypes } = require('sequelize');
const sequelize = require('../sequalize'); 

const user = sequelize.define('user', {
  email:{
    type:DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = user;