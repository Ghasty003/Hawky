import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";


async function requireAuth(req: Request | any, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: "Authorization token required"});
    }

    const token = authorization.split(" ")[1];

    try {
        const { _id }  = jwt.verify(token, process.env.SECRET as Secret) as any;
        req.user = await User.findOne({ _id }).select("_id");

        next();
    } catch (error) {
        res.status(401).json({error: "Request is not authorized"});
    }
}


export default requireAuth;