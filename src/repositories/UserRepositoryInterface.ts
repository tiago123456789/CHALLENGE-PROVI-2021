

export default interface UserRepositoryInterface {

    findById(id: string): Promise<any>;

    findAll(): Promise<any>;

    create(register: any): Promise<any>

    delete(id: string): Promise<any>

    update(id: string, dataModified: any): Promise<any>

    findByEmail(email: string): Promise<any> 
}