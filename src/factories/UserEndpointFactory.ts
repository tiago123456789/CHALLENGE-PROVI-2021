import FactoryInterface from "./FactoryInterface";
import UserServiceFactory from "./UserServiceFactory";
import UserEndpoint from "../endpoints/UserEndpoint";
import AuthenticatorFactory from "./AuthenticatorFactory";

export default class UserEndpointFactory implements FactoryInterface<UserEndpoint> {

    make(data: { [key: string]: any; }): UserEndpoint {
        return new UserEndpoint(
            new UserServiceFactory().make({}),
            new AuthenticatorFactory().make({})
        )
    }

}