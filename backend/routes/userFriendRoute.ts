import { Router } from "express";
import { addFriend } from "../controllers/userFriendController";
import requireAuth from "../middlewares/requireAuth";


const router = Router();

router.use(requireAuth);

router.post("/addFriend", addFriend);


export default router;