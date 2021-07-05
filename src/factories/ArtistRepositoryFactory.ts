import ArtistRepository from "../repositories/ArtistRepository";
import ArtistRepositoryInterface from "../repositories/ArtistRepositoryInterface";
import FactoryInterface from "./FactoryInterface";
import Artist from "../collections/Artist";

export default class ArtistRepositoryFactory implements FactoryInterface<ArtistRepositoryInterface> {

    make(data: { [key: string]: any; }): ArtistRepositoryInterface {
        return new ArtistRepository(Artist)
    }

}