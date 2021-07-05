

export default abstract class AbstractRepository {


    constructor(protected readonly model: any) {}

    findById(id: string) {
        return this.model.findOne({ _id: id });
    }
    
    findAll() {
        return this.model.find({});
    }

    create(register: any) {
        return this.model.create(register);
    }

    async delete(id: string) {
        const register = await this.findById(id);
        // @ts-ignore
        return register.remove();
    }

    async update(id: string, dataModified: any) {
        return this.model.update({ _id: id }, { $set: dataModified });
    }
}