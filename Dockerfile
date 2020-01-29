FROM node:11-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod:en


FROM nginx:1-alpine

COPY --from=builder /usr/src/app/dist/lcl-manager /usr/share/nginx/html

EXPOSE 4200 80