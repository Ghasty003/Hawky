import express, { Application } from "express";
import mongoose from "mongoose";
import dotevn from "dotenv";
import cors from "cors";

import userRoute from "./routes/userRoute";

dotevn.config();


class Server {
    private app: Application;

    public constructor() {
        this.app = express();
    }

    public useMiddleWares() {
        this.app.use(express.json({limit: "50mb"}));
        this.app.use(cors());
    }

    public initializeRoutes() {
        this.app.use(userRoute);
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