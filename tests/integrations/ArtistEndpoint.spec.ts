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
import Artist from "../../src/collections/Artist";
import fs from "fs";
import ArtistServiceFactory from "../../src/factories/ArtistServiceFactory";


describe("Integration tests endpoint /artists", () => {
    const registerFake = {
        "name": "teste fake",
        "description": "teste testando fake",
        "genre": ""
    };

    const idFake = "60e3baca97446b2eb55fccd6";

    afterAll(async () => {
        await mongoose.connection.close();
        await cache.quit();
    })

    let accessToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    beforeEach(async () => {
        await Genre.findOneAndRemove({});
        await Artist.findOneAndRemove({});
    })

    it("GET /artists return statusCode 200", (done) => {
        request(app)
            .get('/artists')
            .expect(200, done);
    });

    it("GET /artists return statusCode 200", (done) => {
        request(app)
            .get('/artists')
            .expect(200, done);
    });

    it("GET /artists/:id return statusCode 404", (done) => {
        request(app)
            .get(`/artists/${idFake}`)
            .expect(404, done);
    });

    it("DELETE /artists/:id return statusCode 404", (done) => {
        request(app)
            .delete(`/artists/${idFake}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(404, done);
    });

    it("DELETE /artists/:id return statusCode 204", (done) => {
        new GenreServiceFactory().make({})
        .create({
            "name": "teste fake",
        })
        .then(genre => {
            return new ArtistServiceFactory().make({}).create({
                ...registerFake, genre: String(genre._id)
            })
        })
        .then(artist => {
            request(app)
            .delete(`/artists/${artist._id}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(204, done);
        })
    });

    it("PUT /artists/:id return statusCode 404", (done) => {
        request(app)
            .put(`/artists/${idFake}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send({})
            .expect(400, done);
    });

    it("PUT /artists/:id return statusCode 204", (done) => {
            new GenreServiceFactory().make({})
            .create({
                "name": "teste fake",
            })
            .then(genre => {
                return new ArtistServiceFactory().make({}).create({
                    ...registerFake, genre: genre._id
                })
            })
            .then((artist: any) => {
                request(app)
                .put(`/artists/${artist._id}`)
                .set("Content-Type", "multipart/form-data")
                .set("Authorization", `Bearer ${accessToken}`)
                .field("name", registerFake.name)
                .field("description", registerFake.description)
                .field("genre", String(artist.genre._id))
                .attach("image", "./Arquitetura-challenge-provi-2021.png")
                .expect(204, done())
            })
    });

    it("POST /artists return statusCode 400", (done) => {
        request(app)
            .post(`/artists`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send({})
            .expect(400, done);
    });

    it("POST /artists return statusCode 201", (done) => {
        new GenreServiceFactory().make({})
            .create({
                "name": "teste fake",
            })
            .then((data: any) => {
                request(app)
                    .post(`/artists`)
                    .set("Content-Type", "multipart/form-data")
                    .set("Authorization", `Bearer ${accessToken}`)
                    .field("name", registerFake.name)
                    .field("description", registerFake.description)
                    .field("genre", String(data._id))
                    .attach("image", "./Arquitetura-challenge-provi-2021.png")
                    .expect(201, done())
            })

    });

    it("POST /artists return statusCode 404", (done) => {
        request(app)
            .post(`/artists`)
            .set("Content-Type", "multipart/form-data")
            .set("Authorization", `Bearer ${accessToken}`)
            .field("name", registerFake.name)
            .field("description", registerFake.description)
            .field("genre", idFake)
            .attach("image", "./Arquitetura-challenge-provi-2021.png")
            .expect(404, done());
    });

})