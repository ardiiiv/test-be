import express from "express";
import { register, login } from "../controllers/auth-controller.js";

const router = express.Router();


router.post("/register", register)
// buatkan endpoint login
router.post("/login", login)


export default router;