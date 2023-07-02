import { useState, useRef, useEffect } from "react";

import Loader from "../ui/Loader";
import Notification from "../ui/Notification";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SearchResult from "./SearchResult";
import ImageOverlay from "./ImageOverlay";

import classes from "./SearchComp.module.css";

const SEARCH_IMAGE_URL = "/api/images/search";

// Search image from backend server using a search expression provided by user
async function searchImagesByTag(axiosPrivate, tag) {
  let response;
  try {
    // Sending request to backend server for searching image
    response = await axiosPrivate.get(`${SEARCH_IMAGE_URL}/${tag}`);
    console.log(response);
    return { status: "SUCCESS", ...response.data };
  } catch (error) {
    if (response?.data) return { status: "FAILED", ...response.data };
    else return { status: "FAILED", ...response };
  }
}

// Search Component used on Search page with Search Input and Search Results
function SearchComp() {
  let { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  
  // Ref to search input field
  const searchInputRef = useRef();
  // For search input field
  const [searchInput, setSearchInput] = useState("");
  // For search tag value (value of search input field after clicking submit)
  const [searchTag, setSearchTag] = useState(null);
  // For checking if images are loaded or not
  const [isLoading, setIsLoading] = useState(false);
  // For storing image metadata
  const [imageList, setImageList] = useState([]);
  // In case of error
  const [errorMsg, setErrorMsg] = useState(null);
  // Selected Image
  const [selectedImage, setSelectedImage] = useState(null);

  // Setting focus on search input when this component is loaded
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  // Handle submit of search, set searchTag state to the value of the search input field which will further fetch
  // the search results from backend and update the SearchResult component
  async function submitHandler(event) {
    event.preventDefault();
    if (!searchInputRef.current.value) {
      return
    }
    setIsLoading(true);
    setSearchTag(searchInputRef.current.value);
    let searchResult = await searchImagesByTag(axiosPrivate, searchInputRef.current.value);

    // Checking and setting states based on api response
    if (searchResult?.status === "SUCCESS") {
      setErrorMsg(null);
      setImageList(searchResult.photos.photo);
    } else {
      setImageList([]);
      if (searchResult?.message) {
        setErrorMsg(searchResult.message);
      } else setErrorMsg("Error while searching for images. Please try again");
    }
    setIsLoading(false);
  }

  // Resetting the search
  function resetHandler() {
    setSearchInput("");
    setSearchTag(null);
    setImageList([]);
  }

  // Open Image Overlay
  function openImageOverlay(image) {
    setSelectedImage(image);
  }

  // Close Image Overlay
  function closeImageOverlay() {
    setSelectedImage(null);
  }

  const loggedInMessage = `Welcome ${auth.email} !!!`
  // Component will contain search input, submit and reset button for submitting and resetting the search input and
  // SearchResult component containing all the search results based on searchExp prop passed on to it.
  return (
    <>
      <br />
      <Notification type="success" message={loggedInMessage} />
      <form onSubmit={submitHandler}>
        <div className={classes.searchForm}>
          <div className={classes.control}>
            <input
              type="text"
              id="search-input"
              autoComplete="off"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              ref={searchInputRef}
              required
            />
          </div>
          <div className={classes.actions}>
            <button type="submit">Search</button>
            <button type="button" onClick={resetHandler}>
              Reset
            </button>
          </div>
        </div>
      </form>
      <>
        {!errorMsg && !isLoading && (
          <SearchResult
            tag={searchTag}
            images={imageList}
            onImageSelect={openImageOverlay}
          />
        )}
        {!errorMsg && isLoading && <Loader />}
        {errorMsg && <Notification type="error" message={errorMsg} />}
        {selectedImage && (
          <ImageOverlay image={selectedImage} onClose={closeImageOverlay} />
        )}
      </>
    </>
  );
}

export default SearchComp;
