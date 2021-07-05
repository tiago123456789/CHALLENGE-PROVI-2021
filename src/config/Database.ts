import mongoose from "mongoose"

// @ts-ignore
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })