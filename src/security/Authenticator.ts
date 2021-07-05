import UnauthenticatedException from "../exceptions/UnauthenticatedException";
import AuthCredential from "../models/AuthCredential";
import UserRepositoryInterface from "../repositories/UserRepositoryInterface";
import EncrypterInterface from "../utils/EncrypterInterface";
import AuthenticatorInterface from "./AuthenticatorInterface";
import TokenInterface from "./TokenInterface";

export default class Authenticator implements AuthenticatorInterface {

    constructor(
        private readonly jwtToken: TokenInterface,
        private readonly encrypter: EncrypterInterface,
        private readonly userRepository: UserRepositoryInterface
    ) {}

    async authenticate(credential: AuthCredential): Promise<any> {
        const user = await this.userRepository.findByEmail(credential.email);
        if (!user) {
            throw new UnauthenticatedException("Email or password is invalid!");
        }

        const isValid = await this.encrypter.compare(credential.password, user.password);

        if (!isValid) {
            throw new UnauthenticatedException("Email or password is invalid!");
        }

        return this.jwtToken.withPayload({
                                    id: user.id,
                                    role: user.role
                                }).get()
    }

    async hasPermission(permissionNeed: string, token: any): Promise<Boolean> {
        const payload = await this.jwtToken.isValid(token);
        if (!payload) {
            return false;
        }
        // @ts-ignore
        return permissionNeed == (payload.role);
    }

}