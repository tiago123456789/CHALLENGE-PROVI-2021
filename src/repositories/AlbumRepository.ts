import AbstractRepository from "./AbstractRepository";
import AlbumRepositoryInterface from "./AlbumRepositoryInterface";
import Album from "../collections/Album"

export default class AlbumRepository 
    extends AbstractRepository 
    implements AlbumRepositoryInterface {

    constructor() {
        super(Album);
    }

    findByName(name: string): Promise<any> {
        return this.model.findOne({ name });
    }


}