import React, { useEffect, useState } from "react";
import classes from "./ResetPassword.module.css";
import { CustomBackButton } from "../../../components/CustomBackButton/CustomBackButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { confirmPasswordApi } from "../../../Store/authSlice";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";

export const UpdatePassword = () => {
  const [data, setData] = useState({ password: "", confirm_password: "" });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [arePasswordsFilled, setArePasswordsFilled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const otpInstance = localStorage.getItem("otp_instance");

  useEffect(() => {
    setArePasswordsFilled(data.password !== "" && data.confirm_password !== "");
  }, [data.password, data.confirm_password]);

  const handleChangePassword = async () => {
    if (!arePasswordsFilled) {
      return;
    }

    if (data.password !== data.confirm_password) {
      setPasswordsMatch(false);
      return;
    }

    setIsProcessing(true);

    const input = {
      password: data.password,
      confirm_password: data.confirm_password,
      token: otpInstance,
    };
    try {
      await dispatch(confirmPasswordApi({ input, navigate }));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleChangePassword();
    }
  };
  return (
    <div className={classes.resetPasswordContainer}>
      <CustomBackButton onClick={() => navigate("/resetpin")} />
      <div className={classes.content_wrapper}>
        <h1 className={classes.heading}>Change password</h1>
        <p className={classes.para}>
          Set a new password and confirm the change
        </p>
        <label htmlFor="newPassword" className={classes.label}>
          New password
        </label>
        <input
          type="text"
          name="newPassword"
          id="newPassword"
          className={`${classes.input} ${classes.passwordInput}`}
          placeholder="Enter your password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          onKeyDown={handleKeyDown}
        />
        <label htmlFor="confirmPassword" className={classes.label}>
          Confirm password
        </label>
        <input
          type="text"
          name="confirmPassword"
          id="confirmPassword"
          className={`${classes.input} ${classes.passwordInput} ${
            !passwordsMatch && classes.errorInput
          }`}
          placeholder="Enter your password"
          value={data.confirm_password}
          onChange={(e) =>
            setData({ ...data, confirm_password: e.target.value })
          }
          onKeyDown={handleKeyDown}
        />
        <div className={classes.errorText_wrapper}>
          {!passwordsMatch && (
            <span className={classes.errorText}>Password didn't match</span>
          )}
        </div>
        <div className={classes.button_wrapper}>
          <CustomButton
            disabled={!arePasswordsFilled || isProcessing}
            onClick={handleChangePassword}
          >
            {isProcessing ? <CustomSpinner /> : "Save password"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
