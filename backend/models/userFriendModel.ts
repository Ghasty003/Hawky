import mongoose, { Schema } from "mongoose";

const userFriendSchema = new Schema({
    friendDetails: {
        type: Map,
        of: String
    }
});


export default mongoose.model("userFriends", userFriendSchema);