import React from "react";
import classes from "./Settings.module.css";
import arrowBack from "../../assets/arrow_back.svg";
import { useNavigate,useLocation } from "react-router-dom";
import illustration from "../../assets/settings_illustration.png";
import logoutIcon from "../../assets/logout.svg";
import { useDispatch } from "react-redux";
import { logoutApi } from "../../Store/authSlice";

export const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutApi(navigate));
  };

  const handleBackClick = ()=> {
      navigate(
        location.state?.previousUrl ? location.state?.previousUrl : "/"
      )
  }

  return (
    <div className={classes.settingsContainer}>
      <header className={classes.headerContainer}>
      <img
        src={arrowBack}
        alt="Back"
        className={classes.backArrow}
        onClick={handleBackClick}
      />
        <h2 className={classes.heading}>Settings</h2>
      </header>
      <div className={classes.settings_body}>
        <div>
          <h3 className={classes.heading}>Staff login access management</h3>
          <p className={classes.para}>
            Change staff login username and password
          </p>
          <h2
            className={classes.changePassword}
            onClick={() => navigate("/changepassword")}
          >
            Change password
          </h2>
        </div>
        <img
          src={illustration}
          alt="illustration"
          className={classes.illustration}
        />
      </div>
      <div className={classes.logout_container}>
        <div className={classes.logout} onClick={handleLogout}>
          <img src={logoutIcon} alt="Logout" />
          Logout
        </div>
      </div>
    </div>
  );
};
