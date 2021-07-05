import AuthCredential from "../models/AuthCredential";


export default interface AuthenticatorInterface {

    authenticate(credential: AuthCredential): Promise<any>

    hasPermission(permissionNeeds: string, token: any): Promise<Boolean>
}