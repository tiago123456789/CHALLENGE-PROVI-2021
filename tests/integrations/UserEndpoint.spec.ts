import request from "supertest";
import app from "../../src/config/Server";
import User from "../../src/collections/User";
import mongoose from "mongoose";
import cache from "../../src/utils/Cache";
import UserServiceFactory from "../../src/factories/UserServiceFactory";


describe("Integration tests endpoint /auth", () => {
    const registerFake = {
        "name": "teste fake",
        "email": "testaffdsafas@gmail.com",
        "password": "123456789",
        "role": "ADMIN"
    };

    afterAll(async () => {
        await mongoose.connection.close();
        await cache.quit();
    })

    beforeEach(async () => {
        await User.findOneAndRemove({ email: registerFake.email });
    })

    it("POST /auth/register return statusCode 201", (done) => {
        request(app)
            .post('/auth/register')
            .send(registerFake)
            .expect(201, done);
    });

    it("POST /auth/register return statusCode 400", (done) => {
        const registerFake = {
            "email": "",
            "password": ""
        };

        request(app)
            .post('/auth/register')
            .send(registerFake)
            .expect(400, done);
    });

    it("POST /auth/login return statusCode 401", (done) => {
        request(app)
            .post('/auth/login')
            .send(registerFake)
            .expect(401, done);
    });

    it("POST /auth/login return statusCode 200", (done) => {
        new UserServiceFactory()
        .make({})
        .create(registerFake)
        .then(() => {
            request(app)
            .post('/auth/login')
            .send({
                "email": "testaffdsafas@gmail.com",
                "password": "123456789"
            })
            .expect(200, done);
        })
    });

})