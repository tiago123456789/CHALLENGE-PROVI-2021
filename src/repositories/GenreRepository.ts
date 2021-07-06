import Genre from "../collections/Genre";
import AbstractRepository from "./AbstractRepository";
import GenreRepositoryInterface from "./GenreRepositoryInterface";

export default class GenreRepository 
    extends AbstractRepository 
    implements GenreRepositoryInterface {

    constructor() {
        super(Genre);
    }

    findByName(name: string): Promise<any> {
        return this.model.findOne({ name });
    }


}