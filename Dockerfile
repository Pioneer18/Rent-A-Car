# install and build the app dependencies
FROM node:12 As builder1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY dist ./
EXPOSE 6379
# start the supervisord service
CMD ["npm", "run", "start:prod"]