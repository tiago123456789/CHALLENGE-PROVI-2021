import BusinessLogicException from "../exceptions/BusinessLogicException";
import NotFoundException from "../exceptions/NotFoundException";
import ArtistRepositoryInterface from "../repositories/ArtistRepositoryInterface";
import ArtistServiceInterface from "./ArtistServiceInterface";
import GenreServiceInterface from "./GenreServiceInterface";

export default class ArtistService implements ArtistServiceInterface {

    constructor(
        private readonly repository: ArtistRepositoryInterface,
        private readonly genreService: GenreServiceInterface
    ) {}

    async update(id: string, register: any): Promise<any> {
        await this.findById(id);
        const artistWithName = await this.repository.findByName(register.name);
        if (artistWithName && artistWithName._id != id) {
            throw new BusinessLogicException("Name already exists.");
        }
        register.genre = await this.genreService.findById(register.genre);
        return this.repository.update(id, register);
    }

    async remove(id: string): Promise<any> {
        await this.findById(id);
        return this.repository.delete(id);
    }

    findAll(): Promise<any> {
        return this.repository.findAll();
    }

    async findById(id: string): Promise<any> {
        const register = await this.repository.findById(id);
        if (!register) {
            throw new NotFoundException("Artist not found.")
        }
        return register;
    }

    async create(register: any): Promise<any> {
        const ArtistWithName = await this.repository.findByName(register.name);
        if (ArtistWithName) {
            throw new BusinessLogicException("Name already exists.");
        }
        register.genre = await this.genreService.findById(register.genre);
        return this.repository.create(register);
    }

}