import AbstractRepository from "./AbstractRepository";
import ArtistRepositoryInterface from "./ArtistRepositoryInterface";

export default class ArtistRepository 
    extends AbstractRepository 
    implements ArtistRepositoryInterface {

    constructor(model: any) {
        super(model);
    }

    findByName(name: string): Promise<any> {
        return this.model.findOne({ name });
    }


}