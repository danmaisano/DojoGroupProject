import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db_connections from "./db/init.js";
import userRoutes from "./routes/user.routes.js";
import opportunityRoutes from "./routes/opportunity.routes.js";
import companyRoutes from "./routes/company.routes.js";
import contactRoutes from "./routes/contact.routes.js";

import "dotenv/config";

const app = express();
const port = 8081;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test DB
db_connections
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error:" + err));

app.use("/users", userRoutes);
app.use("/opportunities", opportunityRoutes);
app.use("/company", companyRoutes);
app.use("/contacts", contactRoutes);

app.listen(port, () => {
  console.log("Running...Port: ", port);
});
