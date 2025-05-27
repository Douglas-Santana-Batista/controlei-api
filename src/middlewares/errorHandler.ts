import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface AppError extends Error {
    statusCode?: number;
    code?: string;
    details?: any;
}

export const errorHandler: ErrorRequestHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log(`[ERROR] ${err.message}`);

    const statusCode = err.statusCode || 500;
    const response = {
        error: err.message || 'Internal server error',
        ...(err.details && { details: err.details })
    };

    if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                response.error = 'Duplicate registration';
                response.details = `Single field violated ${err.meta?.target}`;
                break;
            case 'P2025':
                response.error = 'Record not found';
                break;

        }
    }
    res.status(statusCode).json(response);
}