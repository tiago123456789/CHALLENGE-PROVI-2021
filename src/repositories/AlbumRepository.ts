import AbstractRepository from "./AbstractRepository";
import AlbumRepositoryInterface from "./AlbumRepositoryInterface";

export default class AlbumRepository 
    extends AbstractRepository 
    implements AlbumRepositoryInterface {

    constructor(model: any) {
        super(model);
    }

    findByName(name: string): Promise<any> {
        return this.model.findOne({ name });
    }


}