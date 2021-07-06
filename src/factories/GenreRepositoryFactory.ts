import FactoryInterface from "./FactoryInterface";
import GenreRepositoryInterface from "../repositories/GenreRepositoryInterface";
import GenreRepository from "../repositories/GenreRepository";

export default class GenreRepositoryFactory implements FactoryInterface<GenreRepositoryInterface> {

    make(data: { [key: string]: any }): GenreRepositoryInterface {
        return new GenreRepository()
    }

}