import Sequelize from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const db_connections = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
const executeSqlScripts = async () => {
  const sqlFolderPath = path.resolve("../server/SQL_scripts");
  const sqlFiles = fs.readdirSync(sqlFolderPath);

  for (const file of sqlFiles) {
    const filePath = path.join(sqlFolderPath, file);
    const sql = fs.readFileSync(filePath, "utf-8");
    await db_connections
      .query(sql)
      .then(() => {
        console.log(`Executed SQL script ${file}`);
      })
      .catch((err) => {
        console.error(`Error while executing SQL script ${file}:`, err);
      });
  }
};

// Running DB Initialization After Authentication
db_connections
  .authenticate()
  .then(() => {
    console.log("Database connected.");
    executeSqlScripts(); // Execute SQL scripts after successful authentication
  })
  .catch((err) => {
    console.log("Database Connection Error:" + err);
  });

export default db_connections;
