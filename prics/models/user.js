import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        image: String,
        password: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model.User || mongoose.model("User", userSchema);