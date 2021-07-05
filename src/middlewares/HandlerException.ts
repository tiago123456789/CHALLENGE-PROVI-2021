import { NextFunction, Response, Request } from "express";
import * as sentry from "@sentry/node";

export default (error: Error, request: Request, response: Response, next: NextFunction) => {

    switch (error.name) {
        case "NotFoundException":
            return response.status(404).json({
                statusCode: 404,
                message: error.message
            });
        case "BusinessLogicException":
            return response.status(409).json({
                statusCode: 409,
                message: error.message
            });
        case "InvalidDatasException":
            return response.status(400).json({
                statusCode: 400,
                message: JSON.parse(error.message)
            });
        case "ForbiddenException":
            return response.status(403).json({
                statusCode: 403,
                message: error.message
            });
        case "UnauthenticatedException":
            return response.status(401).json({
                statusCode: 401,
                message: error.message
            });
        case "TokenExpiredError": 
            return response.status(403).json({
                statusCode: 403,
                message: "You need have permission to access this resource"
            });
        default:
            sentry.captureException(error)
            return response.status(500).json({
                statusCode: 500,
                message: "Try get in touch support. Occour interval server error."
            });
    }
}
