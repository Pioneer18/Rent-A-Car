# **Rent-A-Car API**
<font size=3>[Rent-a-car](https://github.com/Pioneer18/Rent-A-Car) is a demonstrative peer-to-peer car rental application. The app is designed to enable users to travel to a new city and easily locate a convenient rental car near their location, or to list their own vehicle for rental. Like other similar car rental applications, Rent-A-Car users may list rental vehicles at their home or near a well traveled public location; e.g. near a Train Station. Users may also manage their profiles, upload images for their rentals, edit rental details, and more. This application was built with the [NestJS](https://nestjs.com) webframework.</font>

## **Quick Start**
<font size=3>To quickly get started with a tour of the application, please follow this guide, or read it on the [Rent-A-Car Wiki](https://github.com/Pioneer18/Rent-A-Car/wiki/Rent-A-Car-Wiki-Home).</font>

## **Logging In to the Application**
<font size=3>The first step to using the Rent-A-Car API is to login to the application. You may use one of the premade accounts available in the request body, or create a new account to begin.</font>

<img src="https://drive.google.com/uc?export=view&id=1z8uwCcdBdTj0gD0V39oWFEjlcHq-O9o8" alt="Login example gif" width="600">

<font size=3>To create a new account use the **User Module - Create User** request. Once you have created or selected an account, open the **Auth Module** and select the **Login** request to enter your selected account credentials. A successful login request will return the created profile data in the response as seen below.</font>  

<img src="https://drive.google.com/uc?export=view&id=1p8oGVy38OqYgKJ6x4VoE1eu6UwN_w5nM" alt="Login Success" width="450" height="180">

## **Create a New Rental Listing**
<font size=3>Now that you are logged in, create a new rental listing at your home address or any address of your choice. You may use the example rental JSON object already in the request, one of the rental examples from [here](https://docs.google.com/document/d/1XW2QRbaRE_R-hT5j9yBDL02L5sjfkddYAuj8uFiqf3Y/edit?usp=sharing), or rewrite the rental data yourself.</font>

<img src="https://drive.google.com/uc?export=view&id=1yjWM6KbWoGuE84uVJkqri3onSlb4KH0S" alt="Create a Rental Gif">

<font size=3>A successful request will return the rental you just sent and a '201 Created' response, as seen below. Notice that the returned rental has an **_id** property now, this is its unique id in the remote MongoDB database.</font>

<img src="https://drive.google.com/uc?export=view&id=1MJcfMsFlhIbD_u_mTbOO3S-jf2OYtBNU" alt="Created a Rental" >


## **Upload Images to a Rental Listing**

<font size=3>To upload images to the new rental you've just created, select the **List Your Rentals** request to find your rental's **_id**. Copy the **_id** of the rental you would like to upload images to, and paste it into the **Upload Rental Images**'s **rentalId** param, as seen below. Then, in the body tab of the **Upload Rental Images** request, select the images you wish to upload from your computer's local file system. </font> 

<font size=3>Next switch to the body of the **Upload Rental Images** request and choose images from your local pc, which is also shown below, then select **Send** to upload your images.</font>

<img src="https://drive.google.com/uc?export=view&id=1tYF1grDx2454Bq1zSaDPghctN8n0EvLb" alt="Upload Rental Images Gif" >

<font size=3>The images are stored in a public **AWS S3 Bucket** in a directory with your account email, the link returned in the response is the download link for the Bucket. In the two images below you can see the download link, and a screenshot of the bucket where the images are stored.</font>

<img src="https://drive.google.com/uc?export=view&id=1tVv92vCFXhOzL71G3DE_Ox8009Tjx1sc" alt="aws download link">

<img src="https://drive.google.com/uc?export=view&id=1Ish_BRCeQI8lk2wtP3tbpgc5rK-8SOs-" alt="s3 bucket">


## **Search For Rental Listings in Different Cities**

<font size=3>Because Rent-A-Car is demonstrative and does not have a real user base actively listing rentals, please reference the below table to simulate searching for rentals in a city. There are a total of 15 rentals listed in 3 different Florida cities; Tampa, Orlando, and Riverview. Search with one of the addresses to find that rental and any others in a 2, 4, 6, or 8 mile radius. The addresses were generated with an online random address generator.</font>

### Rental Listing Reference Table

| City      | User                           | Vehicle                     | Address                                   | _id                       |Max Duration  | Min Duration  | Required Notice  |
|-----------|--------------------------------|-----------------------------|-------------------------------------------|---------------------------|--------------|---------------|------------------|
| Tampa     | ice.king@gmail.com             | 1980 Volkswagen Rabbit      | 1103 E Lambright St Tampa 33604           | 5fe018f2975b32000e391509  |     6        |       4       |        4         |
| Tampa     | ice.king@gmail.com             | 2020 Subaru Outback         | 2512 E Stanley Matthew Cir Tampa 33604    | 5fe01a64975b32000e39150a  |     6        |       4       |        4         |
| Tampa     | sp117@gmail.com                | Rezvani Tank X              | 5807 Osceola Pl Tampa 33604               | 5fe01d94975b32000e39150c  |     6        |       2       |        2         |
| Tampa     | sp117@gmail.com                | Rexvani Hercules 6x6        | 5801 N 9th St Tampa 33604                 | 5fe02065975b32000e39150d  |     6        |       2       |        2         |
| Tampa     | vampire.queen@advtime.com      | 2020 Harley Street Rod      | 8203 N Mulberry St Tampa 33604            | 5fe140fb85f8fe000e59c806  |     6        |       4       |        5         |
| Riverview | finn-the-human@gmail.com       | Tesla Model 3               | 10417 Avelar Ridge Dr Riverview 33578     | 5fe001c28d3a5b000e7ab5e3  |     5        |       1       |        2         |
| Riverview | finn-the-human@gmail.com       | Cybertruck SM               | 10262 Post Harvest Dr Riverview 33578     | 5fe003b18d3a5b000e7ab5e4  |     5        |       1       |        2         |
| Riverview | jake.dog@gmail.com             | 2017 Toyota Prius           | 7022 Blue Beech Dr Riverview 33578        | 5fe01441975b32000e391506  |     6        |       1       |        1         |
| Riverview | jake.dog@gmail.com             | 2002 Dodge Grand Caravan    | 8203 N Mulberry St Tampa 33604            | 5fe016b1975b32000e391507  |     6        |       1       |        1         |
| Riverview | unathi.email@gmail.com         | 2020 Honda Accord           | 5334 Bandera Springs Cir Riverview 33578  | 5fdec36f1815d8000eb06f49  |     5        |       2       |        3         |
| Riverview | unathi.email@gmail.com         | 2020 Ram Power Truck        | 11323 Poinsettia St Riverview 33578       | 5fdffc7c8d3a5b000e7ab5e2  |     5        |       2       |        3         |
| Orlando   | two.hands@lagoontrading.com    | Willys MB Jeep              | 3205 Landtree Pl Orlando 32812            | 5fe02991975b32000e391513  |     5        |       2       |        3         |
| Orlando   | benny.hacker@lagoontrading.com | Honda Fit                   | 4446 Gilpin Way Orlando 32812             | 5fe13e1485f8fe000e59c804  |     6        |       2       |        2         |
| Orlando   | salary.man@lagoontrading.com   | Suzuki Wagon R              | 4209 Monarch Dr Orlando 32812             | 5fe02ba5975b32000e391515  |     6        |       3       |        4         |
| Orlando   | dutch.ltc@lagoontrading.com    | 1997 Honda VFR 750 F        | 1713 Watauga Ave Orlando 32812            | 5fe027c7975b32000e391512  |     6        |       1       |        1         |
| Orlando   | dutch.ltc@lagoontrading.com    | Plymouth Road Runner        | 5300 E Grant St Orlando 32812             | 5fe02450975b32000e39150f  |     6        |       4       |        1         |


<font size=3>**Note**: Max Duration, Min Duration, and Required Notice are [**Enums**](https://www.typescriptlang.org/docs/handbook/enums.html) that translate into time as days, weeks, and months</font>

<font size=3>Below is a example of each **filter option** for the **Search Rentals** request, only an **address** and **radius** are required to make a request</font>

#### Filter
-  **address**: 2496 W Brandon Blvd, Brandon, FL 33511
-  **radius**: 0 = 2 miles, 1 = 4 miles, 2 = 6 miles, and 3 = 8 miles
-  **rentalStartTime**: "December 24, 2020 11:13:00"
-  **rentalEndTime**: "December 27, 2020 10:00:00"
-  **price**: 27
-  **features**: ["Heated Seats"]

<font size=3>Below is an example of how to use the **Search Rentals** request. In this example the search is being made from the town movie theater with a radius of 3 (6 miles), and will only return rentals that have the ***Heated Seats*** feature.</font>

<img src="https://drive.google.com/uc?export=view&id=1j-UIaVXPCd0euvdBYYkiS_VFUyEEDyYs" alt="Search Rentals Example Heated Seats">

<font size=3>In this next example the radius is adjusted from 2 miles up to 6 miles to find rentals near the Tampa International Airport. The results are then further narrowed by limiting the price to $60.</font>

<img src="https://drive.google.com/uc?export=view&id=1U0qRSklwVsepJyTXeRLZKagi8nFxXaZz" alt="Search Rentals Example Tampa Airport">

<font size=3>This example narrows the rental search by specifying a rental **start time** and **end time**, which will filter only rentals with a duration that accommodates the requested rental duration. You can see the initial search results reduce from 5 to 3 after specifying the rental duration.</font>

<img src="https://drive.google.com/uc?export=view&id=1ET0kz_HyktJmt4TJXSNEsSeoZnYjFSXZ" alt="Search Rentals Example Orlando Airport">

## **Schdeule Unavailability**

<font size=3>Now that you have created a rental listing and searched for other available rentals, let's edit the **Availability** of one of your rentals and add a block of unavailable time for Christmas Break. Select the **Schedule Unavailability** request and create an Unavailability as seen in the example below.</font>

<img src="https://drive.google.com/uc?export=view&id=1898OU1sjWfXb4zAIsoa5cBp6ta9GTwyT" alt="Schedule Unavailability">

## **Edit The Rental Pricing**

<font size=3>Maybe your not getting as many rental requests as you'd like, lets edit the price on your rental to try to get more clients! Open the **Edit Rental Price** request and follow the example below</font>

<img src="https://drive.google.com/uc?export=view&id=1kaBbEbBWzDkl7ELKpbIBm9hyMSF6HtDc" alt="Edit Rental Pricing">

## **Logout of the App**

<font size=3>Now that you've had a brief tour of some of Rent-A-Car's main features, let's logout of the application. Select the **Logout** request and press send.</font>

<img src="https://drive.google.com/uc?export=view&id=1P3gXVR9jTiYSbWS9JXJmZ2IdIDYx-zRk" alt="Logout">


## **Next Steps**

<font size=3>Feel free to explore the other request available in the application, each request has documentation explaining its proper use. For more information about the application visit the [GitHub page](https://github.com/Pioneer18/Rent-A-Car), the [Wiki](https://github.com/Pioneer18/Rent-A-Car/wiki/Rent-A-Car-Wiki-Home), or the [technical application documentation website]()</font>


## **Troubleshooting**
<font size=3>- **No Response From Request**: If your request is infinitely pending and never receives a successful response, you may have not logged into the application or your session has expired. Please try logging into the application again before making the request.</font>

<font size=3>- **Image Upload Error**: If you are unable to upload one or several images, make sure that the selected files exist and are not corrupted in any way.</font>

<img src="https://drive.google.com/uc?export=view&id=1-5uvVG0Ya5Dmc_6BRVSOii8FDRkXuCZq" alt="Image Upload Error" >

<font size=3>- **Create Rental Error**: If you get a bad request error when you send the **Create Rental** request, try these solutions.</font>

- Double check the **gasGrade** value is one of the following exactly (regular, mid, premium, diesel, N/A)
- Make sure you have filled in every property and that there are no missing commas
- If everything looks perfect but there is still an error, make sure that the last property of each section does not have a comma

<font size=3>- **No Search Rental Results**: If you cannot find any rentals near the addresses you are entering, you may be searching to far from any listed rentals. Please try one of the searching with one of the examples below.</font>

<font size=3>- **Cannot Read Property 'Slice' of Undefined**: If you receive this error message, check that you have the **Cookie** property selected in the **Headers** tab of the request.</font>

<font size=3>- **Slow Request Response**: If you are experiencing slow request response time, such as on initial login, this is likely due to the Google Platform's 'Cold Load'