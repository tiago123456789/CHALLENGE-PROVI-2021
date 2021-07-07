import { NextFunction, Request, Response } from "express";
import Endpoint from "./Endpoint";
import Joi, { ObjectSchema } from "joi";
import GenreServiceInterface from "../services/GenreServiceInterface";

export default class GenreEndpoint extends Endpoint {

    constructor(
        private readonly service: GenreServiceInterface,
    ) {
        super();
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
    }

    getRulesValidation(): ObjectSchema {
        return Joi.object({
            name: Joi.string().min(3).required(),
        });
    }

    async findAll(request: Request, response: Response) {
        const users = await this.service.findAll();
        response.json(users);
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const register = request.body;
            this.isValidDatas(register);
            await this.service.create(register);
            response.sendStatus(201);
        } catch (error) {
            next(error);
        }
    }

    async findById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const user = await this.service.findById(id);
            response.json(user);
        } catch (error) {
            next(error);
        }
    }
}