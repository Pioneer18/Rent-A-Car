# install and build the app dependencies
FROM node:12-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
# install supervisord and make config and logs directories
RUN npm install supervisor && mkdir -p /var/log/supervisor && mkdir -p /etc/supervisor.conf
COPY ./supervisor.conf /etc/supervisor.conf
EXPOSE 3000
EXPOSE 6379
# start the supervisord service
CMD ["supervisord", "-c", "/etc/supervisor.conf"]