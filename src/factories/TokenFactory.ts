import JwtToken from "../security/JwtToken";
import TokenInterface from "../security/TokenInterface";
import FactoryInterface from "./FactoryInterface";

export default class TokenFactory implements FactoryInterface<TokenInterface> {

    make(data: { [key: string]: any }): TokenInterface {
        return new JwtToken();
    }
}