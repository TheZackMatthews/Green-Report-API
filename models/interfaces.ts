import { Model } from "sequelize";

export interface ReportInstance extends Model {
  productName: string;
  productCategory: string;
  productCompany: string[];
  reasonForFlagging: string;
  contributedBy: string;
}
