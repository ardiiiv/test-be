import express from "express";
import { predict } from "../controllers/predit-controller.js";

const router = express.Router();

router.post("/predict", predict);

export default router;