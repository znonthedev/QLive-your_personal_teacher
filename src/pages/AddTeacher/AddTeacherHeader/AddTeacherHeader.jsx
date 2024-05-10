import React from "react";
import classes from "./AddTeacherHeader.module.css";
import arrowBack from "../../../assets/arrow_back.svg";
import { useNavigate } from "react-router-dom";

export const AddTeacherHeader = ({ title,backPath, nextClick, handleFinish }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (backPath) {
      navigate(backPath);
    }
  };

  return (
    <div className={classes.addTeacherHeader}>
      <img
        src={arrowBack}
        alt="Back"
        className={classes.backArrow}
        onClick={handleBackClick}
      />
      <h1 className={classes.heading}>{title ? title :"Add teacher"}</h1>
      {handleFinish ? (
        <button className={classes.nextBtn} onClick={handleFinish}>
          Finish
        </button>
      ) : (
        <button className={classes.nextBtn} onClick={nextClick}>
          Next
        </button>
      )}
    </div>
  );
};
