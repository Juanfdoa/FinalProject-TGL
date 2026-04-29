const { DataTypes } = require('sequelize');
const sequelize = require('../sequalize'); 

const rates = sequelize.define('rates', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  studentId:{
    type:DataTypes.UUID,
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