import React, { useEffect, useState } from "react";
import classes from "./AddTeacher.module.css";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import { AddTeacherHeader } from "./AddTeacherHeader/AddTeacherHeader";
import { useDispatch, useSelector } from "react-redux";
import { getGradesApi, getSubjectsApi } from "../../Store/adminSlice";
import { useNavigate } from "react-router-dom";

export const AddTeacherProfile = () => {
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [videoLinkValid, setVideoLinkValid] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allSubjects, allGrades } = useSelector((state) => state.admin);

  // Load data from sessionStorage or Redux store
  const initialFormData =
    JSON.parse(sessionStorage.getItem("teacherProfileData")) ||
    useSelector((state) => state.teacherProfile) ||
    {};

  // Use state to manage form data
  const [formData, setFormData] = useState(initialFormData);

  // Update field handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update grades handler
  const handleGradeChange = (grade) => {
    const updatedGrades = [...formData.grades];
    const index = updatedGrades.findIndex((g) => g.id === grade.id);
    if (index === -1) {
      updatedGrades.push(grade);
    } else {
      updatedGrades.splice(index, 1);
    }
    setFormData((prevData) => ({
      ...prevData,
      grades: updatedGrades,
    }));
  };

  // Update subjects handler
  const handleSubjectChange = (subjectId) => {
    const updatedSubjects = [...formData.subject];
    const index = updatedSubjects.indexOf(subjectId);
    if (index === -1) {
      updatedSubjects.push(subjectId);
    } else {
      updatedSubjects.splice(index, 1);
    }
    setFormData((prevData) => ({
      ...prevData,
      subject: updatedSubjects,
    }));
  };

  useEffect(() => {
    dispatch(getSubjectsApi());
    dispatch(getGradesApi());
  }, []);

  useEffect(() => {
    // Check if all fields are filled whenever formData changes
    const allFieldsFilled =
      formData.teacher_name &&
      formData.qualification &&
      formData.experience &&
      formData.subject.length > 0 &&
      formData.grades.length > 0 &&
      formData.about &&
      formData.remark;

    setAllFieldsFilled(allFieldsFilled); // Update allFieldsFilled state
  }, [formData]);

  // Function to validate URL
  const isValidUrl = (url) => {
    const pattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    return pattern.test(url);
  };

  // Function to handle Next button click
  const handleNext = () => {
    setFormSubmitted(true); // Set formSubmitted to true when "Next" button is clicked

    // Check if video_link is a valid URL only if it has a value
    if (formData.video_link.trim() !== "") {
      if (!isValidUrl(formData.video_link)) {
        // If the URL is not valid, set an error and display alert
        setVideoLinkValid(false);
        alert("Please enter a valid URL for the demo video.");
        return; // Exit the function early if URL is not valid
      }
    }

    // Proceed to next page if all required fields are filled
    if (allFieldsFilled) {
      sessionStorage.setItem("teacherProfileData", JSON.stringify(formData));
      navigate("/addteachercontact");
    } else {
      alert("Please fill out all required fields before proceeding.");
    }
  };

  return (
    <div className={classes.addTeacherContainer}>
      <AddTeacherHeader backPath={"/teachers"} nextClick={handleNext} />
      <div className={classes.stepper_container}>
        <CustomStepper activeStep={1} completedSteps={[]} />
      </div>
      <form className={classes.form} action="">
        <label htmlFor="teacher_name" className={classes.label}>
          Name
        </label>
        <input
          type="text"
          name="teacher_name"
          id="teacher_name"
          className={`${classes.input} ${
            formSubmitted && !formData.teacher_name && classes.errorInput
          }`}
          placeholder="Enter teacher name"
          value={formData.teacher_name}
          onChange={handleChange}
        />
        {formSubmitted && !formData.teacher_name && (
          <span className={classes.warning_text}>This field is required!</span>
        )}
        <label htmlFor="roll_no" className={classes.label}>
          Roll number
        </label>
        <input
          type="number"
          name="roll_no"
          id="roll_no"
          className={`${classes.input} ${classes.halfInput}`}
          placeholder="Teacher roll number"
          value={formData.roll_no}
          onChange={handleChange}
        />
        <label htmlFor="qualification" className={classes.label}>
          Qualification
        </label>
        <input
          type="text"
          name="qualification"
          id="qualification"
          className={`${classes.input} ${
            formSubmitted && !formData.qualification && classes.errorInput
          }`}
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
        />
        {formSubmitted && !formData.qualification && (
          <span className={classes.warning_text}>This field is required!</span>
        )}
        <label htmlFor="experience" className={classes.label}>
          Experience
        </label>
        <input
          type="number"
          name="experience"
          id="experience"
          className={`${classes.input} ${classes.halfInput} ${
            formSubmitted && !formData.experience && classes.errorInput
          }`}
          placeholder="Number of years"
          value={formData.experience}
          onChange={handleChange}
        />
        {formSubmitted && !formData.experience && (
          <span className={classes.warning_text}>This field is required!</span>
        )}
        <label htmlFor="subjects" className={classes.label}>
          Subjects
        </label>
        <span className={classes.secondLabel}>
          Select the subjects you would like to assign to the teacher.
        </span>
        <div id="subjects" className={classes.subjects_wrapper}>
          {allSubjects.map((subject) => (
            <React.Fragment key={subject?.id}>
              <input
                type="checkbox"
                id={`subject-${subject?.id}`}
                className={classes.checkboxInput}
                onChange={() => handleSubjectChange(subject.id)}
                checked={formData.subject.includes(subject.id)}
              />
              <label
                htmlFor={`subject-${subject?.id}`}
                className={classes.checkboxLabel}
              >
                {subject?.name}
              </label>
            </React.Fragment>
          ))}
        </div>
        {formSubmitted && formData.subject.length === 0 && (
          <span className={classes.warning_text}>
            Please select at least one subject!
          </span>
        )}

        <label htmlFor="grades" className={classes.label}>
          Grades
        </label>
        <span className={classes.secondLabel}>
          Select the Grades you would like to assign to the teacher.
        </span>
        <div className={classes.subjects_wrapper}>
          {allGrades.map((grade) => (
            <React.Fragment key={grade?.id}>
              <input
                type="checkbox"
                id={`grade-${grade?.id}`}
                className={classes.checkboxInput}
                onChange={() => handleGradeChange(grade)}
                checked={formData.grades.some((g) => g.id === grade.id)}
              />
              <label
                htmlFor={`grade-${grade?.id}`}
                className={classes.checkboxLabel}
              >
                {grade?.name}
              </label>
            </React.Fragment>
          ))}
        </div>
        {formSubmitted && formData.grades.length === 0 && (
          <span className={classes.warning_text}>
            Please select at least one grade!
          </span>
        )}
        <label htmlFor="about" className={classes.label}>
          About
        </label>
        <textarea
          name="about"
          id="about"
          className={`${classes.input} ${classes.multilineInput} ${
            formSubmitted && !formData.about && classes.errorInput
          }`}
          placeholder="Enter a brief bio or description for the teacher"
          rows={8}
          value={formData.about}
          onChange={handleChange}
        />
        {formSubmitted && !formData.about && (
          <span className={classes.warning_text}>This field is required!</span>
        )}
        <label htmlFor="remark" className={classes.label}>
          Remarks
        </label>
        <textarea
          name="remark"
          id="remark"
          className={`${classes.input} ${classes.multilineInput} ${
            formSubmitted && !formData.remark && classes.errorInput
          }`}
          placeholder="Add any additional remarks, comments, or notes here"
          rows={6}
          value={formData.remark}
          onChange={handleChange}
        />
        {formSubmitted && !formData.remark && (
          <span className={classes.warning_text}>This field is required!</span>
        )}
        <label htmlFor="video_link" className={classes.label}>
          Demo video
        </label>
        <textarea
          name="video_link"
          id="video_link"
          className={`${classes.input} ${classes.multilineInput} ${
            formSubmitted && !videoLinkValid && classes.errorInput
          }`}
          placeholder="Demo video link or URL"
          rows={2}
          value={formData.video_link}
          onChange={handleChange}
        />
        {formSubmitted && !videoLinkValid && (
          <span className={classes.warning_text}>
            Please enter a valid URL for the demo video.
          </span>
        )}
        <label htmlFor="slots" className={classes.label}>
          Slots
        </label>
        <div id="slots" className={classes.inputs_wrapper}>
          <div className={classes.halfInput}>
            <input
              type="number"
              name="available_slot"
              id="available_slot"
              className={`${classes.input} ${classes.available_input}`}
              placeholder="Available"
              value={formData.available_slot}
              onChange={handleChange}
            />
          </div>
          <div className={classes.halfInput}>
            <input
              type="number"
              name="filled_slot"
              id="filled_slot"
              className={`${classes.input} ${classes.filled_input}`}
              placeholder="Filled"
              value={formData.filled_slot}
              onChange={handleChange}
            />
          </div>
        </div>
        <label htmlFor="additionalInfo" className={classes.label}>
          Additional Info
        </label>
        <textarea
          name="additional_info"
          id="additional_info"
          className={`${classes.input} ${classes.multilineInput} `}
          placeholder="Additional details of students under this teacher: Roll number, student name, grade..."
          rows={8}
          value={formData.additional_info}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
