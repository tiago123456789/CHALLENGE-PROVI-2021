import AbstractRepository from "./AbstractRepository";
import UserRepositoryInterface from "./UserRepositoryInterface";

export default class UserRepository 
    extends AbstractRepository 
    implements UserRepositoryInterface {

    constructor(model: any) {
        super(model);
    }

    findByEmail(email: string): Promise<any> {
        return this.model.findOne({ email });
    }


}