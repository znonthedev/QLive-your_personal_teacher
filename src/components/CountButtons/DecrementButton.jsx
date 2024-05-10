import React from "react";
import classes from "./CountButtons.module.css";
import minusIcon from "../../assets/minus-icon.svg";

export const DecrementButton = ({onClick}) => {
  return (
    <button className={classes.countButton} onClick={onClick}>
      <img src={minusIcon} alt="Decrement" />
    </button>
  );
};
