import { Model, DataTypes } from "sequelize";
import sequelize from "../db/init.js";
import User from "./user.js";
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "User",
          key: "id",
      },
      validate: {
          notEmpty: true,
      },
  },
    opportunity_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
    company_id: {
      type: DataTypes.INTEGER,
      references: {
          model: "Company",
          key: "id",
      },
      allowNull: true,
    },
    contact_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Contact",
        key: "id",
      },
      allowNull: true,
    },
    opportunity_win_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
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

Opportunity.belongsTo(User, {
  foreignKey: "user_id",
});


export default Opportunity;
