import mongoose from "mongoose"

const artistSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    // @ts-ignore
    genre: {
        _id: String,
        name: String 
    }
})

export default mongoose.model("artist", artistSchema);
