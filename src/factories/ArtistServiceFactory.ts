import ArtistService from "../services/ArtistService";
import ArtistServiceInterface from "../services/ArtistServiceInterface";
import FactoryInterface from "./FactoryInterface";
import ArtistRepositoryFactory from "./ArtistRepositoryFactory";
import GenreServiceFactory from "./GenreServiceFactory";

export default class ArtistServiceFactory implements FactoryInterface<ArtistServiceInterface> {

    make(data: { [key: string]: any; }): ArtistServiceInterface {
        return new ArtistService(
            new ArtistRepositoryFactory().make({}),
            new GenreServiceFactory().make({})
        );
    }

}