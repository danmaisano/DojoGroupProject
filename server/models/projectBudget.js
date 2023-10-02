import { Model, DataTypes } from "sequelize";
import sequelize from "../db/init.js";
import dotenv from "dotenv";
dotenv.config();

class ProjectBudget extends Model {}

ProjectBudget.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    task_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    item_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    job_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phase_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    est_quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    est_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    est_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    rev_quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    rev_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    rev_amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "ProjectBudget",
    timestamps: true,
    underscored: true,
  }
);

export default ProjectBudget;
