const { DataTypes } = require('sequelize');
const sequelize = require('../sequalize'); 

const student = sequelize.define('student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true 
  },
  name:{
    type:DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  surname:{
    type:DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  documentNumber:{
    type:DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telephone:{
    type:DataTypes.STRING,
    allowNull: true,
    unique: false
  }
});

module.exports = student;