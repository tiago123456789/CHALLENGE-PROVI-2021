import Artist from "../collections/Artist";
import AbstractRepository from "./AbstractRepository";
import ArtistRepositoryInterface from "./ArtistRepositoryInterface";

export default class ArtistRepository 
    extends AbstractRepository 
    implements ArtistRepositoryInterface {

    constructor() {
        super(Artist);
    }

    findByName(name: string): Promise<any> {
        return this.model.findOne({ name });
    }


}