FROM node:18.16-alpine

WORKDIR /usr/src/server

COPY *.json .

RUN yarn install

COPY . . 

ENTRYPOINT [ "yarn", "start" ]
