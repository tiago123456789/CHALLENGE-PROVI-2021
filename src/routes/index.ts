import { Express } from "express"
import ArtistEndpointFactory from "../factories/ArtistEndpointFactory";
import UserEndpointFactory from "../factories/UserEndpointFactory";
import Authorization from "../middlewares/Authorization";
import handlerException from "../middlewares/HandlerException";
import handlerNotFound from "../middlewares/HandlerNotFound";
import upload from "../config/Storage"
import GenreEndpointFactory from "../factories/GenreEndpointFactory";
import AlbumEndpointFactory from "../factories/AlbumEndpointFactory";

const userEndpoint = new UserEndpointFactory().make({});
const genreEndpoint = new GenreEndpointFactory().make({});
const artistEndpoint = new ArtistEndpointFactory().make({});
const albumEndpoint = new AlbumEndpointFactory().make({});

export default (app: Express) => {


    app.post("/artists", Authorization.hasPermission("ADMIN"), upload.single("image"), artistEndpoint.create)
    app.get("/artists", artistEndpoint.findAll)
    app.get("/artists/:id", artistEndpoint.findById)
    app.put("/artists/:id", Authorization.hasPermission("ADMIN"), upload.single("image"), artistEndpoint.update)
    app.delete("/artists/:id", Authorization.hasPermission("ADMIN"), artistEndpoint.remove)

    app.post("/albums", Authorization.hasPermission("ADMIN"), upload.fields([ { name: "image", maxCount: 1 }, { name: 'musics', maxCount: 20 } ]), albumEndpoint.create)
    app.get("/albums", albumEndpoint.findAll) 
    app.get("/albums/:id", albumEndpoint.findById)
    app.put("/albums/:id", Authorization.hasPermission("ADMIN"), upload.fields([ { name: "image", maxCount: 1 }, { name: 'musics', maxCount: 20 } ]), albumEndpoint.update)
    app.delete("/albums/:id", Authorization.hasPermission("ADMIN"), albumEndpoint.remove)

    app.post("/genres", Authorization.hasPermission("ADMIN"), genreEndpoint.create)
    app.get("/genres", genreEndpoint.findAll)

    app.post("/auth/login", userEndpoint.authenticate);
    app.post("/auth/register", userEndpoint.create);
    app.post("/auth/logout", userEndpoint.logout);

    // Handler exceptions in aplication.
    app.use(handlerException);

    // Handler route not found.
    app.use(handlerNotFound)
}