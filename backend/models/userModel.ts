import mongoose, { Model, Schema } from "mongoose";

interface UserProps {
    email: string;
    password: string;
    userName: string;
    displayPicture: string;
}

interface UserModel extends Model<UserProps> {
    signup(email: string, password: string, userName: string): any;
    login(email: string, password: string, userName: string): any;
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
    },
    displayPicture: {
        type: String
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

userSchema.statics.login = async function (email: string, password: string, userName: string) {
    if ((!email && !userName) || !password) {
        throw new Error("All fields are required");
    }

    const user = await this.findOne({ $or: [ { email }, { userName}]});

    if (!user) {
        throw new Error("Incorrect email or username");
    }

    if (password !== user.password) {
        throw new Error("Password is incorrect");
    }

    if (password.length < 6) {
        throw new Error("Password must be greater than six characters");
    }

    return user;
}

export default mongoose.model<UserProps, UserModel>("users", userSchema);