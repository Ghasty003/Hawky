import express from "express";
import { Login, signUp } from "../controllers/userController";

const router = express.Router();


router.post("/signup", signUp);

router.post("/login", Login);


export default router;