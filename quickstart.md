# **Rent A Car API**
<font size=3>[Rent-a-car](https://github.com/Pioneer18/Rent-A-Car) is a demonstrative peer-to-peer car rental application. A user is able to search for car rentals in a radius near their location or near any address of their choice, as well as list and manage their own rentals. This application was built with a [NestJS](https://nestjs.com) backend.</font>

## **Quick Start**
<font size=3>To quickly get started with a tour of the application, please follow this guide.</font>

## **Logging In to the Applicaiton**
<font size=3>The first step to using the Rent-A-Car API is to login to the application. You may use one of the premade accounts available in the request body, or create a new account to begin.</font>

<img src="https://drive.google.com/uc?export=view&id=1z8uwCcdBdTj0gD0V39oWFEjlcHq-O9o8" alt="Login example gif" width="600">

<font size=3>To create a new account use the **User Module - Create User** request. Once you have created or selected an account, open the **Auth Module** and select the **Login** request to enter your selected account credentials. A successful login request will return the created profile data in the response</font>  

<img src="https://drive.google.com/uc?export=view&id=1p8oGVy38OqYgKJ6x4VoE1eu6UwN_w5nM" alt="Login example" width="450" height="180">

## **Create a New Rental Listing**
<font size=3>Now that you are logged in, create a new rental listing at your home address or any address of your choice. You may use the example rental JSON object already in the request, one of the rental examples from [here](), or rewrite the rental data yourself.</font>

<img src="https://drive.google.com/uc?export=view&id=1USunlVWm7ZATTgzAfM28bfG_gchZjmUb" alt="Login example">

<font size=3>A successful request will return the rental you just sent and a '201 Created' response, as seen below</font>

<img src="https://drive.google.com/uc?export=view&id=1xthGFOPAqJ53y2XVIWGUQHASRtdMywkE" alt="Login example" >


## **Upload Images to a Rental Listing**

## **Search For Rental Listings in Different Cities**


## **Troubleshooting**
<font size=3>**No Response From Request**: If your request is infintely pending and never recieves a successful response, you may have not logged into the application or your session has expired. Please try logging into the application again before making the request</font>

<font size=3>**Image Upload Error**: If you are unable to upload one or several images, make sure that the selected files exist and are not corrupted in any way</font>

<font size=3>If you've ensured the selected files are present and that they are of the correct uncorrupted file type, yet the files still never upload, try removing the cookie key from the Header of the request.</font>

<img src="https://drive.google.com/uc?export=view&id=1-5uvVG0Ya5Dmc_6BRVSOii8FDRkXuCZq" alt="Login example" >


