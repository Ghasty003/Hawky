import express from "express";
import { addMessage, getLastMessage, getMessages } from "../controllers/messageController";


const router = express.Router();

router.post("/", addMessage);

router.get("/:senderId/:receiverId", getMessages);

router.get("/lastMessage/:senderId/:receiverId", getLastMessage);

export default router;
