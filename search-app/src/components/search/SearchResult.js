import axios from "../../api/axios";

import { useEffect, useState } from "react";
// import Loader from "../ui/Loader";
// import Notification from "../ui/Notification";

import classes from "./SearchResult.module.css";

const SEARCH_IMAGE_URL = "/api/images/search";

// Search image from backend server using a search expression provided by user
async function searchImagesByTag(tag) {
  let response;
  try {
    // Sending request to backend server for searching image
    response = await axios.get(`${SEARCH_IMAGE_URL}/${tag}`);
    console.log(response)
    return { status: "SUCCESS", ...response.data };
  } catch (error) {
    if (response?.data) return { status: "FAILED", ...response.data };
    else return { status: "FAILED", ...response };
  }
}

function SearchResult(props) {
  const { tag } = props;
  // For checking if images are loaded or not
  const [isLoading, setIsLoading] = useState(true);
  // For storing image metadata
  const [imageList, setImageList] = useState([]);
  // In case of error
  const [errorMsg, setErrorMsg] = useState(null);

  // Each time, the search exp is changed or empty, the call to either of the above two functions is made
  // to get image results and store in a list
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let result = await searchImagesByTag(tag);

      // Checking and setting states based on api response
      if (result?.status === "SUCCESS") {
        setErrorMsg(null);
        setImageList(result.photos.photo);
      } else {
        setImageList([]);
        if (result?.message) {
          setErrorMsg(result.message);
        } else
          setErrorMsg("Error while searching for images. Please try again");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [tag]);

  // Grid used for showing image results (3X3 in a basic laptop screen but responsive to screen size using CSS)
  return (
    <>
      {!errorMsg && imageList?.length > 0 && (
        <div className={classes.imageGrid}>
          {imageList.map((image) => (
            <img
              className={classes.imageElement}
              key={image.id}
              id={image.id}
              src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
              alt={image.title}
            />
          ))}
        </div>
      )}
      {/* {errorMsg && <Notification type="error" message={errorMsg} />}
      {!errorMsg && !isLoading && imageList?.length === 0 && (
        <Notification type="error" message="No Search Results found" />
      )}
      {!errorMsg && isLoading && <Loader />} */}
    </>
  );
}

export default SearchResult;
