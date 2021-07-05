import AbstractRepository from "./AbstractRepository";
import GenreRepositoryInterface from "./GenreRepositoryInterface";

export default class GenreRepository 
    extends AbstractRepository 
    implements GenreRepositoryInterface {

    constructor(model: any) {
        super(model);
    }

    findByName(name: string): Promise<any> {
        return this.model.findOne({ name });
    }


}