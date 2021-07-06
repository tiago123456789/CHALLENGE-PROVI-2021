import BusinessLogicException from "../../src/exceptions/BusinessLogicException";
import NotFoundException from "../../src/exceptions/NotFoundException";
import AlbumServiceFactory from "../../src/factories/AlbumServiceFactory";
import ArtistServiceFactory from "../../src/factories/ArtistServiceFactory";
import GenreServiceFactory from "../../src/factories/GenreServiceFactory";
import AlbumRepository from "../../src/repositories/AlbumRepository";
import ArtistRepository from "../../src/repositories/ArtistRepository";
import GenreRepository from "../../src/repositories/GenreRepository";
import AlbumService from "../../src/services/AlbumService";
import ArtistService from "../../src/services/ArtistService";
import GenreService from "../../src/services/GenreService";

jest.mock("../../src/repositories/AlbumRepository");
jest.mock("../../src/repositories/ArtistRepository");
jest.mock("../../src/repositories/GenreRepository");


describe("Unit tests class AlbumService", () => {
    const registerFake = {
        "name": "Album Fake",
        "description": "description fake",
        "genre": "60e3baca97446b2eb55fccd6",
        "artist": "60e248ce9033654fd4e803a0",
    };

    const genreFake = {
        "id": "60e3baca97446b2eb55fccd6",
        "name": "Genre Fake",
    };

    const artistFake = {
        "id": "60e248ce9033654fd4e803a0",
        "name": "Artist Fake",
    };

    const idFake = "60e3baca97446b2eb55fccd6"


    it("Should return 2 artists when call findAll method", async () => {
        const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
        const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();

        albumRepositoryMocked.findAll.mockResolvedValue([
            registerFake, registerFake
        ])

        const albumService = new AlbumService(
            albumRepositoryMocked,
            new GenreServiceFactory().make({}),
            new AlbumServiceFactory().make({})
        );
        const albumReturned = await albumService.findAll();
        expect(2).toBe(albumReturned.length);
    })

    it("Should update with success", async () => {
        const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
        const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

        const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
        const genreRepositoryMocked = <jest.Mocked<AlbumRepository>>new GenreRepositoryMocked();

        const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
        const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();

        albumRepositoryMocked.findById.mockResolvedValue(registerFake)
        genreRepositoryMocked.findById.mockResolvedValue(genreFake);
        artistRepositoryMocked.findById.mockResolvedValue(artistFake);

        const genreService = new GenreService(
            genreRepositoryMocked
        );

        const artistService = new ArtistService(
            artistRepositoryMocked,
            genreService
        )

        const albumService = new AlbumService(
            albumRepositoryMocked,
            genreService,
            artistService
        );
        await albumService.update(idFake, registerFake);
        expect(albumRepositoryMocked.update.call.length).toBe(1);
    })

    it("Should trigger BusinessLogicException to the try update album with name already used", async () => {
        try {
            const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
            const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();

            albumRepositoryMocked.findById.mockResolvedValue(registerFake)
            albumRepositoryMocked.findByName.mockResolvedValue(registerFake)

            const albumService = new AlbumService(
                albumRepositoryMocked,
                new GenreServiceFactory().make({}),
                new AlbumServiceFactory().make({})
            );
            await albumService.update(idFake, registerFake);
        } catch (err) {
            expect(BusinessLogicException.name).toBe(err.name);
        }
    })

    it("Should trigger NotFoundException to the try update album not found", async () => {
        try {
            const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
            const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();

            albumRepositoryMocked.findById.mockResolvedValue(null)
            const albumService = new AlbumService(
                albumRepositoryMocked,
                new GenreServiceFactory().make({}),
                new AlbumServiceFactory().make({})
            );
            await albumService.update(idFake, registerFake);
        } catch (err) {
            expect(NotFoundException.name).toBe(err.name);
        }
    })


    it("Should trigger NotFoundException when try update album with genre not exist", async () => {
        try {
            const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
            const genreRepositoryMocked = <jest.Mocked<AlbumRepository>>new GenreRepositoryMocked();

            const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
            const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();
            
            albumRepositoryMocked.findById.mockResolvedValue(registerFake)
            genreRepositoryMocked.findById.mockResolvedValue(null);

            const genreService = new GenreService(
                genreRepositoryMocked
            );
            const artistService = new AlbumService(
                albumRepositoryMocked,
                genreService,
                new ArtistServiceFactory().make({})
            );
            await artistService.update(idFake, registerFake);
        } catch (error) {
            expect(error.name).toBe(NotFoundException.name);
        }
    })

    it("Should trigger NotFoundException when try update album with artist not exist", async () => {
        try {
            const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
            const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

            const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
            const genreRepositoryMocked = <jest.Mocked<AlbumRepository>>new GenreRepositoryMocked();

            const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
            const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();

            albumRepositoryMocked.findById.mockResolvedValue(registerFake)
            genreRepositoryMocked.findById.mockResolvedValue(genreFake);
            artistRepositoryMocked.findById.mockResolvedValue(null);

            const genreService = new GenreService(
                genreRepositoryMocked
            );

            const artistService = new ArtistService(
                artistRepositoryMocked,
                genreService
            )

            const albumService = new AlbumService(
                albumRepositoryMocked,
                genreService,
                artistService
            );
            await albumService.update(idFake, registerFake);
        } catch (error) {
            expect(error.name).toBe(NotFoundException.name);
        }
    })

    it("Should trigger NotFoundException to the try delete album not exist", async () => {
        try {
            const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
            const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();

            albumRepositoryMocked.findById.mockResolvedValue(null)

            const albumService = new AlbumService(
                albumRepositoryMocked,
                new GenreServiceFactory().make({}),
                new AlbumServiceFactory().make({})
            );
            await albumService.remove(idFake);
        } catch (err) {
            expect(NotFoundException.name).toBe(err.name);

        }

    })

    it("Should delete album with success", async () => {
        const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
        const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();

        albumRepositoryMocked.findById.mockResolvedValue(registerFake)

        const albumService = new AlbumService(
            albumRepositoryMocked,
            new GenreServiceFactory().make({}),
            new AlbumServiceFactory().make({})
        );
        await albumService.remove(idFake);
        expect(albumRepositoryMocked.delete.call.length).toBe(1);
    })

    it("Should trigger NotFoundException to the try find album not exist", async () => {
        try {
            const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
            const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();

            albumRepositoryMocked.findById.mockResolvedValue(null)

            const albumService = new AlbumService(
                albumRepositoryMocked,
                new GenreServiceFactory().make({}),
                new AlbumServiceFactory().make({})
            );
            await albumService.findById(idFake);
        } catch (err) {
            expect(NotFoundException.name).toBe(err.name);

        }

    })

    it("Should return artist when try find by id", async () => {
        const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
        const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();

        albumRepositoryMocked.findById.mockResolvedValue(registerFake)

        const albumService = new AlbumService(
            albumRepositoryMocked,
            new GenreServiceFactory().make({}),
            new AlbumServiceFactory().make({})
        );
        const albumReturned = await albumService.findById(idFake);
        expect(registerFake.name).toBe(albumReturned.name);
    })

    it("Should trigger BusinessLogicException when try create album with name already used", async () => {
        try {
            const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
            const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();
    
            albumRepositoryMocked.findByName.mockResolvedValue(registerFake)
    
            const albumService = new AlbumService(
                albumRepositoryMocked,
                new GenreServiceFactory().make({}),
                new AlbumServiceFactory().make({})
            );
            await albumService.create(registerFake);
        } catch (error) {
            expect(error.name).toBe(BusinessLogicException.name);
        }
    })

    it("Should create Artist with success", async () => {
        const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
        const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

        const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
        const genreRepositoryMocked = <jest.Mocked<AlbumRepository>>new GenreRepositoryMocked();

        const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
        const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();

        albumRepositoryMocked.findByName.mockResolvedValue(null);
        genreRepositoryMocked.findById.mockResolvedValue(genreFake);
        artistRepositoryMocked.findById.mockResolvedValue(artistFake);

        const genreService = new GenreService(
            genreRepositoryMocked
        );

        const artistService = new ArtistService(
            artistRepositoryMocked,
            genreService
        )

        const albumService = new AlbumService(
            albumRepositoryMocked,
            genreService,
            artistService
        );
        await albumService.create(registerFake);
        expect(albumRepositoryMocked.create.call.length).toBe(1);
    })


    it("Should trigger NotFoundException when try create album with genre not exist", async () => {
        try {
            const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
            const genreRepositoryMocked = <jest.Mocked<AlbumRepository>>new GenreRepositoryMocked();

            const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
            const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();

            albumRepositoryMocked.findByName.mockResolvedValue(null);
            genreRepositoryMocked.findById.mockResolvedValue(null);

            const genreService = new GenreService(
                genreRepositoryMocked
            );
            const artistService = new AlbumService(
                albumRepositoryMocked,
                genreService,
                new ArtistServiceFactory().make({})
            );
            await artistService.create(registerFake);
        } catch (error) {
            expect(error.name).toBe(NotFoundException.name);
        }
    })

    it("Should trigger NotFoundException when try create album with artist not exist", async () => {
        try {
            const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
            const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

            const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
            const genreRepositoryMocked = <jest.Mocked<AlbumRepository>>new GenreRepositoryMocked();

            const AlbumRepositoryMocked = <jest.Mock<AlbumRepository>>AlbumRepository;
            const albumRepositoryMocked = <jest.Mocked<AlbumRepository>>new AlbumRepositoryMocked();

            albumRepositoryMocked.findByName.mockResolvedValue(null);
            genreRepositoryMocked.findById.mockResolvedValue(genreFake);
            artistRepositoryMocked.findById.mockResolvedValue(null);

            const genreService = new GenreService(
                genreRepositoryMocked
            );

            const artistService = new ArtistService(
                artistRepositoryMocked,
                genreService
            )

            const albumService = new AlbumService(
                albumRepositoryMocked,
                genreService,
                artistService
            );
            await albumService.create(registerFake);
        } catch (error) {
            expect(error.name).toBe(NotFoundException.name);
        }
    })
})