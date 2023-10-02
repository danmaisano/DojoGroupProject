import { Model, DataTypes } from "sequelize";
import sequelize from "../db/init.js";
import dotenv from "dotenv";
dotenv.config();

class Opportunity extends Model {}

Opportunity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    opportunity_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    prospect_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    opportunity_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pot_rev: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    chance_of_winning: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Identified",
    },
    opportunity_win_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Opportunities",
    timestamps: true,
    underscored: true,
  }
);

export default Opportunity;
