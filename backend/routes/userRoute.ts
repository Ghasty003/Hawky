import express from "express";
import { signUp } from "../controllers/userController";

const router = express.Router();


router.post("/signup", signUp);