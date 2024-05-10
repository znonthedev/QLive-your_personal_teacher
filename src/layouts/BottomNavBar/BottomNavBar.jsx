import React from "react";
import classes from "./BottomNavBar.module.css";
import dashboard from "../../assets/dashboard.svg";
import dashboardFilled from "../../assets/dashboard-filled.svg";
import contacts from "../../assets/contacts.svg";
import contactsFilled from "../../assets/contacts-filled.svg";
import face from "../../assets/face.svg";
import faceFilled from "../../assets/face-filled.svg";
import grade from "../../assets/school.svg";
import gradeFilled from "../../assets/school-filled.svg";
import { useNavigate, useLocation } from "react-router-dom";

export const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className={classes.bottomNavBar}>
      <ul className={classes.navList}>
        <li
          className={`${classes.navItem} ${isActive("/") && classes.active}`}
          onClick={() => navigate("/")}
        >
          <img
            src={isActive("/") ? dashboardFilled : dashboard}
            alt="Dashboard"
          />
          Dashboard
        </li>
        <li
          className={`${classes.navItem} ${
            isActive("/teachers") && classes.active
          }`}
          onClick={() => navigate("/teachers")}
        >
          <img src={isActive("/teachers") ? faceFilled : face} alt="Teachers" />
          Teachers
        </li>{" "}
        <li
          className={`${classes.navItem} ${
            isActive("/subjects") && classes.active
          }`}
          onClick={() => navigate("/subjects")}
        >
          <img
            src={isActive("/subjects") ? contactsFilled : contacts}
            alt="Subjects"
          />
          Subjects
        </li>{" "}
        <li
          className={`${classes.navItem} ${
            isActive("/grades") && classes.active
          }`}
          onClick={() => navigate("/grades")}
        >
          <img src={isActive("/grades") ? gradeFilled : grade} alt="Grades" />
          Grades
        </li>
      </ul>
    </div>
  );
};
