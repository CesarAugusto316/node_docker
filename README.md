# LarnU Fullstack Bootcamp

## NODE_DOCKER REST API WITH REDIS AND MONGO DBS

Express, node, jest testing, supertest, github actions ci/cd postgres, mongoDB, redisDB, mongoos and much more.

- To create, delete or update a TODO requires authentication.
- Protected endpoints.
- RedisStore, express-session based athentication

<br>

## BLOG API

To start your dev environment on the cli run:

- docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up
- docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build -V
- docker logs --follow node_docker-express-api-1

To stop:

- docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down
- docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down -v
- docker-compose stop

How to enter running containers:

- docker exec -it node_docker-redisdb-1 redis-cli
- docker exec -it node_docker-mongodb-1 mongosh
- docker exec -it node_docker-express-api-1 bash

<br>

![plot](./assets/Screenshot_2022-10-07_22-14-29.png)
