import { Router } from "express";
import { addFriend } from "../controllers/userFriendController";



const router = Router();


router.post("/addFriend", addFriend);


export default router;