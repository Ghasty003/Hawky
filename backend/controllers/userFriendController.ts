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
        const exists = await Friend.find({
            "friendDetails.userId": userId,
            "friendDetails.friendId": friendId,
        });

        if (exists.length > 0) {
            console.log(exists)
            return res.status(401).json({error: "User already exists in your collection"});
        }

        await friend.save();
        res.status(200).json({userId, friendId, friendImage, userName, friendUsername});
    } catch (error) {
        res.status(400).json({error: (error as Error).message});
    }
}