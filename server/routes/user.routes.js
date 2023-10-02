import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";
import verifyUser from "../middleware/verifyUser.js";

router.get("/", verifyUser, userController.getHome);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

export default router;
