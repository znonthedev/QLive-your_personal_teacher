import React from "react";
import classes from "./Header.module.css";
import settingsIcon from "../../assets/settings.svg";
import logoutIcon from "../../assets/logout.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutApi } from "../../Store/authSlice";

export const Header = ({ heading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const token = localStorage.getItem("qlive_token");
  const role = localStorage.getItem("qlive_role");

  const handleLogout = () => {
    dispatch(logoutApi(navigate));
  };

  return (
    <header className={classes.headerContainer}>
      <h2 className={classes.heading}>{heading}</h2>
      {token && role === "staff" ? (
        <img
          src={logoutIcon}
          alt="Logout"
          className={classes.settingsIcon}
          onClick={handleLogout}
        />
      ) : (
        <img
          src={settingsIcon}
          alt="Settings"
          className={classes.settingsIcon}
          onClick={() =>
            navigate("/settings", {
              state: { previousUrl: location?.pathname },
            })
          }
        />
      )}
    </header>
  );
};
