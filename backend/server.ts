import express, { Application } from "express";
import mongoose from "mongoose";
import dotevn from "dotenv";
import cors from "cors";

import userRoute from "./routes/userRoute";
import userFriendRoute from "./routes/userFriendRoute";
import messageRoute from "./routes/messageRoute";


class Server {
    private app: Application;

    public constructor() {
        this.app = express();
        dotevn.config();
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

    private listen() {
        this.app.listen(process.env.PORT, () => {
            console.log("Connected to db & server started on port", process.env.PORT);
        });
    }

    public async connectToDB() {
        await mongoose.connect("mongodb://0.0.0.0:27017/chatapp2");
        this.listen();
    }
}

const server = new Server();

server.useMiddleWares();
server.initializeRoutes();
server.connectToDB();