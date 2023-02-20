import { Request, Response } from 'express';
import Message from "../models/messageModel";

export async function addMessage(req: Request, res: Response) {
    const { text, image, senderId, receiverId } = req.body;
  
    try {
      const chat = await Message.create({ text, image, senderId, receiverId });
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


export async function getLastMessage(req: Request | any, res: Response) {
    const { senderId, receiverId } = req.params;

    const uId = req.user._id;

    try {
        const chats = await Message.findOne({
            $and: [
                {
                $or: [{ senderId: senderId }, { receiverId: senderId }],
                },
                {
                $or: [{ receiverId: receiverId }, { senderId: receiverId }],
                },
            ],
        }).sort({createdAt: -1}).select("text image").where("senderId").ne(uId);

        if (chats?.text === ""  || chats?.image) {
            return res.status(200).json({text: "image-alt-send"})
        }
        
        res.status(200).json(chats);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}