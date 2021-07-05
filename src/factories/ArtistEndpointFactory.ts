import ArtistEndpoint from "../endpoints/ArtistEndpoint";
import ArtistServiceFactory from "./ArtistServiceFactory";
import FactoryInterface from "./FactoryInterface";


export default class ArtistEndpointFactory implements FactoryInterface<ArtistEndpoint> {
    
    make(data: { [key: string]: any; }): ArtistEndpoint {
        return new ArtistEndpoint(
            new ArtistServiceFactory().make({})
        )
    }

}
