import request from "supertest";
import app from "../../src/config/Server";
import mongoose from "mongoose";
import cache from "../../src/utils/Cache";
import Genre from "../../src/collections/Genre";
import GenreService from "../../src/services/GenreService";
import GenreServiceFactory from "../../src/factories/GenreServiceFactory";
import AuthenticatorFactory from "../../src/factories/AuthenticatorFactory";
import UserServiceFactory from "../../src/factories/UserServiceFactory";
import User from "../../src/collections/User";


describe("Integration tests endpoint /genres", () => {
    const registerFake = {
        "name": "teste fake",
    };


    afterAll(async () => {
        await mongoose.connection.close();
        await cache.quit();
    })

    let accessToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    beforeEach(async () => {
        await Genre.findOneAndRemove({});
    })

    it("GET /genres return statusCode 200", (done) => {
        request(app)
            .get('/genres')
            .expect(200, done);
    });

    it("POST /genres return statusCode 201", (done) => {
        request(app)
            .post(`/genres`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send(registerFake)
            .expect(201, done);
    });

    it("POST /genres return statusCode 409", (done) => {
        new GenreServiceFactory()
        .make({})
        .create(registerFake)
        .then(() => {
            request(app)
            .post(`/genres`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send(registerFake)
            .expect(409, done);
        })
    });

})