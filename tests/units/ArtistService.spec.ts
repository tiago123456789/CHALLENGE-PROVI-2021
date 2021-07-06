import BusinessLogicException from "../../src/exceptions/BusinessLogicException";
import NotFoundException from "../../src/exceptions/NotFoundException";
import GenreServiceFactory from "../../src/factories/GenreServiceFactory";
import ArtistRepository from "../../src/repositories/ArtistRepository";
import GenreRepository from "../../src/repositories/GenreRepository";

import ArtistService from "../../src/services/ArtistService";
import GenreService from "../../src/services/GenreService";

jest.mock("../../src/repositories/ArtistRepository");
jest.mock("../../src/repositories/GenreRepository");


describe("Unit tests class ArtistService", () => {
    const registerFake = {
        "name": "Artist Fake",
        "description": "description fake",
        "genre": "60e3baca97446b2eb55fccd6"
    };

    const genreFake = {
        "id": "60e3baca97446b2eb55fccd6",
        "name": "Genre Fake",
    };

    const idFake = "60e3baca97446b2eb55fccd6"


    it("Should return 2 artists when call findAll method", async () => {
        const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
        const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

        artistRepositoryMocked.findAll.mockResolvedValue([
            registerFake, registerFake
        ])

        const artistService = new ArtistService(
            artistRepositoryMocked,
            new GenreServiceFactory().make({})
        );
        const ArtistsReturned = await artistService.findAll();
        expect(2).toBe(ArtistsReturned.length);
    })

    it("Should update with success", async () => {
        const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
        const genreRepositoryMocked = <jest.Mocked<ArtistRepository>>new GenreRepositoryMocked();

        const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
        const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

        artistRepositoryMocked.findByName.mockResolvedValue(null)
        artistRepositoryMocked.findById.mockResolvedValue(registerFake)
        genreRepositoryMocked.findById.mockResolvedValue(genreFake);

        const genreService = new GenreService(
            genreRepositoryMocked
        );

        const artistService = new ArtistService(
            artistRepositoryMocked,
            genreService
        );
        await artistService.update(idFake, registerFake);
        expect(artistRepositoryMocked.create.call.length).toBe(1);
    })

    it("Should trigger BusinessLogicException to the try update artist with name already used", async () => {
        try {
            const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
            const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

            artistRepositoryMocked.findByName.mockResolvedValue(registerFake)
            artistRepositoryMocked.findById.mockResolvedValue(registerFake)

            const artistService = new ArtistService(
                artistRepositoryMocked,
                new GenreServiceFactory().make({})
            );
            await artistService.update(idFake, registerFake);
        } catch (err) {
            expect(BusinessLogicException.name).toBe(err.name);
        }
    })

    it("Should trigger NotFoundException to the try update artist not found", async () => {
        try {
            const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
            const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

            artistRepositoryMocked.findById.mockResolvedValue(null)

            const artistService = new ArtistService(
                artistRepositoryMocked,
                new GenreServiceFactory().make({})
            );
            await artistService.update(idFake, registerFake);
        } catch (err) {
            expect(NotFoundException.name).toBe(err.name);
        }
    })

    it("Should trigger NotFoundException to the try delete artists not exist", async () => {
        try {
            const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
            const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

            artistRepositoryMocked.findById.mockResolvedValue(null)

            const artistService = new ArtistService(
                artistRepositoryMocked,
                new GenreServiceFactory().make({})
            );
            await artistService.remove(idFake);
        } catch (err) {
            expect(NotFoundException.name).toBe(err.name);

        }

    })

    it("Should delete artist with success", async () => {
        const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
        const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

        artistRepositoryMocked.findById.mockResolvedValue(registerFake)

        const artistService = new ArtistService(
            artistRepositoryMocked,
            new GenreServiceFactory().make({})
        );
        await artistService.remove(idFake);
        expect(artistRepositoryMocked.delete.call.length).toBe(1);
    })

    it("Should trigger NotFoundException to the try find artists not exist", async () => {
        try {
            const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
            const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

            artistRepositoryMocked.findById.mockResolvedValue(null)

            const artistService = new ArtistService(
                artistRepositoryMocked,
                new GenreServiceFactory().make({})
            );
            await artistService.findById(idFake);
        } catch (err) {
            expect(NotFoundException.name).toBe(err.name);

        }

    })

    it("Should return artist when try find by id", async () => {
        const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
        const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

        artistRepositoryMocked.findById.mockResolvedValue(registerFake)

        const artistService = new ArtistService(
            artistRepositoryMocked,
            new GenreServiceFactory().make({})
        );
        const ArtistReturned = await artistService.findById(idFake);
        expect(registerFake.name).toBe(ArtistReturned.name);
    })

    it("Should trigger BusinessLogicException when name already used", async () => {
        try {
            const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
            const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();
            artistRepositoryMocked.findByName.mockResolvedValue(registerFake)
            const artistService = new ArtistService(
                artistRepositoryMocked,
                new GenreServiceFactory().make({})
            );
            await artistService.create(registerFake);
        } catch (error) {
            expect(error.name).toBe(BusinessLogicException.name);
        }
    })

    it("Should create Artist with success", async () => {
        const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
        const genreRepositoryMocked = <jest.Mocked<ArtistRepository>>new GenreRepositoryMocked();

        const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
        const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

        artistRepositoryMocked.findByName.mockResolvedValue(null);
        genreRepositoryMocked.findById.mockResolvedValue(genreFake);


        const genreService = new GenreService(
            genreRepositoryMocked
        );
        const artistService = new ArtistService(
            artistRepositoryMocked,
            genreService
        );
        await artistService.create(registerFake);
        expect(artistRepositoryMocked.create.call.length).toBe(1);
    })


    it("Should trigger NotFoundException when try create artist with genre not exist", async () => {
        try {
            const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
            const genreRepositoryMocked = <jest.Mocked<ArtistRepository>>new GenreRepositoryMocked();

            const ArtistRepositoryMocked = <jest.Mock<ArtistRepository>>ArtistRepository;
            const artistRepositoryMocked = <jest.Mocked<ArtistRepository>>new ArtistRepositoryMocked();

            artistRepositoryMocked.findByName.mockResolvedValue(null);
            genreRepositoryMocked.findById.mockResolvedValue(null);


            const genreService = new GenreService(
                genreRepositoryMocked
            );
            const artistService = new ArtistService(
                artistRepositoryMocked,
                genreService
            );
            await artistService.create(registerFake);
        } catch (error) {
            expect(error.name).toBe(NotFoundException.name);
        }
    })
})