import express from "express";
import "./LoaderEnv"
import helmet from "helmet"
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

export default app