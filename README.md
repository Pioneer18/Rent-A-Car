# Rent-A-Car
This project is a demonstration of server-side development skills. Rent-A-Car is a simple demonstrative car rental web application that allows users to login, list their own vehicles, or search for vehicles by address. This app is a minimized version of a previous project I was working on, it is a demonstration of a well tested, secure, streamlined, modular, and scalable web application backend.


## Try the App with Postman:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/d687e602b7ebb63c6883#?env%5BRent-A-Car%5D=W3sia2V5IjoiYmFzZV91cmwiLCJ2YWx1ZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiUmVzZXRfVG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiY29va2llIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfV0=)
* Note: If Postman Web never launches try downloading the app to your pc, it will import the collection and environment and run fine. 
* will be deployed soon :)

## Dependencies:
* TypeScript
* NodeJS
* NestJS
* Docker
* Google Cloud Platform
* AWS-SDK
* MongoDB
* Mongoose
* Redis
* Multer/Multer-S3
* Nodemailer
* Passport
* Jsonwebtoken
* cookie-parser
* hapi-joi
* Luxon
* bcrypt
* crypto
* dotenv

## APIs Used in the App

#### AWS S3
- Upload multiple image files to S3 bucket
- Download multiple image files from S3 bucket

#### Geo Coder Api
- Obtain geocoordinates for addresses
- Obtain addresses or administrative areas for locations
- Obtain geocoordinates for known landmarks

## Database & Caching
- MongoDB Atlas (official cloud database)
- Mongoose ODM
- Redis

## Validation
- @hapi/joi

## Security & Authentication
- Helmet: http headers
- Encryption and Hashing
- Passport-local
- Passport-JWT with HttpOnly Cookies: browser javascript cannot interact with cookies
- bcrypt & crypto
- CORS
- production uses Https

## Front-end
- serving a palceholder Next.JS application
- will develop the front-end of this application later

## Testing
- This app includes unit and e2e testing with Jest
- continous testing integrtion with CircleCI

## Deployment
- Docker
- bash: load secret rsa pem files before deploying production
- Google Cloud Deployment*

## NestJS Features Used in the App
- Modular injection based design
- TypeScript
- Custom providers: datbase, logging interceptor, http error filter, error filter
- Custom Configuration Module: group related settings
- Error Handling and Http Filters
- Pipes: transorm request data before handler
- Guards: Authorization of JWT
- Middleware: processing request and data
- CacheManager: built in cache manager
- ServeStaticModule: server a front-end application
- Testing: Jest e2e and unit testing*
  
## Why NestJS
NestJS is "A progressive Node.js framework for building efficient, reliable and scalable server-side applications." - nestjs.com

## Rent-A-Car Route Map
### Auth: login in to and manage account
- ***@Post(login)***: log user into the application and grant a JWT authentication token
- ***@Post(logout)***: log user out of the application and expire their JWT authentication token
- ***@Post(change-password)***: replace user's current password with the new password
- ***@Post(forgot-password)***: send user a password replacement email
- ***@Post(reset-password)***: reset the user's password with the password provided by the completed reset password email
### User: create and manage users
- ***@Post(create-user)***: create a new user account
- ***@Pot(update-user)***: update user info; e.g. email, username
- ***@Post(find-user)***: find a user in the database by email
- ***@Post(delete-profile)***: delete a user profile
### Rental: list and search for rentals in a specified area
- ***@Post(rental)***: create a new rental vheicle listing
- ***@Get(rental)***: search for rentals near a specified location (the user's location)
- ***@Post(edit-price)***: edit the rental's pricing
- ***@Post(edit-details)***: edit the details of the rental; e.g. # of seats, color, etc.
- ***@Post(schedule-unavailability)***: set a period of unavailability for the rental; e.g. Apr. 1 - Jun. 15
- ***@Post(update-unavailability)***: edit the unavailability of the vehicle
- ***@Post(remove-unavailability)***: remove scheduled unavailability from a listed rental vehicle
### Images: upload images to AWS S3 Bucket
- ***@Post(upload-vehicle-images)***: upload a single or multiple photos for a vehcile
- ***@Post(upload-profile-images)***: upload a single or multiple profile photos
- ***@Post(find-all-vehicle-images)***: find all images of a vehicle from the database
- ***@Post(find-vehicle-image)***: find a specific image of a vehicle from the database
- ***@Post(find-profile-images)***: find all profile images of a user from the database
- ***@Post(find-profile-image)***: find a specific profile image of a user from the database
- ***@Post(delete-images)***: delete selected image(s)

### Currently under development, should be completed by 11/21/2020
- Jonathan Sells


