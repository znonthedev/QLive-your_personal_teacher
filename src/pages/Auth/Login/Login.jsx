import React, { useRef, useState } from "react";
import classes from "./Login.module.css";
import illustration from "../../../assets/illustartion.png";
import visibileIcon from "../../../assets/visibility.svg";
import visibileOffIcon from "../../../assets/visibility_off.svg";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../../../Store/authSlice";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";

export const Login = () => {
  const [visibility, setVisibility] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const loginError = useSelector((state) => state.auth.error);

  // password Visible handler
  const handlePasswordVisibility = () => {
    setVisibility(!visibility);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      console.log("Please provide both username and password.");
      return;
    }

    const userData = {
      username: username,
      password: password,
    };

    setIsProcessing(true);

    try {
      await dispatch(loginApi({ userData, navigate }));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={classes.loginContainer}>
      <img
        src={illustration}
        alt="Illustration"
        className={classes.illustration}
      />
      <div className={classes.loginFormWrapper}>
        <h1 className={classes.heading}>Login</h1>
        <form className={classes.form} action="">
          <label htmlFor="email" className={classes.label}>
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`${classes.input} ${
              loginError &&
              loginError === "Incorrect username" &&
              classes.errorInput
            }`}
            placeholder="Enter your email address"
            ref={usernameRef}
          />
          <div className={classes.errorText_wrapper}>
            {loginError && loginError === "Incorrect username" && (
              <span className={classes.errorText}>
                Invalid email. Enter a valid authorized email.
              </span>
            )}
          </div>
          <label htmlFor="password" className={classes.label}>
            Password
          </label>
          <div className={classes.password_wrapper}>
            <input
              type={visibility ? "text" : "password"}
              name="password"
              id="password"
              className={`${classes.input} ${
                loginError &&
                loginError === "Incorrect password" &&
                classes.errorInput
              }`}
              placeholder="Enter your password"
              ref={passwordRef}
            />
            <img
              src={visibility ? visibileIcon : visibileOffIcon}
              alt="Visiblity"
              onClick={handlePasswordVisibility}
              className={classes.visibility}
            />
          </div>
          <div className={classes.errorText_wrapper}>
            {loginError && loginError === "Incorrect password" && (
              <span className={classes.errorText}>
                Incorrect password. Try again.
              </span>
            )}
          </div>
          <span
            className={classes.forgotPassword}
            onClick={() =>
              navigate("/resetpassword", {
                state: { previousUrl: location.pathname },
              })
            }
          >
            Forgot password?
          </span>
          <CustomButton disabled={isProcessing} onClick={(e) => handleLogin(e)}>
            {isProcessing ? <CustomSpinner /> : "Log in"}
          </CustomButton>
        </form>
        <span className={classes.copyRight}>Copyright © 2024 Q Live</span>
      </div>
    </div>
  );
};
