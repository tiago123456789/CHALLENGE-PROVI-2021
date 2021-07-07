import mongoose from "mongoose"

const albumSchema = new mongoose.Schema({
    name: String,
    image: String,
    // @ts-ignore
    genre: {
        _id: String,
        name: String 
    },
    artist: {
        _id: String,
        name: String,
        image: String
    },
    musics: [String]
})

export default mongoose.model("album", albumSchema);