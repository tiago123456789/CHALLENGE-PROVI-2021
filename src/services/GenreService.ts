import BusinessLogicException from "../exceptions/BusinessLogicException";
import NotFoundException from "../exceptions/NotFoundException";
import GenreRepositoryInterface from "../repositories/GenreRepositoryInterface";
import GenreServiceInterface from "./GenreServiceInterface";

export default class GenreService implements GenreServiceInterface {

    constructor(private readonly repository: GenreRepositoryInterface) {}

    findAll(): Promise<any> {
        return this.repository.findAll();
    }

    async findById(id: string): Promise<any> {
        const register = await this.repository.findById(id);
        if (!register) {
            throw new NotFoundException("Genre not found.")
        }
        return register;
    }

    async create(register: any): Promise<any> {
        const genreWithName = await this.repository.findByName(register.name);
        if (genreWithName) {
            throw new BusinessLogicException("Name already exists.");
        }
        return this.repository.create(register);
    }

}