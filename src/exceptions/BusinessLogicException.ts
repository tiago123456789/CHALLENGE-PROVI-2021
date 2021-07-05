class BusinessLogicException extends Error {

    constructor(message: string) {
        super(message);
        this.name = "BusinessLogicException";
    }
}

export default BusinessLogicException;