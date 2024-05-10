import React, { useState } from "react";
import classes from "./ResetPassword.module.css";
import { CustomBackButton } from "../../../components/CustomBackButton/CustomBackButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPinApi } from "../../../Store/authSlice";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";

export const ResetPin = () => {
  const [pincode, setPincode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const otpInstance = localStorage.getItem("otp_instance");
  const otpError = useSelector((state) => state.auth.error);

  const handleInputChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const newValue = value.substring(0, 4);
    setPincode(newValue);
  };

  const isPincodeValid = pincode.length === 4;

  const handleOtp = async () => {
    const input = {
      otp: pincode,
      token: otpInstance,
    };
    setIsProcessing(true);
    try {
      await dispatch(resetPinApi({ input, navigate }));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && isPincodeValid) {
      handleOtp();
    }
  };

  return (
    <div className={classes.resetPasswordContainer}>
      <CustomBackButton onClick={() => navigate("/resetpassword")} />
      <div className={classes.content_wrapper}>
        <h1 className={classes.heading}>Reset PIN sent successfully </h1>
        <p className={classes.para}>
          We’ve mailed you a 4 digit pin at associated email address
          <span> info@qlivelearn.in</span>
        </p>
        <label htmlFor="pincode" className={classes.picode_label}>
          Enter the 4 digit pin here.
        </label>
        <input
          type="number"
          name="pincode"
          id="pincode"
          className={`${classes.input} ${classes.pincode_input} ${otpError && classes.errorInput}`}
          value={pincode}
          onChange={handleInputChange}
          maxLength={4}
          onKeyDown={handleKeyDown}
        />
        <div className={classes.errorText_wrapper}>
          {otpError && (
            <span className={classes.errorText}>
              {otpError && "Invalid OTP. Please try again."}
            </span>
          )}
        </div>
        <div className={classes.button_wrapper}>
          <CustomButton
            disabled={!isPincodeValid || isProcessing}
            onClick={handleOtp}
          >
            {isProcessing ? <CustomSpinner /> : "Reset password"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
