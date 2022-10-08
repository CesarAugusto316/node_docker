FROM node:16.17.1-alpine
RUN apk add --no-cache bash

# recommended but not necessary (good practice)
WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

# buildtime
ARG ENV
# we can embbed shell scripting
RUN if [ "$ENV" = "production"]; \
  then yarn install --production=true; \
  else yarn install; \
  fi

COPY . .

# # recommended but not necessary (only for documentation purposes)
ENV PORT=8080
EXPOSE $PORT

# # runtime (when we run the container at the end of the entire building process)
# CMD [ "yarn", "start:prod"]
# # Thi can be overwritten in docker-compose