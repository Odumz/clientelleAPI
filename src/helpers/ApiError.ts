export default class ApiError extends Error {
    private statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);

        // Object.setPrototypeOf(this, new.target.prototype)
        this.statusCode = statusCode;

        // if (stack) {
        //     this.stack = stack;
        // } else {
            Error.captureStackTrace(this);
        // }
    }
}