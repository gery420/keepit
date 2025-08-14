import express from "express";
import {TestController} from "../controllers/auth.js";

const router = express.Router();

router.get("/test", TestController.getTest);

export default router;
