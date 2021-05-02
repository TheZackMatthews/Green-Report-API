import { sequelize } from "./index";
import { Sequelize, Model } from "sequelize";
import { DataTypes } from "sequelize";

interface SuperListInstance extends Model {
  email: string;
}

const superList = sequelize.define<SuperListInstance>(
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
