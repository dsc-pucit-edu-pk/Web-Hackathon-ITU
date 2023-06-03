import mongoose from "mongoose"

const AuthSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["admin", "agent", "developer"],
        default: "developer"
    },
})

const AuthModel = mongoose.model("Auth", AuthSchema);
export default AuthModel;