class UnauthenticatedException extends Error {

    constructor(message: string) {
        super(message);
        this.name = "UnauthenticatedException";
    }
}

export default UnauthenticatedException;