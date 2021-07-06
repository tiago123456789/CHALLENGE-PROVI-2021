import BusinessLogicException from "../../src/exceptions/BusinessLogicException";
import EncrypterFactory from "../../src/factories/EncrypterFactory";
import UserRepository from "../../src/repositories/UserRepository";
import UserService from "../../src/services/UserService";

jest.mock("../../src/repositories/UserRepository");

describe("Unit tests class UserService", () => {

    it("Should trigger BusinessLogicException when name already used", async () => {
        try {
            const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
            const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked();
            const registerFake = {
                "email": "testaffdsafas@gmail.com",
                "password": "123456789"
            };

            userRepositoryMocked.findByEmail.mockResolvedValue([
                registerFake
            ])

            const userService = new UserService(
                userRepositoryMocked,
                new EncrypterFactory().make({})
            );
            await userService.create(registerFake);
        } catch (error) {
            expect(error.name).toBe(BusinessLogicException.name);
            expect("Email can't be used. Try another email.").toBe(error.message);
        }
    })

    it("Should create user with success", async () => {
        const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
        const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked();
        const registerFake = {
            "email": "testaffdsafas@gmail.com",
            "password": "123456789"
        };

        userRepositoryMocked.findByEmail.mockResolvedValue(null)

        const userService = new UserService(
            userRepositoryMocked,
            new EncrypterFactory().make({})
        );
        await userService.create(registerFake);
        expect(userRepositoryMocked.create.call.length).toBe(1);
    })
})