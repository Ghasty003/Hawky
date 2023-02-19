import { Request, Response } from "express";
import Friend from "../models/userFriendModel";


export async function addFriend(req: Request, res: Response) {
    const { userId, friendId, friendImage, friendUsername, userName } = req.body;

    const friend = new Friend({
        friendDetails: {
            userId,
            friendId,
            friendImage,
            friendUsername,
            userName
        }
    });

    try {
        await friend.save();
        res.status(200).json({userId, friendId, friendImage, userName, friendUsername});
    } catch (error) {
        res.status(400).json({error: (error as Error).message});
    }
}