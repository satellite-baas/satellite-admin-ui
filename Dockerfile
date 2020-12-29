FROM node:15.4.0-alpine3.12 as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . /app
RUN yarn run build

FROM nginx:1.19.6-alpine
COPY --from=build-step /app/build /usr/share/nginx/html