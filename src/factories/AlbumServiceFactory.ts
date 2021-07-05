import AlbumService from "../services/AlbumService";
import AlbumServiceInterface from "../services/AlbumServiceInterface";
import FactoryInterface from "./FactoryInterface";
import AlbumRepositoryFactory from "./AlbumRepositoryFactory";
import GenreServiceFactory from "./GenreServiceFactory";
import ArtistServiceFactory from "./ArtistServiceFactory";

export default class AlbumServiceFactory implements FactoryInterface<AlbumServiceInterface> {

    make(data: { [key: string]: any; }): AlbumServiceInterface {
        return new AlbumService(
            new AlbumRepositoryFactory().make({}),
            new GenreServiceFactory().make({}),
            new ArtistServiceFactory().make({})
        );
    }

}