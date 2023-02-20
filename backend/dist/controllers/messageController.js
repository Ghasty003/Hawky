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
exports.getLastMessage = exports.getMessages = exports.addMessage = void 0;
const messageModel_1 = __importDefault(require("../models/messageModel"));
function addMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { text, image, senderId, receiverId } = req.body;
        try {
            const chat = yield messageModel_1.default.create({ text, image, senderId, receiverId });
            res.status(200).json(chat);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
exports.addMessage = addMessage;
function getMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { senderId, receiverId } = req.params;
        try {
            const chats = yield messageModel_1.default.find({
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
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
exports.getMessages = getMessages;
function getLastMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { senderId, receiverId } = req.params;
        const uId = req.user._id;
        try {
            const chats = yield messageModel_1.default.findOne({
                $and: [
                    {
                        $or: [{ senderId: senderId }, { receiverId: senderId }],
                    },
                    {
                        $or: [{ receiverId: receiverId }, { senderId: receiverId }],
                    },
                ],
            }).sort({ createdAt: -1 }).select("text").where("senderId").ne(uId);
            res.status(200).json(chats);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
exports.getLastMessage = getLastMessage;
