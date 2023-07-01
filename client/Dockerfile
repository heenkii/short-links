FROM node:18.16-alpine as node

WORKDIR /usr/src/client
COPY *.json .
RUN yarn install  
COPY . .
RUN yarn build

FROM nginx:1.25.1-alpine
COPY --from=node /usr/src/client/build /usr/share/nginx/html
COPY --from=node /usr/src/client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
