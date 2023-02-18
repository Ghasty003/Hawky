import express from "express";
import { deleteAccount, Login, signUp } from "../controllers/userController";

const router = express.Router();


router.post("/signup", signUp);

router.post("/login", Login);

router.delete("/:id", deleteAccount);

export default router;