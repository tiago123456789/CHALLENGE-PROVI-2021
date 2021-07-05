import cache, { CacheInterface } from "../utils/Cache";
import FactoryInterface from "./FactoryInterface";

export default class CacheFactory implements FactoryInterface<CacheInterface> {

    make(data: { [key: string]: any; }): CacheInterface {
        return cache
    }

}