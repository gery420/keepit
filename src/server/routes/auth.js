import express from "express";
import {TestController, Login, Logout} from "../controllers/auth.js";
import Auth from "../middlewares/Auth.js";
const router = express.Router();

router.get("/test", TestController.getTest);
router.post("/login", Login.loginUser);
router.post("/logout", Auth, Logout.logoutUser);


export default router;
