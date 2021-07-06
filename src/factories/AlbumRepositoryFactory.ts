import FactoryInterface from "./FactoryInterface";
import AlbumRepositoryInterface from "../repositories/AlbumRepositoryInterface";
import AlbumRepository from "../repositories/AlbumRepository";

export default class AlbumRepositoryFactory implements FactoryInterface<AlbumRepositoryInterface> {

    make(data: { [key: string]: any }): AlbumRepositoryInterface {
        return new AlbumRepository()
    }

}