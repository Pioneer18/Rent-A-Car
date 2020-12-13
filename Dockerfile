# install and build the app dependencies
FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run-script build
EXPOSE 3000
EXPOSE 6379
# start the supervisord service
CMD ["npm", "run", "start:prod"]