import React, { useEffect, useState } from "react";
import classes from "./AddTeacher.module.css";
import { AddTeacherHeader } from "./AddTeacherHeader/AddTeacherHeader";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AddTeacherContact = () => {
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load data from sessionStorage or Redux store
  const initialFormData =
    JSON.parse(sessionStorage.getItem("teacherContactData")) ||
    useSelector((state) => state.teacherContact) ||
    {};

  // Use state to manage form data
  const [formData, setFormData] = useState(initialFormData);

  // Handler for field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Check if all fields are filled whenever formData changes
    const allFieldsFilled =
      formData.contact_no && formData.whatsapp_no && formData.email;

    setAllFieldsFilled(allFieldsFilled); // Update allFieldsFilled state
  }, [formData]);

  // Function to validate email
const isValidEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

 // Function to handle next button click
const handleNext = () => {
  setFormSubmitted(true); // Set formSubmitted to true when "Next" button is clicked
  if (allFieldsFilled) {
    if (isValidEmail(formData.email)) {
      sessionStorage.setItem("teacherContactData", JSON.stringify(formData));
      navigate("/addteacherfinances");
    } else {
      alert("Please enter a valid email address.");
    }
  } else {
    alert("Please fill out all required fields before proceeding.");
  }
};

  return (
    <div className={classes.addTeacherContainer}>
      <AddTeacherHeader
        backPath={"/addteacherprofile"}
        nextClick={handleNext}
      />
      <div className={classes.stepper_container}>
        <CustomStepper activeStep={2} completedSteps={[1]} />
      </div>
      <form className={classes.form} action="">
        <label htmlFor="contact_no" className={classes.label}>
          Contact number
        </label>
        <input
          type="number"
          name="contact_no"
          id="contact_no"
          className={`${classes.input} ${
            formSubmitted && !formData.contact_no && classes.errorInput
          }`}
          placeholder="Contact number"
          value={formData.contact_no}
          onChange={handleChange}
        />
        {formSubmitted && !formData.contact_no && (
          <span className={classes.warning_text}>This field is required!</span>
        )}
        <label htmlFor="whatsapp_no" className={classes.label}>
          Whatsapp number
        </label>
        <input
          type="number"
          name="whatsapp_no"
          id="whatsapp_no"
          className={`${classes.input} ${
            formSubmitted && !formData.whatsapp_no && classes.errorInput
          }`}
          placeholder="Whatsapp number"
          value={formData.whatsapp_no}
          onChange={handleChange}
        />
        {formSubmitted && !formData.whatsapp_no && (
          <span className={classes.warning_text}>This field is required!</span>
        )}
        <label htmlFor="email" className={classes.label}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={`${classes.input} ${
            formSubmitted && !formData.email && classes.errorInput 
          }`}
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {/* Error message if Email is not filled */}
      {formSubmitted && !formData.email && (
        <span className={classes.warning_text}>This field is required!</span>
      )}
      {/* Error message if Email is not valid */}
      {formSubmitted && formData.email && !isValidEmail(formData.email) && (
        <span className={classes.warning_text}>Please enter a valid email address!</span>
      )}
      </form>
    </div>
  );
};
