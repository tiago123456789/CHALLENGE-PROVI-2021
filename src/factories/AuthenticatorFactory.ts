import Authenticator from "../security/Authenticator";
import AuthenticatorInterface from "../security/AuthenticatorInterface";
import EncrypterFactory from "./EncrypterFactory";
import FactoryInterface from "./FactoryInterface";
import TokenFactory from "./TokenFactory";
import UserRepositoryFactory from "./UserRepositoryFactory";

export default class AuthenticatorFactory implements FactoryInterface<AuthenticatorInterface> {
    
    make(data: { [key: string]: any; }): AuthenticatorInterface {
        return new Authenticator(
            new TokenFactory().make({}),
            new EncrypterFactory().make({}),
            new UserRepositoryFactory().make({})
        )
    }

}