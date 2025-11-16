export class HttpError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class NotFoundError extends HttpError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

export class ValidationError extends HttpError {
    constructor(message = 'Validation error') {
        super(message, 400);
    }
}

export class ServerError extends HttpError {
    constructor(message = 'Internal server error') {
        super(message, 500);
    }
}