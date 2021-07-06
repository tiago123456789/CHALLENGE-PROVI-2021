import BusinessLogicException from "../exceptions/BusinessLogicException";
import UserRepositoryInterface from "../repositories/UserRepositoryInterface";
import Encrypter from "../utils/Encrypter";
import UserServiceInterface from "./UserServiceInterface";

export default class UserService implements UserServiceInterface {

    constructor(
        private readonly repository: UserRepositoryInterface,
        private readonly encrypter: Encrypter
    ) {}

    async create(register: any) {
        const userWithEmail = await this.repository.findByEmail(register.email);
        if (userWithEmail) {
            throw new BusinessLogicException("Email can't be used. Try another email.")
        }
        register.password = await this.encrypter.hash(register.password);
        return this.repository.create(register);
    }

}