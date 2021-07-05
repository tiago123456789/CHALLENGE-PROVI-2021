

export default interface TokenInterface {

    withPayload(payload: { [key: string]: any }): TokenInterface

    decode(token: string): any

    get(): string

    isValid(token: string): Promise<any>
}