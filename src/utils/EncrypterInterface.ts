
export default interface EncrypterInterface {

    hash(value: string): Promise<any>

    compare(value: string, hash: string): Promise<any>
}