const express = require("express");
const searchController = require("../Controllers/searchController");

// Router Mounting
const searchRouter = express.Router();

// Routes for image search
searchRouter
  .route("/:tag")
  .get(searchController.searchImageByTag);

module.exports = searchRouter;
