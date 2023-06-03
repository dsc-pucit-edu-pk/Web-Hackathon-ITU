import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    email: { type: String, required: true , unique: true},
    hashedPassword:{ type: String, required: true},

    wishlist : [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
})

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;