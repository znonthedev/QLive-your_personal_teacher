import React from "react";
import classes from "./AddButton.module.css";
import addIcon from "../../assets/add.svg";

export const AddButton = ({onClick}) => {
  return (
    <div className={classes.addButton} onClick={onClick}>
      <img src={addIcon} alt="Add" />
    </div>
  );
};
