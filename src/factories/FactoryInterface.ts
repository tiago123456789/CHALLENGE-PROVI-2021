export default interface FactoryInterface<T> {

    make(data: { [key: string]: any}): T
}