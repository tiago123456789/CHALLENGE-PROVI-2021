import mongoose from "mongoose"

const genreSchema = new mongoose.Schema({
    name: String,
})

export default mongoose.model("genre", genreSchema);