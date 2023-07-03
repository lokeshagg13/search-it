const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const credentials = require("./Middleware/credentials");
const errorHandler = require("./Middleware/errorHandler");
const corsOptions = require("./Config/corsOptions");

const userRouter = require("./Routes/userRoute");
const searchRouter = require("./Routes/searchRoute");

// Configure the environment variable from the default .env file
require("dotenv").config();

const app = express();

// Allow credentials for origin
app.use(credentials);

// Allowed cors for allowed origins
app.use(cors(corsOptions));

// built-in middleware for url encoded data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// built-in middleware cookie parser
app.use(cookieParser());

// Link the URL for search router which routes it to the controller which 
// will handle the API request
app.use("/api/images/search", searchRouter);
app.use("/api/user", userRouter);

// Custom middleware for handling invalid api paths
app.all("*", (req, res, next) => {
    next(
      new errorHandler(`Can't find ${req.originalUrl} that was requested`, 404)
    );
  });

// DB Connection
mongoose
  .connect(process.env.DATABASE_ONLINE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"));

// Setting up port
const port = process.env.PORT; // Assign Port
app.listen(port, () => {
  console.log(`App Running On Port: ${port} ...`);
});