import sequelize from "./index";
import { Sequelize } from "sequelize";
const DataTypes = Sequelize.DataTypes;

const superList = sequelize.define(
  "addNewSuper",
  {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

export { superList };
