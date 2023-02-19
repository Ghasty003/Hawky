import { Router } from "express";
import { addFriend, getFriends } from "../controllers/userFriendController";
import requireAuth from "../middlewares/requireAuth";


const router = Router();

router.use(requireAuth);

router.post("/addFriend", addFriend);

router.get("/", getFriends);


export default router;