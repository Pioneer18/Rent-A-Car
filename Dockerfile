# install and build the app dependencies
FROM node:12 As builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3000
EXPOSE 6379
# start the supervisord service
CMD ["npm", "run", "start"]