const { DataTypes } = require('sequelize');
const sequelize = require('../sequalize'); 

const rates = sequelize.define('rates', {
  studentId:{
    type:DataTypes.NUMBER,
    allowNull: false,
    unique: false
  },
  subject:{
    type:DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  rate:{
    type:DataTypes.NUMBER,
    allowNull: false,
    unique: false
  },
  notes:{
    type:DataTypes.STRING,
    allowNull: true,
    unique: false
  }
});

module.exports = rates;