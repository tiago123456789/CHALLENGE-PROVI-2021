import FactoryInterface from "./FactoryInterface";
import GenreRepositoryInterface from "../repositories/GenreRepositoryInterface";
import GenreRepository from "../repositories/GenreRepository";
import Genre from "../collections/Genre";

export default class GenreRepositoryFactory implements FactoryInterface<GenreRepositoryInterface> {

    make(data: { [key: string]: any }): GenreRepositoryInterface {
        return new GenreRepository(Genre)
    }

}