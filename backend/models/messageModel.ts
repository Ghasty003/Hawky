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
        required: true
    }
}, { timestamps: true });


export default mongoose.model("messages", messageSchema);