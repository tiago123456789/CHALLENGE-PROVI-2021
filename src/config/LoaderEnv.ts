import dotenv from "dotenv";

const path = process.env.NODE_ENV == "testing" ? ".env.testing" : ".env"
dotenv.config({ path })