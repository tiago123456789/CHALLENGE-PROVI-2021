class InvalidDatasException extends Error {

    constructor(message: string) {
        super(message);
        this.name = "InvalidDatasException";
    }
}

export default InvalidDatasException;