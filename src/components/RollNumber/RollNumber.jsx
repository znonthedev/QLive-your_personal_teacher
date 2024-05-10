import React from "react";
import classes from "./RollNumber.module.css";
import starIndicator from "../../assets/star_indicator.svg";
import blacklistedIcon from "../../assets/star_indicator-blacklisted.svg";

export const RollNumber = ({ rollNo, blacklisted }) => {
  return (
    <div className={classes.rollNumberContainer}>
      <img src={blacklisted ? blacklistedIcon : starIndicator} alt="Star" />
      <span>{rollNo ? rollNo : "-"}</span>
    </div>
  );
};
