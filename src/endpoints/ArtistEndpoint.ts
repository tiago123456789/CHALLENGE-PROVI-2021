import { NextFunction, Request, Response } from "express";
import Endpoint from "./Endpoint";
import Joi, { ObjectSchema } from "joi";
import ArtistServiceInterface from "../services/ArtistServiceInterface";

export default class ArtistEndpoint extends Endpoint {

    constructor(
        private readonly service: ArtistServiceInterface,
    ) {
        super();
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
    }

    getRulesValidation(): ObjectSchema {
        return Joi.object({
            name: Joi.string().min(3).required(),
            description: Joi.string().min(10).required(),
            image: Joi.string().required(),
            genre: Joi.string().required(),
        });
    }

    async findAll(request: Request, response: Response) {
        const users = await this.service.findAll();
        response.json(users);
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const register = {
                ...request.body,
                // @ts-ignore
                image: request.file ? request.file.location : null
            };
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
        } catch(err) {
            next(err) 
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            await this.service.remove(id);
            response.sendStatus(204);
        } catch(err) {
            next(err) 
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const register = {
                ...request.body,
                // @ts-ignore
                image: request.file ? request.file.location : null
            };
            this.isValidDatas(register);
            await this.service.update(id, register);
            response.sendStatus(204);
        } catch(err) {
            next(err) 
        }
    }
}