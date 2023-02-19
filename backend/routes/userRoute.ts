import express from "express";
import { deleteAccount, findUser, Login, signUp } from "../controllers/userController";

const router = express.Router();


router.post("/signup", signUp);

router.post("/login", Login);

router.delete("/delete/:id", deleteAccount);

router.get("/:userName", findUser);

export default router;