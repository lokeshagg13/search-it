# SEARCH IT App

This project is based on an **image search application along with the login functionality**. The user has option to register their details (**signup**) and then **login to access the search functionality**.
The images can be searched by **entering a related search tag within the search box**. The **search results** will be shown in the form of a **grid** where **each image can be clicked and enlarged**.

# Code details 

This project was created in two phases simultaneously
1. Server side for handling backend
2. React frontend
 
## Available Scripts

### For Server Side
Dependencies are to create a .env file containing the following variables:
1. PORT = Port on which the server side will run.
2. DATABASE_ONLINE = Need to create an online mongoDB account and add the connection string for the database within this environment variable.
3. ACCESS_TOKEN_SECRET = Access token secret for encrypting the access token of a user login. (can be generated at https://jwt.io/)
4. REFRESH_TOKEN_SECRET = Refresh token secret used in user session refresh (can be generated at https://jwt.io/)
5. FLICKR_API_KEY and FLICKR_API_SECRET = A flickr api account and project is needed to be created which is used for image search. This api will have an api key and api secret which must be mentioned in the .env file. 

**NOTE: Do not forget to run `npm install` from within the search-server folder for installing all the required packages for server end.**

When everything is setup, use `npm start` to run the backend API server 

### For Client Side
Do check the versions used for the packages in package.json file. 

**NOTE: Do not forget to run `npm install` from within the search-app folder for installing all the required packages for react end.** 

and when server is up and running,
use `npm start` to run the react server

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Dont forget to do npm install in both folders search-app and search-server separately

## References

1. [https://www.flickr.com/services/developer/api/](https://www.flickr.com/services/developer/api/)
2. [https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd) - For understanding react auth and logins
3. [https://www.youtube.com/watch?v=f2EqECiTBL8&t=0s](https://www.youtube.com/watch?v=f2EqECiTBL8&t=0s) - For understanding backend logins and auth
