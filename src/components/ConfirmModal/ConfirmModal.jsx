import React, { useEffect } from "react";
import classes from "./ConfirmModal.module.css";
import { BackDrop } from "../BackDrop/BackDrop";
import {useSelector} from "react-redux"

export const ConfirmModal = ({
  handleCancel,
  headingText,
  paraText,
  warningText,
  handleSubmit,
  confirmText,
}) => {
  const { loading } = useSelector((state) => state.admin);

  useEffect(() => {
    document.body.classList.add(classes.bodyModalOpen);
    return () => {
      document.body.classList.remove(classes.bodyModalOpen);
    };
  }, []);
  return (
    <>
    <div className={classes.deleteModalContainer}>
      <div className={classes.deleteModal}>
        <h1 className={classes.heading}>{headingText}</h1>
        {paraText && <p className={classes.para}>{paraText}</p>}
        {warningText && <p className={classes.warning}>{warningText}</p>}
        <div className={classes.actions}>
          <button className={classes.action_btn} onClick={handleCancel}>
            Cancel
          </button>
          <button
            style={{ color: confirmText === "Delete" ? "#ff4141" : "#2E5980" }}
            className={classes.action_btn}
            onClick={handleSubmit}
          >
            {confirmText}
          </button>
        </div>
      </div>
      <div className={classes.modal_closer} onClick={handleCancel}></div>
    </div>
    {loading && <BackDrop/>}</>
  );
};
