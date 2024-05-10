import React, { useEffect, useState } from "react";
import classes from "./DownloadImage.module.css";

export const SetAmountModal = ({
  gradeId,
  grades,
  handleSubmit,
  handleCancel,
}) => {
  useEffect(() => {
    document.body.classList.add(classes.bodyModalOpen);
    return () => {
      document.body.classList.remove(classes.bodyModalOpen);
    };
  }, []);

  const [maxRemunerationValue, setMaxRemunerationValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const getGradeById = () => {
    return grades.find((grade) => grade.grade === parseInt(gradeId));
  };
  const grade = getGradeById();
  const maxRemuneration = parseFloat(grade?.max_remuneration);
  const doubleMaxRemuneration = maxRemuneration * 2;

  useEffect(() => {
    setMaxRemunerationValue(doubleMaxRemuneration);
  }, [doubleMaxRemuneration]);

  const handleInputChange = (e) => {
    setMaxRemunerationValue(e.target.value);
  };

  const validateAndSubmit = () => {
    const trimmedValue = maxRemunerationValue.toString().trim();
    if (trimmedValue === "") {
      setShowAlert(true);
      alert("Please enter a value.");
    } else {
      handleSubmit(maxRemunerationValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      validateAndSubmit();
    }
  };

  return (
    <div className={classes.modalContainer}>
      <div className={classes.modal}>
        <label htmlFor="amount" className={classes.label}>
          Set amount
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          className={`${classes.input} ${showAlert && classes.errorInput}`}
          placeholder="Enter amount"
          value={maxRemunerationValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        {showAlert && (
          <span className={classes.warning_text}>Please enter a value.</span>
        )}
        <div className={classes.actions}>
          <button className={classes.action_btn} onClick={handleCancel}>
            Cancel
          </button>
          <button
            className={`${classes.action_btn} ${classes.submit_btn}`}
            onClick={validateAndSubmit}
          >
            Downlaod
          </button>
        </div>
      </div>
      <div className={classes.modal_closer} onClick={handleCancel}></div>
    </div>
  );
};
