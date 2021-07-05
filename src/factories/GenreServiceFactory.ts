import GenreService from "../services/GenreService";
import GenreServiceInterface from "../services/GenreServiceInterface";
import FactoryInterface from "./FactoryInterface";
import GenreRepositoryFactory from "./GenreRepositoryFactory";

export default class GenreServiceFactory implements FactoryInterface<GenreServiceInterface> {

    make(data: { [key: string]: any; }): GenreServiceInterface {
        return new GenreService(
            new GenreRepositoryFactory().make({})
        );
    }

}