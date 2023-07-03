import Notification from "../ui/Notification";

import classes from "./SearchResult.module.css";

// Showing of grid of search results (only when tag is non null)
function SearchResult(props) {
  const { tag, images, onImageSelect } = props;

  // Grid used for showing image results (3X3 in a basic laptop screen but responsive to screen size using CSS)
  return (
    <>
      {!tag && <></>}
      {tag && images?.length > 0 && (
        <div className={classes.imageGrid}>
          {images.map((image) => (
            <button key={image.id} onClick={() => onImageSelect(image)}>
              <img
                className={classes.imageElement}
                id={image.id}
                src={`https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_w.jpg`}
                alt={image.title}
              />
            </button>
          ))}
        </div>
      )}
      {tag && images.length === 0 && (
        <Notification type="error" message="No Search Results found" />
      )}
    </>
  );
}

export default SearchResult;
