import React, { useEffect, useState } from "react";
import classes from "./ChangePassword.module.css";
import avatar from "../../../assets/staffs.png";
import close from "../../../assets/close.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeStaffPasswordApi, getStaffApi } from "../../../Store/adminSlice";
import { BackDrop } from "../../../components/BackDrop/BackDrop";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { staff, loading } = useSelector((state) => state.admin);
  const [password, setPassword] = useState(staff?.raw_password || "");

  useEffect(() => {
    dispatch(getStaffApi());
  }, []);

  useEffect(() => {
    setPassword(staff?.raw_password);
  }, [staff]);

  const handleSavePassword = () => {
    if (!password) {
      return;
    }
    dispatch(
      changeStaffPasswordApi({ staffId: staff?.id, password, navigate })
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSavePassword();
      e.target.blur();
    }
  };

  return (
    <>
      <div className={classes.changePasswordContainer}>
        <div className={classes.header}>
          <img
            src={close}
            alt="Close"
            className={classes.close_icon}
            onClick={() => navigate("/settings")}
          />
          <h1 className={classes.header_text}>Change password</h1>
          <button className={classes.save_btn} onClick={handleSavePassword}>
            Save
          </button>
        </div>
        <div className={classes.body}>
          <div className={classes.details}>
            <img src={avatar} alt="Avatar" className={classes.avatar} />
            <div>
              <label htmlFor="username" className={classes.usernameLabel}>
                Username
              </label>
              <h3 className={classes.username} id="username">
                {staff?.username}
              </h3>
            </div>
          </div>
          <label htmlFor="password" className={classes.label}>
            Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            className={classes.input}
            placeholder="qlive890970"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
      {loading && <BackDrop />}
    </>
  );
};
