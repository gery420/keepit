import express from "express";
import {TestController} from "../controllers/test.js";

const router = express.Router();

router.get("/test", TestController.getTest);

export default router;
