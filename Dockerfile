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
EXPOSE 3000
CMD ["npm", "run","start:prod"]