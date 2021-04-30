const sequelize = require('./index.js');
const { Sequelize } = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const newReport = sequelize.define('addNewSuper', {
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
});

export newReport;
