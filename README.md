# Introduction

This is a web application having a responsive user interface for searching and viewing data on the publicly available <a href = "https://metmuseum.github.io/"> Metropolitan Museum of Art Collection API </a>. Explore the application using the link : <a href = "https://a6-app-ten.vercel.app/" target=”_blank”> API Viewer </a>.

Below are given the details about the different concepts being used to implement the application functionality.

# User Authentication
The user authentication is implemented by using the <b> JSON Web Tokens (JWT)</b>. For the database, <b> MongoDB </b> is used to store the data about the users who have registered. Only the registered users after logging in have access to view and search the data available on the API.

<img width="1440" alt="Register" style = "display: inline-block" src="https://github.com/Ankit16727/a6-app/assets/120432770/b90426e8-b3ee-4fae-9fd5-94e447c708d6">
<img width="1440" alt="LogIn" style = "display: inline-block" src="https://github.com/Ankit16727/a6-app/assets/120432770/ebc648fc-a955-46d4-b1c3-8083ff2ecc42">

# Searching Data
There are 2 types of search available :
## Simple Search
 <img width="1440" alt="simplesearch" src="https://github.com/Ankit16727/a6-app/assets/120432770/3646407b-4637-4045-b9c2-7d0937aeb8b7">
 
## Advanced Search (Gives more options to filter the search)</b>
<img width="1440" alt="advancedSearch" src="https://github.com/Ankit16727/a6-app/assets/120432770/10e0af3e-13a6-4ca5-9f7a-ed5bdf51fb1c">

# Data View
<b> React Bootstrap </b> is used to implement the given user interface.

<img width="1440" alt="Screen Shot 2024-01-26 at 2 49 07 PM" src="https://github.com/Ankit16727/a6-app/assets/120432770/704a2094-d67a-4f99-94b6-13e61f2ba3ca">

<img width="1440" alt="itsdata" src="https://github.com/Ankit16727/a6-app/assets/120432770/1ebeebcb-08f1-483f-b56e-5a789b9e2aeb">



<img width="1440" alt="dataView2" src="https://github.com/Ankit16727/a6-app/assets/120432770/0eca8b31-9e9d-41ca-b118-5874c94cd3e9">


# Favorites
The applications gives the facility to the user to have <b> Favorites </b> which allows them to revisit the collections they liked again.


<img width="1440" alt="favorites" src="https://github.com/Ankit16727/a6-app/assets/120432770/9025a4dc-5115-4def-9df6-3996e0ad4a0e">
<br><br>
<img width="1440" alt="favorites2" src="https://github.com/Ankit16727/a6-app/assets/120432770/87f9164c-3af4-4ac5-998c-fec2c9e8ce4e">

# History


The application saves the history of all the searches that user made so that the user can visit them again if they like to.
<img width="1440" alt="history" src="https://github.com/Ankit16727/a6-app/assets/120432770/f014a616-b3cf-4919-a76e-ce12e08d922c">






