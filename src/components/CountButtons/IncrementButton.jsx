import React from "react";
import classes from "./CountButtons.module.css";
import plusIcon from "../../assets/plus-icon.svg";

export const IncrementButton = ({ onClick }) => {
  return (
    <button className={classes.countButton} onClick={onClick}>
      <img src={plusIcon} alt="Increment" />
    </button>
  );
};
