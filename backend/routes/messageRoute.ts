import express from "express";
import { addMessage, getLastMessage, getMessages } from "../controllers/messageController";
import requireAuth from "../middlewares/requireAuth";


const router = express.Router();

router.use(requireAuth);

router.post("/", addMessage);

router.get("/:senderId/:receiverId", getMessages);

router.get("/lastMessage/:senderId/:receiverId", getLastMessage);

export default router;
