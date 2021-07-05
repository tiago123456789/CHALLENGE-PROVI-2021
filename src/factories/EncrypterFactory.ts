import FactoryInterface from "./FactoryInterface";
import EncrypterInterface from "../utils/EncrypterInterface";
import Encrypter from "../utils/Encrypter";

export default class EncrypterFactory implements FactoryInterface<EncrypterInterface> {

    make(data: { [key: string]: any; }): EncrypterInterface {
        return new Encrypter()
    }

}