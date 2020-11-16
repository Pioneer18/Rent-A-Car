# Rent-A-Car
This project is a demonstration of server-side development skills; TypeScript, NodeJS, NestJS, MongoDB, MySQL, Redis, Docker, and Testing. This Repository has the files for the backend of the application.

### About The App:
Rent-A-Car is a demonstrative car rental web application that allows users to list their own vehicles or search for vehicles in a specified area. 

### Technologies:
* TypeScript
* NodeJS
* NestJs
* MongoDB
* Redis
* Docker

### App Features
- HTTP Development Environment/ HTTPS Production Environment
- JWT Authentication with Cookies (increased security)
- Security *
- Geo Coder API
- AWS S3 Bucket image storage *
- Logs
- Error Handling
- Testing
- Docker and Google Cloud Deployment
- Ready to serve a front-end

### Why NestJS
-

### Rent-A-Car Route Map
**Auth**
- *@Post(**login**)*: log user into the application and grant a JWT authentication token
- *@Post(logout)*: log user out of the application and expire their JWT authentication token
- *@Post(change-password)*: replace user's current password with the new password
- *@Post(forgot-password)*: send user a password replacement email
- *@Post(reset-password)*: reset the user's password with the password provided by the completed reset password email
**User**
- *@Post(create-user)*: create a new user account
- *@Pot(update-user)*: update user info; e.g. email, username
- *@Post(find-user)*: find a user in the database by email
- *@Post(delete-profile)*: delete a user profile
**Rental**
- *@Post(rental)*: create a new rental vheicle listing
- *@Get(rental)*: search for rentals near a specified location (the user's location)
- *@Post(edit-price)*: edit the rental's pricing
- *@Post(edit-details)*: edit the details of the rental; e.g. # of seats, color, etc.
- *@Post(schedule-unavailability)*: set a period of unavailability for the rental; e.g. Apr. 1 - Jun. 15
- *@Post(update-unavailability)*: edit the unavailability of the vehicle
- *@Post(remove-unavailability)*: remove scheduled unavailability from a listed rental vehicle
**Images**
- *@Post(upload-vehicle-images)*: upload a single or multiple photos for a vehcile
- *@Post(upload-profile-images)*: upload a single or multiple profile photos
- *@Post(find-all-vehicle-images)*: find all images of a vehicle from the database
- *@Post(find-vehicle-image)*: find a specific image of a vehicle from the database
- *@Post(find-profile-images)*: find all profile images of a user from the database
- *@Post(find-profile-image)*: find a specific profile image of a user from the database
- *@Post(delete-images)*: delete selected image(s)

### Currently under development, should be completed by 11/18/2020
- Jonathan Sells


