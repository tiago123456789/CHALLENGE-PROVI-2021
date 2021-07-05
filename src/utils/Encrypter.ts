import bcrypt from "bcryptjs"
import EncrypterInterface from "./EncrypterInterface";

export default class Encrypter implements EncrypterInterface {
    
    hash(value: string): Promise<any> {
        return bcrypt.hash(value, 10);
    }

    compare(value: string, hash: string): Promise<any> {
        return bcrypt.compare(value, hash);
    }

}