# install and build the app
FROM node:10 As builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm build
COPY . .

# fresh new image to copy dist
FROM node:10 As production
WORKDIR /app
COPY ./package.json .
RUN npm install --only=production
COPY . .
COPY --from=builder /app/dist ./dist
# install supervisord and make config and logs directories
RUN apt-get -y install supervisor && mkdir -p /var/log/supervisor && mkdir -p /etc/supervisor.conf
COPY ./supervisor.conf /etc/supervisor.conf
EXPOSE 3000
EXPOSE 6379
# start the supervisord service
CMD ["supervisord", "-c", "/etc/supervisor.conf"]