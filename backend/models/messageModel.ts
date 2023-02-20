import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    text: {
        type: String,
    },
    image: {
        type: String
    }
}, { timestamps: true });


export default mongoose.model("messages", messageSchema);