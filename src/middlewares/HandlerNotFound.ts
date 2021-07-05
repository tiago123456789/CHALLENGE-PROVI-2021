import { Request, Response, NextFunction } from "express"

export default (request: Request, response: Response, next: NextFunction) => {
    response.status(404).json({ message: "Route not found." })
}