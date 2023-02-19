import { Request, Response } from 'express';
import Message from "../models/messageModel";

export async function addMessage(req: Request, res: Response) {
    const { message, senderId, receiverId } = req.body;
  
    try {
      const chat = await Message.create({ message, senderId, receiverId });
      res.status(200).json(chat);
    } catch (error) {
      res.status(400).json({ error:( error as Error).message });
    }
}
  
export async function getMessages(req: Request, res: Response ) {
    const { senderId, receiverId } = req.params;

    try {
        const chats = await Message.find({
            $and: [
                {
                $or: [{ senderId: senderId }, { receiverId: senderId }],
                },
                {
                $or: [{ receiverId: receiverId }, { senderId: receiverId }],
                },
            ],
        });
        res.status(200).json(chats);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}