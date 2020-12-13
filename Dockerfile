# install and build the app dependencies
FROM node:12 As builder1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm build

FROM node:12 As prod
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder1 /usr/src/app/dist ./
COPY . ./
EXPOSE 3000
EXPOSE 6379
# start the supervisord service
CMD ["npm", "run", "start:prod"]