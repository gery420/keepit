import express from "express";
import {Register, Profile}  from "../controllers/user.js";
import Auth from "../middlewares/Auth.js";

const router = express.Router();

router.post("/register", Register.registerUser);
router.get("/profile", Auth, Profile.getProfile);

export default router;
