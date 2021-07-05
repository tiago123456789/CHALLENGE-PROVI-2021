
export default interface UserServiceInterface {
    
    findAll(): Promise<any>

    findById(id: string): Promise<any>

    create(register: any): Promise<any>

}