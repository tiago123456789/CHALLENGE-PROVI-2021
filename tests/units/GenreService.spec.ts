import BusinessLogicException from "../../src/exceptions/BusinessLogicException";
import NotFoundException from "../../src/exceptions/NotFoundException";
import GenreRepository from "../../src/repositories/GenreRepository";
import GenreService from "../../src/services/GenreService";

jest.mock("../../src/repositories/GenreRepository");

describe("Unit tests class GenreService", () => {
    const registerFake = {
        "name": "GenreFake"
    };

    it("Should return 2 genres when call findAll method", async () => {
        const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
        const genreRepositoryMocked = <jest.Mocked<GenreRepository>>new GenreRepositoryMocked();

        genreRepositoryMocked.findAll.mockResolvedValue([
            registerFake, registerFake
        ])

        const userService = new GenreService(
            genreRepositoryMocked,
        );
        const genresReturned = await userService.findAll();
        expect(2).toBe(genresReturned.length);
    })

    it("Should trigger NotFoundException to the try find genres not exist", async () => {
        try {
            const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
            const genreRepositoryMocked = <jest.Mocked<GenreRepository>>new GenreRepositoryMocked();
            const idFake = "60e3baca97446b2eb55fccd6"

            genreRepositoryMocked.findById.mockResolvedValue(null)

            const userService = new GenreService(
                genreRepositoryMocked,
            );
            await userService.findById(idFake);
        } catch (err) {
            expect(NotFoundException.name).toBe(err.name);

        }

    })

    it("Should return genre when try find by id", async () => {
        const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
        const genreRepositoryMocked = <jest.Mocked<GenreRepository>>new GenreRepositoryMocked();
        const idFake = "60e3baca97446b2eb55fccd6"

        genreRepositoryMocked.findById.mockResolvedValue(registerFake)

        const userService = new GenreService(
            genreRepositoryMocked,
        );
        const genreReturned = await userService.findById(idFake);
        expect(registerFake.name).toBe(genreReturned.name);
    })

    it("Should trigger BusinessLogicException when name already used", async () => {
        try {
            const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
            const genreRepositoryMocked = <jest.Mocked<GenreRepository>>new GenreRepositoryMocked();
            genreRepositoryMocked.findByName.mockResolvedValue(registerFake)
            const userService = new GenreService(
                genreRepositoryMocked,
            );
            await userService.create(registerFake);
        } catch (error) {
            expect(error.name).toBe(BusinessLogicException.name);
        }
    })

    it("Should create genre with success", async () => {
        const GenreRepositoryMocked = <jest.Mock<GenreRepository>>GenreRepository;
        const genreRepositoryMocked = <jest.Mocked<GenreRepository>>new GenreRepositoryMocked();
        genreRepositoryMocked.findByName.mockResolvedValue(null)
        const userService = new GenreService(
            genreRepositoryMocked,
        );
        await userService.create(registerFake);
        expect(genreRepositoryMocked.create.call.length).toBe(1);
    })
})