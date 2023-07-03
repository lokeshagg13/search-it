import classes from "./Backdrop.module.css";

// Backdrop for image overlay
function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
}

export default Backdrop;
