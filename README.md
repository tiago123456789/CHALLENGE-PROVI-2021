Requirements:
===============

- Node.js
- Npm
- Typescript
- Docker
- Docker compose
- Mongodb
- Redis
- Sentry

Architecture:
==============

![image of architecute](./Arquitetura-challenge-provi-2021.png)

Database diagram:
===================

![image database diagram](./diagrama-banco-dados.png)



Setting dev environment:
==========================

- Clone project
- Execute command: **npm install** this command is used to install modules used in application
- Create **.env** file based in **.env.example** file
- Execute command: **docker-compose up -d** used to create mongodb(database) and redis(blacklist)
- Execute command: **npm run start:dev** to create server http.


Setting test environment:
==========================

- Clone project
- Execute command: **npm install** this command is used to install modules used in application
- Create **.env.testing** file based in **.env.example** file
- Execute command: **docker-compose -f docker-compose.dev.yml up -d** used to create mongodb(database) and redis(blacklist)
- Execute command: **npm run test** to execute unit and integration tests.
