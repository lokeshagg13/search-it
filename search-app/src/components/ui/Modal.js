import { Fragment } from "react";

import classes from "./Modal.module.css";

function Modal(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
      <Fragment>
        <button className={classes.cancelBtn} onClick={props.onClose}>
          Close
        </button>
      </Fragment>
    </div>
  );
}

export default Modal;
