import express, { Application } from "express";
import mongoose from "mongoose";
import dotevn from "dotenv";
import cors from "cors";

dotevn.config();


class Server {
    private app: Application;

    public constructor() {
        this.app = express();
    }

    public useMiddleWares() {
        this.app.use(cors());
    }

    public initializeRoutes() {

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