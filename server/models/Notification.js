import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        immutable: true,
        default: () => Date.now()
    }
})

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;