import BusinessLogicException from "../exceptions/BusinessLogicException";
import NotFoundException from "../exceptions/NotFoundException";
import AlbumRepositoryInterface from "../repositories/AlbumRepositoryInterface";
import AlbumServiceInterface from "./AlbumServiceInterface";
import ArtistServiceInterface from "./ArtistServiceInterface";
import GenreServiceInterface from "./GenreServiceInterface";

export default class AlbumService implements AlbumServiceInterface {

    constructor(
        private readonly repository: AlbumRepositoryInterface,
        private readonly genreService: GenreServiceInterface,
        private readonly artistService: ArtistServiceInterface
    ) {}

    findAll(): Promise<any> {
        return this.repository.findAll();
    }

    async findById(id: string): Promise<any> {
        const register = await this.repository.findById(id);
        if (!register) {
            throw new NotFoundException("Album not found.")
        }
        return register;
    }

    async create(register: any): Promise<any> {
        const AlbumWithName = await this.repository.findByName(register.name);
        if (AlbumWithName) {
            throw new BusinessLogicException("Name already exists.");
        }
        register.genre = await this.genreService.findById(register.genre);
        register.artist = await this.artistService.findById(register.artist);
        return this.repository.create(register);
    }

    async update(id: string, register: any): Promise<any> {
        await this.findById(id);
        const artistWithName = await this.repository.findByName(register.name);
        if (artistWithName && artistWithName._id != id) {
            throw new BusinessLogicException("Name already exists.");
        }
        register.genre = await this.genreService.findById(register.genre);
        register.artist = await this.artistService.findById(register.artist);
        return this.repository.update(id, register);
    }

    async remove(id: string): Promise<any> {
        await this.findById(id);
        return this.repository.delete(id);
    }
}