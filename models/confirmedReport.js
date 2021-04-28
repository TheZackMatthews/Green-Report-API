const sequelize = require('./index.js');
const { Sequelize } = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const confirmedReport = sequelize.define('confirmedReport', {
  // Model attributes are defined here
  productName: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  productCategory: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  productCompany: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  reasonForFlagging: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contributedBy: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
});

module.exports = confirmedReport;