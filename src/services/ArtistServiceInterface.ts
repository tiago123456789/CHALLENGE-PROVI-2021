

export default interface ArtistServiceInterface {
     
    findAll(): Promise<any>

    findById(id: string): Promise<any>

    create(register: any): Promise<any>

    update(id: string, register: any): Promise<any>
    
    remove(id: string): Promise<any>

}