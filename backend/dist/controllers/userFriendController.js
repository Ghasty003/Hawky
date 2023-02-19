"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFriend = void 0;
const userFriendModel_1 = __importDefault(require("../models/userFriendModel"));
function addFriend(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, friendId, friendImage, friendUsername, userName } = req.body;
        const friend = new userFriendModel_1.default({
            friendDetails: {
                userId,
                friendId,
                friendImage,
                friendUsername,
                userName
            }
        });
        try {
            const exists = yield userFriendModel_1.default.find({
                "friendDetails.userId": userId,
                "friendDetails.friendId": friendId,
            });
            if (exists.length > 0) {
                console.log(exists);
                return res.status(401).json({ error: "User already exists in your collection" });
            }
            yield friend.save();
            res.status(200).json({ userId, friendId, friendImage, userName, friendUsername });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
exports.addFriend = addFriend;
