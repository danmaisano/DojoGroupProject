import { Model, DataTypes } from "sequelize";
import sequelize from "../db/init.js";
import dotenv from "dotenv";
dotenv.config();

class Contact extends Model {}

Contact.init(
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
        cell_phone: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                isNumeric: true,
            },
            unique: true,
        },
        work_phone: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                isNumeric: true,
            },
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
            unique: true,
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
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Company",
                key: "id",
            },
        },
        company_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Contacts",
        timestamps: true,
        underscored: true,
    }
);

export default Contact;