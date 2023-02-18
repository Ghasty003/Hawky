import mongoose, { Model, Schema } from "mongoose";

interface UserProps {
    email: string;
    password: string;
    userName: string;
}

interface UserModel extends Model<UserProps> {
    signup(email: string, password: string, userName: string): any;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    }
});


userSchema.statics.signup = async function (email: string, password: string, userName: string) {
    if (!email || !password || !userName) {
        throw new Error("All fields are required");
    }

    const exists = await this.findOne({ $or: [{email}, {userName}] });

    if (exists) {
        throw new Error("User already exists")
    }

    const user = await this.create({email, password, userName});
    
    return user;
}

export default mongoose.model<UserProps, UserModel>("users", userSchema);