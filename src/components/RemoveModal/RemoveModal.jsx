import React, { useEffect } from "react";
import classes from "./RemoveModal.module.css"

export const RemoveModal = ({headingText,handleSubmit,handleCancel}) => {
  useEffect(() => {
    document.body.classList.add(classes.bodyModalOpen);
    return () => {
      document.body.classList.remove(classes.bodyModalOpen);
    };
  }, []);

  return (
    <div className={classes.removeModalContainer}>
      <div className={classes.removeModal}>
        <h1 className={classes.heading}>{headingText}</h1>
        <div className={classes.actions}>
          <button className={classes.action_btn} onClick={handleCancel}>
            Cancel
          </button>
          <button
            className={`${classes.action_btn} ${classes.remove_btn}`}
            onClick={handleSubmit}
          >
            Remove
          </button>
        </div>
      </div>
      <div className={classes.modal_closer} onClick={handleCancel}></div>
    </div>
  );
};
