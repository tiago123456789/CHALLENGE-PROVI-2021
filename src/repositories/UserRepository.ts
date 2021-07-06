import User from "../collections/User";
import AbstractRepository from "./AbstractRepository";
import UserRepositoryInterface from "./UserRepositoryInterface";

export default class UserRepository 
    extends AbstractRepository 
    implements UserRepositoryInterface {

    constructor() {
        super(User);
    }

    findByEmail(email: string): Promise<any> {
        return this.model.findOne({ email });
    }


}