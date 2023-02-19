"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userFriendController_1 = require("../controllers/userFriendController");
const router = (0, express_1.Router)();
router.post("/addFriend", userFriendController_1.addFriend);
exports.default = router;
