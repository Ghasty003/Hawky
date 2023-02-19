import express, { Application } from "express";
import mongoose from "mongoose";
import dotevn from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import userRoute from "./routes/userRoute";
import userFriendRoute from "./routes/userFriendRoute";
import messageRoute from "./routes/messageRoute";


interface activeUsersProps {
    socketId: string;
    senderId: string;
    receiverId: string;
}


class Connection {
    private app: Application;
    private io: Server;
    private http: any;
    private activeUsers: activeUsersProps[];

    public constructor() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = new Server(this.http, {
            cors: {
                origin: "http://localhost:5173"
            }
        });
        dotevn.config();
        this.activeUsers = [];
    }

    public useMiddleWares() {
        this.app.use(express.json({limit: "50mb"}));
        this.app.use(cors());
    }

    public initializeRoutes() {
        this.app.use("/api/user", userRoute);
        this.app.use("/api/friend", userFriendRoute);
        this.app.use("/api/message", messageRoute);
    }

    public initSocketConnection() {
        this.io.on("connection", (socket) => {
            console.log(socket.id);
        })
    }

    private listen() {
        this.http.listen(process.env.PORT, () => {
            console.log("Connected to db & server started on port", process.env.PORT);
        });
    }

    public async connectToDB() {
        await mongoose.connect("mongodb://0.0.0.0:27017/chatapp2");
        this.listen();
    }
}

const server = new Connection();

server.useMiddleWares();
server.initializeRoutes();
server.initSocketConnection();
server.connectToDB();