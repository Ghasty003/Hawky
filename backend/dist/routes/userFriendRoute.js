"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userFriendController_1 = require("../controllers/userFriendController");
const requireAuth_1 = __importDefault(require("../middlewares/requireAuth"));
const router = (0, express_1.Router)();
router.use(requireAuth_1.default);
router.post("/addFriend", userFriendController_1.addFriend);
router.get("/", userFriendController_1.getFriends);
exports.default = router;
