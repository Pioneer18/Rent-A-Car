#FROM node:current-slim AS builder1
#WORKDIR /client
#COPY ./client/package.json .
#RUN yarn install
#COPY ./client/ .
#RUN yarn build

FROM node:current-slim AS builder2
WORKDIR /app
#COPY --from=builder1 /client ./client/
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:current-slim
WORKDIR /app
COPY --from=builder2 /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]

#FROM node:10 AS builder
#WORKDIR /app
#COPY ./package.json ./
#RUN npm install
#COPY . .
#RUN npm run build


#FROM node:10-alpine
#WORKDIR /app
#COPY --from=builder /app ./
#CMD ["npm", "run", "star:prod"]