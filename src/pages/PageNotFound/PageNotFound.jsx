import React from "react";
import classes from "./PageNotFound.module.css";
import notFoundImage from "../../assets/404.png";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div className={classes.pageNotFoundContainer}>
      <img src={notFoundImage} alt="404" className={classes.icon} />
      <h2 className={classes.labelText}>
        This may be an error. Anyway, the page you're looking for doesn't exist
      </h2>
      <Link to={"/"}>
        <p className={classes.link_text}>Back to home</p>
      </Link>
    </div>
  );
};
