import express from "express";
import dotenv from "dotenv"
import helmet from "helmet"
dotenv.config();
import "./Database";
import "./Sentry"
import routesApp from "../routes/index"
const app = express();

// Enable middleware apply http headers to enabled more security in application.
app.use(helmet());

// Enable middleware make parse data to json.
app.use(express.json())

// Enable middleware make form data to json.
app.use(express.urlencoded())

// Load routes the application.
routesApp(app)

app.listen(process.env.PORT, () => console.log(`Server is running in address ${process.env.URL_APP}`))