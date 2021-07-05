import UserServiceInterface from "../services/UserServiceInterface";
import { NextFunction, Request, Response } from "express";
import Endpoint from "./Endpoint";
import Joi, { ObjectSchema } from "joi";
import AuthenticatorInterface from "../security/AuthenticatorInterface";

export default class UserEndpoint extends Endpoint {

    constructor(
        private readonly service: UserServiceInterface,
        private readonly authenticator: AuthenticatorInterface
    ) {
        super();
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    getRulesValidation(): ObjectSchema {
        return Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            role: Joi.string()
                        .required()
                        .regex(/(ADMIN|CLIENT)/)
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
        } catch(error) {
            next(error);
        }
    }

    async authenticate(request: Request, response: Response, next: NextFunction) {
        try {
            const register = request.body;
            const accessToken = await this.authenticator.authenticate(register);
            response.json({
                accessToken
            })
        } catch(error) {
            next(error);
        }
    }

    async findById(request: Request, response: Response) {
        const id = request.params.id;
        const user = await this.service.findById(id);
        response.json(user);
    }
}