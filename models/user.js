import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  
    createdAt: { type: Date, default: Date.now },
    refreshToken: { type: String, default: "" },
});

export default mongoose.model("Users", userSchema);