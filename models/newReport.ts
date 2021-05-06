import { sequelize } from "./index";
import { ReportInstance } from "./interfaces";
import { DataTypes } from "sequelize";

const newReport = sequelize.define<ReportInstance>(
  "newReport",
  {
    // Model attributes are defined here
    productName: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    productCategory: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    productCompany: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    reasonForFlagging: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contributedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

export { newReport };
