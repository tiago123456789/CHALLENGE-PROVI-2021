import FactoryInterface from "./FactoryInterface";
import UserServiceInterface from "../services/UserServiceInterface";
import UserService from "../services/UserService";
import UserRepositoryFactory from "./UserRepositoryFactory";
import EncrypterFactory from "./EncrypterFactory";

export default class UserServiceFactory implements FactoryInterface<UserServiceInterface> {

    make(data: { [key: string]: any; }): UserServiceInterface {
        return new UserService(
            new UserRepositoryFactory().make({}),
            new EncrypterFactory().make({})
        );
    }

}