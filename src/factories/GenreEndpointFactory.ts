import ArtistEndpoint from "../endpoints/ArtistEndpoint";
import FactoryInterface from "./FactoryInterface";
import ArtistServiceFactory from "./ArtistServiceFactory"
import GenreEndpoint from "../endpoints/GenreEndpoint";
import GenreServiceFactory from "./GenreServiceFactory";

export default class GenreEndpointFactory implements FactoryInterface<GenreEndpoint> {
    
    make(data: { [key: string]: any; }): GenreEndpoint {
        return new GenreEndpoint(
            new GenreServiceFactory().make({})
        )
    }

}