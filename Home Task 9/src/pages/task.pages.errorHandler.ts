import type { Response } from "express";
import { HttpError } from "./task.httperror";

export function handleError(res: Response, error: unknown): void {
    if (error instanceof HttpError) {
        res.status(error.statusCode).json({
            error: error.message,
            statusCode: error.statusCode
        });
    } else if (error instanceof Error) {
        res.status(500).json({
            error: error.message,
            statusCode: 500
        });
    } else {
        res.status(500).json({
            error: 'Unknown error',
            statusCode: 500
        });
    }
}