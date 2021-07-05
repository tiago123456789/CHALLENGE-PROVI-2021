import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String // ADMIN or CLIENT
})

export default mongoose.model("user", userSchema);