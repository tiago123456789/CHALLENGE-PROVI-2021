import FactoryInterface from "./FactoryInterface";
import AlbumEndpoint from "../endpoints/AlbumEndpoint";
import AlbumServiceFactory from "./AlbumServiceFactory";

export default class AlbumEndpointFactory implements FactoryInterface<AlbumEndpoint> {
    
    make(data: { [key: string]: any; }): AlbumEndpoint {
        return new AlbumEndpoint(
            new AlbumServiceFactory().make({})
        )
    }

}