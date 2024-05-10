import React from "react";
import classes from "./CustomStepper.module.css";
import tick from "../../assets/white-tick.svg";

function CustomStepper({ activeStep, completedSteps }) {
  const steps = [
    { label: "Profile", isCompleted: completedSteps.includes(1) },
    { label: "Contact", isCompleted: completedSteps.includes(2) },
    { label: "Finances", isCompleted: completedSteps.includes(3) },
    { label: "Skills", isCompleted: completedSteps.includes(4) },
  ];

  return (
    <div className={classes.stepper}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`${classes.round} ${
              step.isCompleted ? classes.isCompleted : ""
            } ${activeStep === index + 1 ? classes.isRoundActive : ""} ${
              activeStep === index + 1 ? classes.isActive : ""
            }`}
          >
            {step.isCompleted && (
              <img src={tick} alt="" className={classes.tick} />
            )}
            {activeStep === index + 1 && !step.isCompleted && (
              <div className={classes.dot}></div>
            )}
            <span className={classes.label}>{step.label}</span>
          </div>
          {index !== steps.length - 1 && (
            <div
              className={`${classes.line} ${
                index < activeStep - 1 ? classes.isLineActive : ""
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default CustomStepper;
