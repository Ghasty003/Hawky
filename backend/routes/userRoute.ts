import express from "express";
import { deleteAccount, findUser, Login, signUp } from "../controllers/userController";
import requireAuth from "../middlewares/requireAuth";

const router = express.Router();

router.use(requireAuth);

router.post("/signup", signUp);

router.post("/login", Login);

router.delete("/delete/:id", deleteAccount);

router.get("/:userName", findUser);

export default router;