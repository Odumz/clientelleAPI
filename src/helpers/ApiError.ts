export default class ApiError extends Error {
    private statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}