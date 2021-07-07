import ForbiddenException from "../exceptions/ForbiddenException";
import UnauthenticatedException from "../exceptions/UnauthenticatedException";
import AuthCredential from "../models/AuthCredential";
import UserRepositoryInterface from "../repositories/UserRepositoryInterface";
import { CacheInterface } from "../utils/Cache";
import EncrypterInterface from "../utils/EncrypterInterface";
import AuthenticatorInterface from "./AuthenticatorInterface";
import TokenInterface from "./TokenInterface";

export default class Authenticator implements AuthenticatorInterface {

    constructor(
        private readonly jwtToken: TokenInterface,
        private readonly encrypter: EncrypterInterface,
        private readonly userRepository: UserRepositoryInterface,
        private readonly cache: CacheInterface
    ) { }

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
        try {
            await this.isAccessTokenInBlacklist(token);
            const payload = await this.jwtToken.isValid(token);
            if (!payload) {
                return false;
            }
            // @ts-ignore
            return permissionNeed == (payload.role);
        } catch(error) {
            throw new ForbiddenException("You need have permission to access this resource")
        }
       
    }

    async denyAccess(token: string) {
        token = token.replace("Bearer ", "");
        return this.cache.set(
            token, token, await this.getTimeExpirationAcessToken(token)
        );
    }

    private async getTimeExpirationAcessToken(accessToken: any) {
        const payload = this.jwtToken.decode(accessToken)
        let timeExpiration = payload['exp'] || 0;
        timeExpiration = timeExpiration * 1000 - Date.now();
        timeExpiration = timeExpiration / 1000;
        timeExpiration = Math.ceil(timeExpiration);
        return timeExpiration;
    }

    private async isAccessTokenInBlacklist(accessToken: string) {
        accessToken = accessToken.replace("Bearer ", "");
        const accessTokenInCache = await this.cache.get(accessToken);
        if (accessTokenInCache) {
            throw new ForbiddenException("Token is invalid or expired!");
        }
    }



}