# **Rent-A-Car API**
<font size=3>[Rent-a-car](https://github.com/Pioneer18/Rent-A-Car) is a demonstrative peer-to-peer car rental application. The app is designed to enable users to travel to a new city and easily locate a convenient rental car near their location, or to list their own vehicle for rental. Like other similar car rental applications, Rent-A-Car users may list rental vehicles at their home or near a well traveled public location; e.g. near a Train Station. Users may also manage their profiles, upload images for their rentals, edit rental details, and more. This application was built with the [NestJS](https://nestjs.com) webframework.</font>

## **Quick Start**
<font size=3>To quickly get started with a tour of the application, please follow this [guide](https://github.com/Pioneer18/Rent-A-Car/wiki/Rent-A-Car-Wiki-Home).</font>

## **Logging In to the Applicaiton**
<font size=3>The first step to using the Rent-A-Car API is to login to the application. You may use one of the premade accounts available in the request body, or create a new account to begin.</font>

<img src="https://drive.google.com/uc?export=view&id=1z8uwCcdBdTj0gD0V39oWFEjlcHq-O9o8" alt="Login example gif" width="600">

<font size=3>To create a new account use the **User Module - Create User** request. Once you have created or selected an account, open the **Auth Module** and select the **Login** request to enter your selected account credentials. A successful login request will return the created profile data in the response as seen below.</font>  

<img src="https://drive.google.com/uc?export=view&id=1p8oGVy38OqYgKJ6x4VoE1eu6UwN_w5nM" alt="Login example" width="450" height="180">

## **Create a New Rental Listing**
<font size=3>Now that you are logged in, create a new rental listing at your home address or any address of your choice. You may use the example rental JSON object already in the request, one of the rental examples from [here](), or rewrite the rental data yourself.</font>

<img src="https://drive.google.com/uc?export=view&id=1yjWM6KbWoGuE84uVJkqri3onSlb4KH0S" alt="Login example">

<font size=3>A successful request will return the rental you just sent and a '201 Created' response, as seen below. Notice that the returned rental has an **_id** property now, this is its unique id in the remote MongoDB database.</font>

<img src="https://drive.google.com/uc?export=view&id=1MJcfMsFlhIbD_u_mTbOO3S-jf2OYtBNU" alt="Login example" >


## **Upload Images to a Rental Listing**

<font size=3>To upload images to the new rental you've just created, copy the **_id** from the **Create Rental**  response object and paste it in the **Params** of the **Upload Rental Images** request, as seen below.</font> 

<img src="https://drive.google.com/uc?export=view&id=1dESLgGAzBEtVRV41HuPfm_lYqgfZU8g0" alt="Login example" >

<font size=3>Next switch to the body of the **Upload Rental Images** request and choose images from your local pc as shown below, then select **Send** to upload your images. The images are stored in a public **AWS S3 Bucket** in a directory with your account email, the link returned in the response is the download link for the Bucket.</font>

<img src="https://drive.google.com/uc?export=view&id=1tYF1grDx2454Bq1zSaDPghctN8n0EvLb" alt="Login example" >

## **Search For Rental Listings in Different Cities**

Rent-A-Car is designed to enable a user to travel to a new city and easily locate a convenient rental car near their location. Like other similar car rental applications, Rent-A-Car users may list rental vehicles at their home or a well traveled public location; e.g. near a Train Station.

## **Troubleshooting**
<font size=3>- **No Response From Request**: If your request is infintely pending and never recieves a successful response, you may have not logged into the application or your session has expired. Please try logging into the application again before making the request</font>

<font size=3>- **Image Upload Error**: If you are unable to upload one or several images, make sure that the selected files exist and are not corrupted in any way</font>

<font size=3>If you've ensured the selected files are present and that they are of the correct uncorrupted file type, yet the files still never upload, try removing the cookie key from the Header of the request.</font>

<img src="https://drive.google.com/uc?export=view&id=1-5uvVG0Ya5Dmc_6BRVSOii8FDRkXuCZq" alt="Login example" >

<font size=3>- **Create Rental Error**: If you get a bad request error when you send the **Create Rental** request, try these solutions</font>

- Double check the **gasGrade** value is one of the following exactly (regular, mid, premium, diesel, N/A)
- Make sure you have filled in every property and that there are no missing commas
- If everything looks perfect but there is still an error, make sure that the last propery of each section does not have a comma

<font size=3>- **No Search Rental Results**: If you cannot find any rentals near the addresses you are entering, you may be searching to far from any listed rentals. Please try one of the searching with one of the examples below</font>