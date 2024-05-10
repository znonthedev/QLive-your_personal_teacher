import React from "react";
import classes from "./DownloadButton.module.css";
import downloadIcon from "../../assets/download.svg";

export const DownloadButton = ({ onClick }) => {
  return (
    <button className={classes.downloadButton} onClick={onClick}>
      <img src={downloadIcon} alt="Download" />
    </button>
  );
};
