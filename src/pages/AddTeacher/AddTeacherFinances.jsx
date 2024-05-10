import React, { useEffect, useState } from "react";
import classes from "./AddTeacher.module.css";
import { AddTeacherHeader } from "./AddTeacherHeader/AddTeacherHeader";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AddTeacherFinances = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  // Load data from sessionStorage or Redux store
  const initialFormData =
    JSON.parse(sessionStorage.getItem("teacherFinanceData")) ||
    useSelector((state) => state.teacherFinance) ||
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

  // Function to navigate to the next page
  const handleNext = () => {
    setFormSubmitted(true); // Set formSubmitted to true when "Next" button is clicked
    sessionStorage.setItem("teacherFinanceData", JSON.stringify(formData));
    navigate("/addteacherskills");
  };

  return (
    <div className={classes.addTeacherContainer}>
      <AddTeacherHeader
        backPath={"/addteachercontact"}
        nextClick={handleNext}
      />
      <div className={classes.stepper_container}>
        <CustomStepper activeStep={3} completedSteps={[1, 2]} />
      </div>
      <form className={classes.form} action="">
        <label htmlFor="bank_name" className={classes.label}>
          Bank name
        </label>
        <input
          type="text"
          name="bank_name"
          id="bank_name"
          className={classes.input}
          placeholder="Bank name"
          value={formData.bank_name}
          onChange={handleChange}
        />
        <label htmlFor="bank_acc_holder_name" className={classes.label}>
          Account holder
        </label>
        <input
          type="text"
          name="bank_acc_holder_name"
          id="bank_acc_holder_name"
          className={classes.input}
          placeholder="Account holder"
          value={formData.bank_acc_holder_name}
          onChange={handleChange}
        />
        <label htmlFor="account_no" className={classes.label}>
          Account number
        </label>
        <input
          type="number"
          name="account_no"
          id="account_no"
          className={classes.input}
          placeholder="Account number"
          value={formData.account_no}
          onChange={handleChange}
        />
        <label htmlFor="branch" className={classes.label}>
          Branch
        </label>
        <input
          type="text"
          name="branch"
          id="branch"
          className={classes.input}
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
        />
        <label htmlFor="ifsc_code" className={classes.label}>
          IFSC
        </label>
        <input
          type="text"
          name="ifsc_code"
          id="ifsc_code"
          className={classes.input}
          placeholder="IFSC code"
          value={formData.ifsc_code}
          onChange={handleChange}
        />
        <label htmlFor="google_pay" className={classes.label}>
          Gpay number
        </label>
        <input
          type="number"
          name="google_pay"
          id="google_pay"
          className={classes.input}
          placeholder="Gpay number"
          value={formData.google_pay}
          onChange={handleChange}
        />
        <label htmlFor="phone_pay" className={classes.label}>
          PhonePe number
        </label>
        <input
          type="number"
          name="phone_pay"
          id="phone_pay"
          className={classes.input}
          placeholder="PhonePe number"
          value={formData.phone_pay}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
