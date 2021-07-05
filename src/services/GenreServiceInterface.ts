

export default interface GenreServiceInterface {
     
    findAll(): Promise<any>

    findById(id: string): Promise<any>

    create(register: any): Promise<any>

}