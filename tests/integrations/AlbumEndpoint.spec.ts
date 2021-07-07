import request from "supertest";
import app from "../../src/config/Server";
import mongoose from "mongoose";
import cache from "../../src/utils/Cache";
import Genre from "../../src/collections/Genre";
import GenreServiceFactory from "../../src/factories/GenreServiceFactory";
import Artist from "../../src/collections/Artist";
import ArtistServiceFactory from "../../src/factories/ArtistServiceFactory";
import Album from "../../src/collections/Album";
import AlbumServiceFactory from "../../src/factories/AlbumServiceFactory";


describe("Integration tests endpoint /albums", () => {
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
        await Artist.findOneAndRemove({});
        await Genre.findOneAndRemove({});
        await Album.findOneAndRemove({});
    })

    it("GET /albums return statusCode 200", (done) => {
        request(app)
            .get('/albums')
            .expect(200, done);
    });

    it("GET /albums/:id return statusCode 404", (done) => {
        request(app)
            .get(`/albums/${idFake}`)
            .expect(404, done);
    });

    it("DELETE /albums/:id return statusCode 404", (done) => {
        request(app)
            .delete(`/albums/${idFake}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(404, done);
    });

    it("DELETE /albums/:id return statusCode 204", (done) => {
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
                return new AlbumServiceFactory()
                    .make({})
                    .create({
                        ...registerFake,
                        genre: artist.genre._id,
                        artist: artist._id
                    })
            })
            .then((album) => {
                request(app)
                    .delete(`/albums/${album._id}`)
                    .set("Authorization", `Bearer ${accessToken}`)
                    .expect(204, done);
            })
    });

    it("GET /albums/:id return statusCode 200", (done) => {
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
                return new AlbumServiceFactory()
                    .make({})
                    .create({
                        ...registerFake,
                        genre: artist.genre._id,
                        artist: artist._id
                    })
            })
            .then((album) => {
                request(app)
                    .get(`/albums/${album._id}`)
                    .set("Authorization", `Bearer ${accessToken}`)
                    .expect(200, done);
            })
    });

    it("PUT /artists/:id return statusCode 400", (done) => {
        request(app)
            .put(`/artists/${idFake}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send({})
            .expect(400, done);
    });

    it("PUT /artists/:id return statusCode 404", (done) => {
            request(app)
                .put(`/albums/${idFake}`)
                .set("Content-Type", "multipart/form-data")
                .set("Authorization", `Bearer ${accessToken}`)
                .field("name", registerFake.name)
                .field("description", registerFake.description)
                .field("genre", idFake)
                .field("artist", idFake)
                .attach("image", "./Arquitetura-challenge-provi-2021.png")
                .attach("musics", "./som_usado_teste_integracao.mp3")
                .expect(404, done);
    });

    it("PUT /artists/:id return statusCode 204", (done) => {
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
            return new AlbumServiceFactory()
                .make({})
                .create({
                    ...registerFake,
                    genre: artist.genre._id,
                    artist: artist._id
                })
        })
        .then((album) => {
            request(app)
                .put(`/albums/${album._id}`)
                .set("Content-Type", "multipart/form-data")
                .set("Authorization", `Bearer ${accessToken}`)
                .field("name", registerFake.name)
                .field("description", registerFake.description)
                .field("genre", String(album.genre._id))
                .field("artist", String(album.artist._id))
                .attach("image", "./Arquitetura-challenge-provi-2021.png")
                .attach("musics", "./som_usado_teste_integracao.mp3")
                .expect(204, done);
        })
    });

    it("PUT /artists/:id return statusCode 404 genre not found", (done) => {
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
            return new AlbumServiceFactory()
                .make({})
                .create({
                    ...registerFake,
                    genre: artist.genre._id,
                    artist: artist._id
                })
        })
        .then((album) => {
            request(app)
                .put(`/albums/${album._id}`)
                .set("Content-Type", "multipart/form-data")
                .set("Authorization", `Bearer ${accessToken}`)
                .field("name", registerFake.name)
                .field("description", registerFake.description)
                .field("genre", idFake)
                .field("artist", String(album.artist._id))
                .attach("image", "./Arquitetura-challenge-provi-2021.png")
                .attach("musics", "./som_usado_teste_integracao.mp3")
                .expect(404, done);
        })
    });

    it("PUT /artists/:id return statusCode 404 artist not found", (done) => {
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
            return new AlbumServiceFactory()
                .make({})
                .create({
                    ...registerFake,
                    genre: artist.genre._id,
                    artist: artist._id
                })
        })
        .then((album) => {
            request(app)
                .put(`/albums/${album._id}`)
                .set("Content-Type", "multipart/form-data")
                .set("Authorization", `Bearer ${accessToken}`)
                .field("name", registerFake.name)
                .field("description", registerFake.description)
                .field("genre", String(album.genre._id))
                .field("artist", idFake)
                .attach("image", "./Arquitetura-challenge-provi-2021.png")
                .attach("musics", "./som_usado_teste_integracao.mp3")
                .expect(404, done);
        })
    });

    it("POST /albums return statusCode 400", (done) => {
        request(app)
            .post(`/albums`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send({})
            .expect(400, done);
    });

    it("POST /albums return statusCode 201", (done) => {
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
                    .post(`/albums`)
                    .set("Content-Type", "multipart/form-data")
                    .set("Authorization", `Bearer ${accessToken}`)
                    .field("name", registerFake.name)
                    .field("description", registerFake.description)
                    .field("genre", String(artist.genre._id))
                    .field("artist", String(artist._id))

                    .attach("image", "./Arquitetura-challenge-provi-2021.png")
                    .attach("musics", "./som_usado_teste_integracao.mp3")
                    .expect(201, done())
            })

    });

    it("POST /artists return statusCode 404 genre not found", (done) => {
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
                    .post(`/albums`)
                    .set("Content-Type", "multipart/form-data")
                    .set("Authorization", `Bearer ${accessToken}`)
                    .field("name", registerFake.name)
                    .field("description", registerFake.description)
                    .field("genre", String(idFake))
                    .field("artist", String(artist._id))
                    .attach("image", "./Arquitetura-challenge-provi-2021.png")
                    .attach("musics", "./som_usado_teste_integracao.mp3")
                    .expect(404, done())
            })

    });

    it("POST /albums return statusCode 404 artist not found", (done) => {
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
                    .post(`/albums`)
                    .set("Content-Type", "multipart/form-data")
                    .set("Authorization", `Bearer ${accessToken}`)
                    .field("name", registerFake.name)
                    .field("description", registerFake.description)
                    .field("genre", String(artist.genre._id))
                    .field("artist", String(idFake))
                    .attach("image", "./Arquitetura-challenge-provi-2021.png")
                    .attach("musics", "./som_usado_teste_integracao.mp3")
                    .expect(404, done())
            })
    });
})