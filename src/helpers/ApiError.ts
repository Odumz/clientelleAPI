export default class ApiError extends Error {
    constructor(statusCode: number, message: string, stack = '') {
        super(message);
        statusCode = statusCode;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}