import classes from "./Modal.module.css";

// Modal for image overlay
function Modal(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <button className={classes.cancelBtn} onClick={props.onClose}>
          &times;
        </button>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
