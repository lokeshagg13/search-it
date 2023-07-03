import Backdrop from "../ui/Backdrop";
import Modal from "../ui/Modal";

// Large size image when an image is clicked
function ImageOverlay(props) {
  const { image, onClose } = props;

  return (
    <>
      <Backdrop onClick={onClose} />
      <Modal onClose={onClose}>
        <img
          id={image.id}
          src={`https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`}
          alt={image.title}
        />
      </Modal>
    </>
  );
}

export default ImageOverlay;
