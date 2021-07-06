import { NextFunction, Request, Response } from "express";
import AuthenticatorFactory from "../factories/AuthenticatorFactory";
const authenticator = new AuthenticatorFactory().make({});

export default {
    hasPermission: (permissionNeed: string) => {
        return async (request: Request, response: Response, next: NextFunction) => {
            try {
                let accessToken = request.headers.authorization;
                
                if (!accessToken) {
                    return response.status(403).json({
                        statusCode: 403,
                        message: "You need have permission to access this resource"
                    })
                }
                accessToken = accessToken.replace("Bearer ", "");
                const isEnviromentTest = process.env.NODE_ENV == "testing"
                if (isEnviromentTest && process.env.JWT_TOKEN_ALLOWED == accessToken) {
                    next();
                    return;
                }

                await authenticator.hasPermission(permissionNeed, accessToken);
                next();
            } catch (error) {
                next(error);
            }
        }
    }
    
   
}