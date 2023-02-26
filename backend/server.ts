import express, { Application } from "express";
import mongoose from "mongoose";
import dotevn from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http, { Server as httpServer } from "http";

import userRoute from "./routes/userRoute";
import userFriendRoute from "./routes/userFriendRoute";
import messageRoute from "./routes/messageRoute";


interface activeUsersProps {
    socketId: string;
    userId: string;
}


class Connection {
    private app: Application;
    private io: Server;
    private http: httpServer;
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

    public test() {
        this.app.get("/", (req, res) => {
            res.status(200).json("Testing server!");
        })
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
            socket.on("add-new-user", (userId) => {
                if (!this.activeUsers.find(user => user.userId === userId) && userId) {
                    this.activeUsers.push({
                        userId,
                        socketId: socket.id
                    });
                    this.io.emit("get-online-users", this.activeUsers);
                }
            })

            socket.on("send-message", data => {
                const { receiverId } = data;
                const user = this.activeUsers.find(user => user.userId === receiverId);
                
                if (user) {
                    this.io.to(user.socketId).emit("receive-message", data);
                }
            })

            socket.on("disconnect", () => {
                this.activeUsers = this.activeUsers.filter(user => user.socketId !== socket.id);
                this.io.emit("get-online-users", this.activeUsers);
            })
        })
    }

    private listen() {
        this.http.listen(process.env.PORT, () => {
            console.log("Connected to db & server started on port", process.env.PORT);
        });
    }

    public async connectToDB() {
        await mongoose.connect(process.env.DB_URI as string);
        this.listen();
    }
}

const server = new Connection();

server.useMiddleWares();
server.initializeRoutes();
server.initSocketConnection();
server.test();
server.connectToDB();