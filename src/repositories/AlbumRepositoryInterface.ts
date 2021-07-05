

export default interface AlbumRepositoryInterface {

    findById(id: string): Promise<any>;

    findAll(): Promise<any>;

    create(register: any): Promise<any>

    delete(id: string): Promise<any>

    update(id: string, dataModified: any): Promise<any>

    findByName(name: string): Promise<any> 
}