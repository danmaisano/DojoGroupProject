import { Model, DataTypes } from "sequelize";
import sequelize from "../db/init.js";
import dotenv from "dotenv";
dotenv.config();

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Company",
        key: "id",
      },
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100],
      },
    },
  },
  {
    sequelize,
    modelName: "Users",
    timestamps: true,
    underscored: true,
  }
);

export default User;
