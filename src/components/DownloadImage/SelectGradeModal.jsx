import React, { useEffect, useState } from "react";
import classes from "./DownloadImage.module.css";

export const SelectGradeModal = ({
  selectedGrade,
  grades,
  handleSubmit,
  handleCancel,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    selectedGrade ? selectedGrade : ""
  );
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    document.body.classList.add(classes.bodyModalOpen);
    return () => {
      document.body.classList.remove(classes.bodyModalOpen);
    };
  }, []);

  const handleNext = () => {
    setSubmited(true);
    if (selectedOption) {
      handleSubmit(selectedOption);
    } else {
      alert("please Select a grade");
    }
  };

  return (
    <div className={classes.modalContainer}>
      <div className={classes.modal}>
        <label htmlFor="grade" className={classes.label}>
          Select grade
        </label>
        {grades && grades.length > 0 ? (
          <>
            <select
              name="grade"
              id="grade"
              className={`${classes.input} ${classes.selector} ${
                submited && !selectedOption && classes.errorInput
              }`}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              {grades?.map((grade) => (
                <option key={grade?.grade} value={grade?.grade}>
                  {grade?.grade_name}
                </option>
              ))}
            </select>

            {submited && !selectedOption && (
              <span className={classes.warning_text}>Select a Grade!</span>
            )}
          </>
        ) : (
          <span className={classes.notfound_text}>No grades found</span>
        )}
        <div className={classes.actions}>
          <button className={classes.action_btn} onClick={handleCancel}>
            Cancel
          </button>
          {grades && grades.length > 0 && (
            <button
              className={`${classes.action_btn} ${classes.submit_btn}`}
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className={classes.modal_closer} onClick={handleCancel}></div>
    </div>
  );
};
