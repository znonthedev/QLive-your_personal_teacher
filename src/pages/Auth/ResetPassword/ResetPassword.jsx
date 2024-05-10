import React, { useRef, useState } from "react";
import classes from "./ResetPassword.module.css";
import { CustomBackButton } from "../../../components/CustomBackButton/CustomBackButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordApi } from "../../../Store/authSlice";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";

export const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const emailError = useSelector((state) => state.auth.error);

  const handleInputChange = () => {
    setIsEmailValid(emailRef.current.value.trim() !== "");
  };

  const handleResetPassword = async () => {
    const email = emailRef.current.value;
    setIsProcessing(true);
    try {
      await dispatch(resetPasswordApi({ email, navigate }));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && isEmailValid && !isProcessing) {
      handleResetPassword();
    }
  };

  return (
    <div className={classes.resetPasswordContainer}>
      <CustomBackButton
        onClick={() =>
          navigate(
            location.state?.previousUrl ? location.state?.previousUrl : "/"
          )
        }
      />
      <div className={classes.content_wrapper}>
        <h1 className={classes.heading}>Reset password</h1>
        <p className={classes.para}>Enter your authorized email address.</p>
        <label htmlFor="email" className={classes.label}>
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={`${classes.input} ${classes.email_iput} ${
            emailError && classes.errorInput
          }`}
          placeholder="Enter email address"
          ref={emailRef}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <div className={classes.errorText_wrapper}>
          {emailError && (
            <span className={classes.errorText}>{emailError}</span>
          )}
        </div>
        <div className={classes.button_wrapper}>
          <CustomButton
            disabled={!isEmailValid || isProcessing}
            onClick={handleResetPassword}
          >
            {" "}
            {isProcessing ? <CustomSpinner /> : "Send"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
