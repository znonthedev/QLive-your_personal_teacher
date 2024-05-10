import React, { useState } from "react";
import classes from "./SetRemunerationModal.module.css";

export const SetRemunerationModal = ({
  gradeId,
  headingText,
  handleAddRemuneration,
  handleCancel,
}) => {
  const [minRemuneration, setMinRemuneration] = useState("");
  const [maxRemuneration, setMaxRemuneration] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleMinRemunerationChange = (e) => {
    setMinRemuneration(e.target.value);
  };

  const handleMaxRemunerationChange = (e) => {
    setMaxRemuneration(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSetNow();
    }
  };

  const handleSetNow = () => {
    setFormSubmitted(true);
    if (minRemuneration && maxRemuneration) {
        handleAddRemuneration({
            grade: gradeId,
            min_remuneration: parseFloat(minRemuneration),
            max_remuneration: parseFloat(maxRemuneration),
          });
    } else {
      alert("Both minimum and maximum remuneration fields are required.");
    }
  };

  return (
    <div className={classes.modalContainer}>
      <div className={classes.modal}>
        <h1 className={classes.heading}>{headingText}</h1>
        <label htmlFor="remuneration" className={classes.label}>
          Remuneration
        </label>
        <div id="remuneration" className={classes.inputs_wrapper}>
          <div className={classes.halfInput}>
            <input
              type="number"
              name="min_remuneration"
              id={`min_remuneration_`}
              className={`${classes.input} ${formSubmitted && !minRemuneration && classes.errorInput}`}
              placeholder="Minimum"
              value={minRemuneration}
              onChange={handleMinRemunerationChange}
              onKeyDown={handleKeyDown}
            />
            {formSubmitted && !minRemuneration && (
              <span className={classes.warning_text}>
                This field is required!
              </span>
            )}
          </div>
          <div className={classes.halfInput}>
            <input
              type="number"
              name="max_remuneration"
              id={`max_remuneration_`}
              className={`${classes.input} ${formSubmitted && !maxRemuneration && classes.errorInput}`}
              placeholder="Maximum"
              value={maxRemuneration}
              onChange={handleMaxRemunerationChange}
              onKeyDown={handleKeyDown}
            />
            {formSubmitted && !maxRemuneration && (
              <span className={classes.warning_text}>
                This field is required!
              </span>
            )}
          </div>
        </div>
        <div className={classes.actions}>
          <button className={classes.action_btn} onClick={handleCancel}>
            Cancel
          </button>
          <button
            className={`${classes.action_btn} ${classes.submit_btn}`}
            onClick={handleSetNow}
          >
            Set now
          </button>
        </div>
      </div>
      <div className={classes.modal_closer} onClick={handleCancel}></div>
    </div>
  );
};
