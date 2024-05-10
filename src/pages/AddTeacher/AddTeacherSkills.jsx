import React, { useEffect, useState } from "react";
import classes from "./AddTeacher.module.css";
import { AddTeacherHeader } from "./AddTeacherHeader/AddTeacherHeader";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import { IncrementButton } from "../../components/CountButtons/IncrementButton";
import { DecrementButton } from "../../components/CountButtons/DecrementButton";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const INCREMENT = "increment";
const DECREMENT = "decrement";

export const AddTeacherSkills = () => {
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load data from sessionStorage or Redux store
  const initialFormData =
    JSON.parse(sessionStorage.getItem("teacherSkillData")) ||
    useSelector((state) => state.teacherSkill) ||
    {};

  // Use state to manage form data
  const [formData, setFormData] = useState(initialFormData);

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

// Handler for counter changes
const handleCounterChange = (fieldName, action) => {
  let newValue;
  if (action === "increment") {
    newValue = formData[fieldName] + 1;
  } else {
    // Prevent the count from going below 0
    newValue = Math.max(formData[fieldName] - 1, 0);
  }
  setFormData((prevData) => ({
    ...prevData,
    [fieldName]: newValue,
  }));
};

  useEffect(() => {
    // Check if all fields are filled whenever formData changes
    const allFieldsFilled =
      formData.english_fluency && formData.interview_rating;

    setAllFieldsFilled(allFieldsFilled); // Update allFieldsFilled state
  }, [formData]);

  // Function to navigate to the next page if all required fields are filled
  const handleNext = () => {
    setFormSubmitted(true); // Set formSubmitted to true when "Next" button is clicked
    if (allFieldsFilled) {
      sessionStorage.setItem("teacherSkillData", JSON.stringify(formData));
      navigate("/setremuneration");
    } else {
      alert("Please fill out all required fields before proceeding.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.addTeacherContainer}>
      <AddTeacherHeader
        backPath={"/addteacherfinances"}
        nextClick={handleNext}
      />
      <div className={classes.stepper_container}>
        <CustomStepper activeStep={4} completedSteps={[1, 2, 3]} />
      </div>
      <form className={classes.form} action="">
        <label htmlFor="english_fluency" className={classes.label}>
          English proficiency
        </label>
        <select
          name="english_fluency"
          id="english_fluency"
          className={`${classes.input} ${classes.selector} ${
            formSubmitted && !formData.interview_rating && classes.errorInput
          }`}
          value={formData.english_fluency}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            English proficiency
          </option>
          <option value="100%">100%</option>
          <option value="90%">90%</option>
          <option value="80%">80%</option>
          <option value="Below 80%">Below 80%</option>
        </select>
        {formSubmitted && !formData.english_fluency && (
          <span className={classes.warning_text}>This field is required!</span>
        )}
        <label htmlFor="interview_rating" className={classes.label}>
          Interview rating
        </label>
        <select
          name="interview_rating"
          id="interview_rating"
          className={`${classes.input} ${classes.selector} ${
            formSubmitted && !formData.interview_rating && classes.errorInput
          }`}
          value={formData.interview_rating}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Interview rating
          </option>
          <option value="100%">100%</option>
          <option value="90%">90%</option>
          <option value="80%">80%</option>
          <option value="Below 80%">Below 80%</option>
        </select>
        {formSubmitted && !formData.interview_rating && (
          <span className={classes.warning_text}>This field is required!</span>
        )}
      </form>
      <div className={classes.counterLabel_wrapper}>
        <span className={classes.counterLabel}>Counters</span>
      </div>
      <div className={classes.counter_container}>
        <div className={classes.counter_wrapper}>
          <DecrementButton
            onClick={() => handleCounterChange("success_demo", DECREMENT)}
          />
          <span className={classes.count}>{formData.success_demo}</span>
          <IncrementButton
            onClick={() => handleCounterChange("success_demo", INCREMENT)}
          />
        </div>
        <span className={classes.counterLabel}>Success demo</span>
      </div>
      <div className={classes.counter_container}>
        <div className={classes.counter_wrapper}>
          <DecrementButton
            onClick={() => handleCounterChange("failed_demo", DECREMENT)}
          />
          <span className={classes.count}>{formData.failed_demo}</span>
          <IncrementButton
            onClick={() => handleCounterChange("failed_demo", INCREMENT)}
          />
        </div>
        <span className={classes.counterLabel}>Failed demo</span>
      </div>{" "}
      <div className={classes.counter_container}>
        <div className={classes.counter_wrapper}>
          <DecrementButton
            onClick={() => handleCounterChange("teacher_change", DECREMENT)}
          />
          <span className={classes.count}>{formData.teacher_change}</span>
          <IncrementButton
            onClick={() => handleCounterChange("teacher_change", INCREMENT)}
          />
        </div>
        <span className={classes.counterLabel}>Teacher change</span>
      </div>
    </div>
  );
};
