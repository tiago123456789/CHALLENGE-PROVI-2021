import UserRepository from "../repositories/UserRepository";
import UserRepositoryInterface from "../repositories/UserRepositoryInterface";
import FactoryInterface from "./FactoryInterface";
import User from "./../collections/User"

export default class UserRepositoryFactory implements FactoryInterface<UserRepositoryInterface> {

    make(data: { [key: string]: any; }): UserRepositoryInterface {
        return new UserRepository(User)
    }

}