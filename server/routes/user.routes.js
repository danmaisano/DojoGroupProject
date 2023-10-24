import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";
import verifyUser from "../middleware/verifyUser.js";
import checkPermission from "../middleware/checkPermission.js";



router.get("/", verifyUser, checkPermission('readOwn','company'), userController.getHome);
router.post("/register", userController.register);
router.post("/createUser", verifyUser, checkPermission('createAny', 'user'), userController.createUser);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/:company_id", verifyUser, checkPermission('readOwn','company'), userController.getAllUsersByCompany);
router.put("/update/:id", verifyUser, checkPermission('update','user'), userController.updateUser);
router.delete("/delete/:id", verifyUser, checkPermission('deleteOwn','user'), userController.deleteUser);
router.get("/verify/:token", userController.verifyEmail);




export default router;
