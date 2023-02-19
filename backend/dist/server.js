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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const userFriendRoute_1 = __importDefault(require("./routes/userFriendRoute"));
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
class Connection {
    constructor() {
        this.app = (0, express_1.default)();
        this.http = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.http, {
            cors: {
                origin: "http://localhost:5173"
            }
        });
        dotenv_1.default.config();
        this.activeUsers = [];
    }
    useMiddleWares() {
        this.app.use(express_1.default.json({ limit: "50mb" }));
        this.app.use((0, cors_1.default)());
    }
    initializeRoutes() {
        this.app.use("/api/user", userRoute_1.default);
        this.app.use("/api/friend", userFriendRoute_1.default);
        this.app.use("/api/message", messageRoute_1.default);
    }
    initSocketConnection() {
        this.io.on("connection", (socket) => {
            socket.on("add-new-user", (userId) => {
                if (!this.activeUsers.find(user => user.userId === userId) && userId) {
                    this.activeUsers.push({
                        userId,
                        socketId: socket.id
                    });
                    this.io.emit("get-online-users", this.activeUsers);
                }
            });
            socket.on("send-message", data => {
                const { receiverId } = data;
                const user = this.activeUsers.find(user => user.userId === receiverId);
                if (user) {
                    this.io.to(user.socketId).emit("receive-message", data);
                }
            });
            socket.on("disconnect", () => {
                this.activeUsers = this.activeUsers.filter(user => user.socketId !== socket.id);
                this.io.emit("get-online-users", this.activeUsers);
            });
        });
    }
    listen() {
        this.http.listen(process.env.PORT, () => {
            console.log("Connected to db & server started on port", process.env.PORT);
        });
    }
    connectToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect("mongodb://0.0.0.0:27017/chatapp2");
            this.listen();
        });
    }
}
const server = new Connection();
server.useMiddleWares();
server.initializeRoutes();
server.initSocketConnection();
server.connectToDB();
