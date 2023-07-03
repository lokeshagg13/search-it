const axios = require("axios");
require("dotenv").config();

exports.searchImageByTag = async (req, res) => {
    // Get search tag from request parameters
    const tag = req.params.tag;
    // Get flickr API key from env
    const apiKey = process.env.FLICKR_API_KEY
    // Base URL for flickr API search
    const REQUEST_URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&format=json&nojsoncallback=1`;
    
    try {
        
        // Send request to cloudinary API
        const response = await axios.get(REQUEST_URL);

        // Send back the response
        return res.status(200).json(response.data);

    } catch (error) {
        return res
        .status(500)
        .json({ message: "Error while searching for images" });
    }
}