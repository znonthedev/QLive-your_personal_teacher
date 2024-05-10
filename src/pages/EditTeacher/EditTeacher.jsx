import React, { useEffect, useState } from "react";
import classes from "./EditTeacher.module.css";
import arrowBack from "../../assets/arrow_back.svg";
import chevronRight from "../../assets/chevron_right.svg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { DecrementButton } from "../../components/CountButtons/DecrementButton";
import { IncrementButton } from "../../components/CountButtons/IncrementButton";
import {
  editTeacherApi,
  getGradesApi,
  getSingleTeacherApi,
  getSubjectsApi,
} from "../../Store/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { RemoveModal } from "../../components/RemoveModal/RemoveModal";
import { SetRemunerationModal } from "../../components/SetRemunerationModal/SetRemunerationModal";
import { BackDrop } from "../../components/BackDrop/BackDrop";

const INCREMENT = "increment";
const DECREMENT = "decrement";

export const EditTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const teacherId = params.id;
  const { singleTeacher } = useSelector((state) => state.admin);
  const { allSubjects, allGrades, loading } = useSelector(
    (state) => state.admin
  );

  const [data, setData] = useState({
    active: false,
    teacher_name: "",
    roll_no: "",
    qualification: "",
    experience: "",
    subject: [],
    remunerations: [],
    about: "",
    remark: "",
    video_link: "",
    contact_no: "",
    whatsapp_no: "",
    email: "",
    english_fluency: "",
    interview_rating: "",
    success_demo: 0,
    failed_demo: 0,
    teacher_change: 0,
    bank_name: "",
    bank_acc_holder_name: "",
    account_no: "",
    branch: "",
    ifsc_code: "",
    google_pay: "",
    phone_pay: "",
    available_slot: "",
    filled_slot: "",
    additional_info: ""
  });
  const [removeSubjectModal, setRemoveSubjectModal] = useState(false);
  const [removeGradeModal, setRemoveGradeModal] = useState(false);
  const [gradeIdToRemove, setGradeIdToRemove] = useState(null);
  const [subjectIdToRemove, setSubjectIdToRemove] = useState(null);
  const [addRemunerationModal, setAddRemunerationModal] = useState(false);
  const [gradeToAdd, setGradeToAdd] = useState({ id: "", name: "" });
  const [isVideoUrlValid, setIsVideoUrlValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [inputValidity, setInputValidity] = useState({
    teacher_name: true,
    roll_no: true,
    qualification: true,
    experience: true,
    about: true,
    remark: true,
    contact_no: true,
    whatsapp_no: true,
    email: true,
    english_fluency: true,
    interview_rating: true,
    bank_name: true,
    bank_acc_holder_name: true,
    account_no: true,
    branch: true,
    ifsc_code: true,
  });

  useEffect(() => {
    if (singleTeacher) {
      setData({
        active: singleTeacher?.active || false,
        teacher_name: singleTeacher.teacher_name || "",
        roll_no: singleTeacher.roll_no || "",
        qualification: singleTeacher.qualification || "",
        experience: singleTeacher.experience || "",
        subject: singleTeacher.subject || [],
        remunerations:
          location?.state?.remunerations ||
          singleTeacher?.remunerations?.map((remuneration) => ({
            grade: remuneration.grade,
            min_remuneration: parseFloat(remuneration.min_remuneration),
            max_remuneration: parseFloat(remuneration.max_remuneration),
          })) ||
          [],
        about: singleTeacher.about || "",
        remark: singleTeacher.remark || "",
        video_link: singleTeacher.video_link || "",
        contact_no: singleTeacher.contact_no || "",
        whatsapp_no: singleTeacher.whatsapp_no || "",
        email: singleTeacher.email || "",
        english_fluency: singleTeacher.english_fluency || "",
        interview_rating: singleTeacher.interview_rating || "",
        success_demo: singleTeacher.success_demo || 0,
        failed_demo: singleTeacher.failed_demo || 0,
        teacher_change: singleTeacher.teacher_change || 0,
        bank_name: singleTeacher.bank_name || "",
        bank_acc_holder_name: singleTeacher.bank_acc_holder_name || "",
        account_no: singleTeacher.account_no || "",
        branch: singleTeacher.branch || "",
        ifsc_code: singleTeacher.ifsc_code || "",
        google_pay: singleTeacher.google_pay || "",
        phone_pay: singleTeacher.phone_pay || "",
        available_slot: singleTeacher.available_slot || "",
        filled_slot: singleTeacher.filled_slot || "",
        additional_info: singleTeacher.additional_info || ""
      });
    }
  }, [singleTeacher]);

  useEffect(() => {
    dispatch(getSingleTeacherApi(teacherId));
    dispatch(getSubjectsApi());
    dispatch(getGradesApi());
  }, []);

  const handleToggleChange = () => {
    setData((prevData) => ({
      ...prevData,
      active: !prevData.active,
    }));
  };

  // Function to check if the email is valid
  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Check if the input is empty and update inputValidity state
    setInputValidity((prevValidity) => ({
      ...prevValidity,
      [name]: value.trim() !== "", // Update validity based on whether the value is empty or not
    }));

    // Check if the input field is required and validate its value
    if (name === "video_link") {
      setIsVideoUrlValid(isValidUrl(value));
    }
    // Check if the input field is the email and validate its value
    if (name === "email" && value.trim() !== "") {
      setIsEmailValid(isValidEmail(value)); // Update email validity based on the result of isValidEmail function
    }
  };

  // Handler for counter changes
  const handleCounterChange = (fieldName, action) => {
    let newValue;
    if (action === "increment") {
      newValue = data[fieldName] + 1;
    } else {
      // Prevent the count from going below 0
      newValue = Math.max(data[fieldName] - 1, 0);
    }
    setData((prevData) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };

  const handleCloseRemoveSubjectModal = (remove) => {
    if (remove) {
      // If remove is true, remove the subject from the data.subject array
      const updatedSubjects = data.subject.filter(
        (id) => id !== subjectIdToRemove
      );
      // Update the state to reflect the removed subject and close the modal
      setData((prevData) => ({
        ...prevData,
        subject: updatedSubjects,
      }));
    }
    // Close the modal in both cases
    setRemoveSubjectModal(false);
  };

  const handleSubjectChange = (e, subjectId) => {
    const { checked } = e.target;
    if (!checked && data.subject.includes(subjectId)) {
      // If the subject is included and the checkbox is being unchecked, open the modal
      setRemoveSubjectModal(true);
      // Store the subjectId to remove in state
      setSubjectIdToRemove(subjectId);
    } else {
      // If the subject is not included or the checkbox is being checked, proceed with normal handling
      setData((prevData) => ({
        ...prevData,
        subject: checked
          ? [...prevData.subject, subjectId]
          : prevData.subject.filter((id) => id !== subjectId),
      }));
    }
  };

  // Function to handle opening the remove grade modal
  const handleOpenRemoveGradeModal = (gradeId) => {
    setGradeIdToRemove(gradeId);
    setRemoveGradeModal(true);
  };

  // Function to handle closing the remove grade modal
  const handleCloseRemoveGradeModal = () => {
    setGradeIdToRemove(null);
    setRemoveGradeModal(false);
  };

  const handleOpenAddRemunerationModal = () => {
    setAddRemunerationModal(true);
  };

  const handleCloseAddRemunerationModal = () => {
    setAddRemunerationModal(false);
  };

  // Checkbox change handler for grades
  const handleGradeChange = (e, gradeId) => {
    const grade = allGrades.find((grade) => grade.id === gradeId);
    // Check if the grade is found
    if (grade) {
      setGradeToAdd({ ...gradeToAdd, id: gradeId, name: grade.name }); // Assuming you have a state variable to store the grade name
    }

    const { checked } = e.target;

    if (
      !checked &&
      data.remunerations.some((remuneration) => remuneration.grade === gradeId)
    ) {
      // If the grade is included in remunerations and the checkbox is being unchecked, open the modal
      handleOpenRemoveGradeModal(gradeId);
    } else {
      // If the grade is not included or the checkbox is being checked, proceed with normal handling
      handleOpenAddRemunerationModal();
    }
  };

  // Function to Add the grade to the remunerations array
  const handleAddRemuneration = (remunerationData) => {
    setData((prevData) => ({
      ...prevData,
      remunerations: [...prevData.remunerations, remunerationData],
    }));
    handleCloseAddRemunerationModal();
  };

  // Function to remove the grade from the remunerations array
  const handleRemoveGrade = () => {
    const updatedRemunerations = data.remunerations.filter(
      (remuneration) => remuneration.grade !== gradeIdToRemove
    );
    setData((prevData) => ({
      ...prevData,
      remunerations: updatedRemunerations,
    }));
    handleCloseRemoveGradeModal();
  };

  // Function to check if the URL is valid
  const isValidUrl = (url) => {
    // Regular expression for URL pattern
    const urlPattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/, "i");
    return urlPattern.test(url);
  };

  // Teacher Editing Function
  const handleEditTeacher = async () => {
    // Check if the video link is a valid URL
    if (data.video_link && !isValidUrl(data.video_link)) {
      alert("Please enter a valid video URL.");
      return;
    }

    // Check if the email is valid
    if (!isEmailValid) {
      alert("Please enter a valid email address.");
      return;
    }

    // Remove the check for empty input fields roll_no, bank_name, bank_acc_holder_name, account_no, branch, and ifsc_code
    const isFormValid = Object.entries(inputValidity).every(([key, valid]) => {
      // Exclude the specified fields from the validation check
      if (
        [
          "roll_no",
          "bank_name",
          "bank_acc_holder_name",
          "account_no",
          "branch",
          "ifsc_code",
          "phone_pay",
          "google_pay",
          "video_link",
          "available_slot",
          "filled_slot",
          "additional_info",
        ].includes(key)
      ) {
        return true; // Skip validation for these fields
      }
      return valid;
    });

    if (isFormValid) {
      try {
        const response = await dispatch(
          editTeacherApi({ teacherId: singleTeacher?.id, input: data })
        );
        if (response.payload !== "teachers with this roll no already exists.") {
          navigate(
            location?.state?.previousUrl
              ? location?.state?.previousUrl
              : `/teacherprofile/${teacherId}`
          );
        } else {
          console.log("something went wrong");
        }
      } catch (error) {
        console.error(error);
        alert("something went wrong");
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const errorMessage = useSelector((state) => state.admin.error);
  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  return (
    <>
      <div className={classes.editTeacherContainer}>
        <div className={classes.header}>
          <img
            src={arrowBack}
            alt="Back"
            className={classes.backArrow}
            onClick={() =>
              navigate(
                location?.state?.previousUrl
                  ? location?.state?.previousUrl
                  : `/teacherprofile/${teacherId}`
              )
            }
          />
          <h1 className={classes.heading}>Edit teacher</h1>
          <button className={classes.saveBtn} onClick={handleEditTeacher}>
            Save
          </button>
        </div>
        <div className={classes.currentStatus_container}>
          <span className={classes.currentStatus}>Current status</span>
          <div className={classes.checkbox}>
            <label className={classes.switch} htmlFor="checkbox">
              <input
                type="checkbox"
                id="checkbox"
                checked={data?.active}
                onChange={handleToggleChange}
              />
              <div className={`${classes.slider} ${classes.round}`}></div>
            </label>
          </div>
        </div>
        <div className={classes.itemLabel_wrapper}>
          <span className={classes.itemLabel}>Counters</span>
        </div>
        <div style={{ width: "100%" }}>
          <div className={classes.counter_container}>
            <div className={classes.counter_wrapper}>
              <DecrementButton
                onClick={() => handleCounterChange("success_demo", DECREMENT)}
              />
              <span className={classes.count}>{data.success_demo}</span>
              <IncrementButton
                onClick={() => handleCounterChange("success_demo", INCREMENT)}
              />
            </div>
            <span className={classes.itemLabel}>Success demo</span>
          </div>
          <div className={classes.counter_container}>
            <div className={classes.counter_wrapper}>
              <DecrementButton
                onClick={() => handleCounterChange("failed_demo", DECREMENT)}
              />
              <span className={classes.count}>{data.failed_demo}</span>
              <IncrementButton
                onClick={() => handleCounterChange("failed_demo", INCREMENT)}
              />
            </div>
            <span className={classes.itemLabel}>Failed demo</span>
          </div>{" "}
          <div className={classes.counter_container}>
            <div className={classes.counter_wrapper}>
              <DecrementButton
                onClick={() => handleCounterChange("teacher_change", DECREMENT)}
              />
              <span className={classes.count}>{data.teacher_change}</span>
              <IncrementButton
                onClick={() => handleCounterChange("teacher_change", INCREMENT)}
              />
            </div>
            <span className={classes.itemLabel}>Teacher change</span>
          </div>
        </div>
        <div className={classes.itemLabel_wrapper}>
          <span className={classes.itemLabel}>Profile</span>
        </div>
        <div className={classes.form}>
          <label htmlFor="teacher_name" className={classes.label}>
            Name
          </label>
          <input
            type="text"
            name="teacher_name"
            id="teacher_name"
            className={`${classes.input} ${!inputValidity.teacher_name && classes.errorInput
              }`}
            placeholder="Enter teacher name"
            value={data.teacher_name}
            onChange={handleInputChange}
          />
          {!inputValidity.teacher_name && (
            <span className={classes.warning_text}>
              This field is required.
            </span>
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
            value={data.roll_no}
            onChange={handleInputChange}
          />
          <label htmlFor="qualification" className={classes.label}>
            Qualification
          </label>
          <input
            type="text"
            name="qualification"
            id="qualification"
            className={`${classes.input} ${!inputValidity.qualification && classes.errorInput
              }`}
            placeholder="Enter teacher name"
            value={data.qualification}
            onChange={handleInputChange}
          />
          {!inputValidity.qualification && (
            <span className={classes.warning_text}>
              This field is required.
            </span>
          )}
          <label htmlFor="experience" className={classes.label}>
            Experience
          </label>
          <input
            type="number"
            name="experience"
            id="experience"
            className={`${classes.input} ${classes.halfInput} ${!inputValidity.experience && classes.errorInput
              }`}
            placeholder="Number of years"
            value={data.experience}
            onChange={handleInputChange}
          />
          {!inputValidity.experience && (
            <span className={classes.warning_text}>
              This field is required.
            </span>
          )}
          <label htmlFor="subject" className={classes.label}>
            Subjects
          </label>
          <span className={classes.secondLabel}>
            Select the subjects you would like to assign to the teacher.
          </span>
          <div id="subject" className={classes.subjects_wrapper}>
            {allSubjects?.map((subject) => (
              <React.Fragment key={subject?.id}>
                <input
                  type="checkbox"
                  id={subject?.id}
                  value={subject?.id}
                  className={classes.checkboxInput}
                  checked={data.subject.includes(subject.id)}
                  onChange={(e) => handleSubjectChange(e, subject.id)}
                />
                <label htmlFor={subject?.id} className={classes.checkboxLabel}>
                  {subject?.name}
                </label>
              </React.Fragment>
            ))}
          </div>
          <label htmlFor="grade" className={classes.label}>
            Grades
          </label>
          <span className={classes.secondLabel}>
            Select the Grades you would like to assign to the teacher.
          </span>
          <div id="grade" className={classes.subjects_wrapper}>
            {allGrades?.map((grade) => {
              // Check if the current grade ID exists in the remunerations array
              const isSelected = data.remunerations.some(
                (remuneration) => remuneration.grade === grade.id
              );
              return (
                <React.Fragment key={grade?.id}>
                  <input
                    type="checkbox"
                    id={`grade-${grade?.id}`}
                    value={grade?.id}
                    className={classes.checkboxInput}
                    checked={isSelected}
                    onChange={(e) => handleGradeChange(e, grade.id)}
                  />
                  <label
                    htmlFor={`grade-${grade?.id}`}
                    className={classes.checkboxLabel}
                  >
                    {grade?.name}
                  </label>
                </React.Fragment>
              );
            })}
          </div>
          {data?.remunerations && data?.remunerations.length > 0 && (
            <button
              onClick={() =>
                navigate("/edit-remuneration", {
                  state: {
                    remunerations: data?.remunerations,
                    gradeNames: allGrades.reduce((acc, curr) => {
                      if (
                        data.remunerations.some(
                          (remuneration) => remuneration.grade === curr.id
                        )
                      ) {
                        acc[curr.id] = curr.name;
                      }
                      return acc;
                    }, {}),
                    previousUrl: `/editteacher/${teacherId}`,
                  },
                })
              }
              className={classes.edit_remuneration_btn}
            >
              Edit Remuneration <img src={chevronRight} alt="Arrow" />
            </button>
          )}
          <label htmlFor="about" className={classes.label}>
            About
          </label>
          <textarea
            name="about"
            id="about"
            className={`${classes.input} ${classes.multilineInput} ${!inputValidity.about && classes.errorInput
              }`}
            placeholder="Enter a brief bio or description for the teacher"
            rows={8}
            value={data.about}
            onChange={handleInputChange}
          />
          {!inputValidity.about && (
            <span className={classes.warning_text}>
              This field is required.
            </span>
          )}
          <label htmlFor="remark" className={classes.label}>
            Remarks
          </label>
          <textarea
            name="remark"
            id="remark"
            className={`${classes.input} ${classes.multilineInput} ${!inputValidity.remark && classes.errorInput
              }`}
            placeholder="Add any additional remarks, comments, or notes here"
            rows={6}
            value={data.remark}
            onChange={handleInputChange}
          />
          {!inputValidity.remark && (
            <span className={classes.warning_text}>
              This field is required.
            </span>
          )}
          <label htmlFor="video_link" className={classes.label}>
            Demo video
          </label>
          <textarea
            name="video_link"
            id="video_link"
            className={`${classes.input} ${classes.multilineInput} ${!isVideoUrlValid && classes.errorInput
              }`}
            placeholder="Demo video link or URL"
            rows={2}
            value={data.video_link}
            onChange={handleInputChange}
          />
          {!isVideoUrlValid && (
            <span className={classes.warning_text}>
              Please enter a valid video URL.
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
                value={data.available_slot}
                onChange={handleInputChange}
              />
            </div>
            <div className={classes.halfInput}>
              <input
                type="number"
                name="filled_slot"
                id="filled_slot"
                className={`${classes.input} ${classes.filled_input}`}
                placeholder="Filled"
                value={data.filled_slot}
                onChange={handleInputChange}
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
            value={data.additional_info}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.itemLabel_wrapper}>
          <span className={classes.itemLabel}>Contact</span>
        </div>
        <form className={classes.form} action="">
          <label htmlFor="contact_no" className={classes.label}>
            Contact number
          </label>
          <input
            type="number"
            name="contact_no"
            id="contact_no"
            className={`${classes.input} ${!inputValidity.contact_no && classes.errorInput
              }`}
            placeholder="Contact number"
            value={data.contact_no}
            onChange={handleInputChange}
          />
          {!inputValidity.contact_no && (
            <span className={classes.warning_text}>
              This field is required.
            </span>
          )}
          <label htmlFor="whatsapp_no" className={classes.label}>
            Whatsapp number
          </label>
          <input
            type="number"
            name="whatsapp_no"
            id="whatsapp_no"
            className={`${classes.input} ${!inputValidity.whatsapp_no && classes.errorInput
              }`}
            placeholder="Whatsapp number"
            value={data.whatsapp_no}
            onChange={handleInputChange}
          />
          {!inputValidity.whatsapp_no && (
            <span className={classes.warning_text}>
              This field is required.
            </span>
          )}
          <label htmlFor="email" className={classes.label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`${classes.input} ${!inputValidity.email && classes.errorInput
              }`}
            placeholder="Email"
            value={data.email}
            onChange={handleInputChange}
          />
          {!inputValidity.email && (
            <span className={classes.warning_text}>
              This field is required.
            </span>
          )}
          {!isEmailValid && (
            <span className={classes.warning_text}>
              Please enter a valid email address.
            </span>
          )}
        </form>
        <div className={classes.itemLabel_wrapper}>
          <span className={classes.itemLabel}>Finances</span>
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
            value={data.bank_name}
            onChange={handleInputChange}
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
            value={data.bank_acc_holder_name}
            onChange={handleInputChange}
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
            value={data.account_no}
            onChange={handleInputChange}
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
            value={data.branch}
            onChange={handleInputChange}
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
            value={data.ifsc_code}
            onChange={handleInputChange}
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
            value={data.google_pay}
            onChange={handleInputChange}
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
            value={data.phone_pay}
            onChange={handleInputChange}
          />
        </form>
        <div className={classes.itemLabel_wrapper}>
          <span className={classes.itemLabel}>Skills</span>
        </div>
        <form className={classes.form} action="">
          <label htmlFor="english_fluency" className={classes.label}>
            English proficiency
          </label>
          <select
            name="english_fluency"
            id="english_fluency"
            className={`${classes.input} ${classes.selector}`}
            value={data.english_fluency}
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
          <label htmlFor="interview_rating" className={classes.label}>
            Interview rating
          </label>
          <select
            name="interview_rating"
            id="interview_rating"
            className={`${classes.input} ${classes.selector}`}
            value={data.interview_rating}
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
        </form>
      </div>
      {removeSubjectModal && (
        <RemoveModal
          headingText={"Are you sure you want to remove the subject?"}
          handleSubmit={() => handleCloseRemoveSubjectModal(true)}
          handleCancel={() => handleCloseRemoveSubjectModal(false)}
        />
      )}
      {removeGradeModal && (
        <RemoveModal
          headingText={"Are you sure you want to remove the Grade?"}
          handleSubmit={handleRemoveGrade}
          handleCancel={handleCloseRemoveGradeModal}
        />
      )}
      {addRemunerationModal && (
        <SetRemunerationModal
          gradeId={gradeToAdd?.id}
          headingText={`Set remuneration for grade ${gradeToAdd?.name}.`}
          handleAddRemuneration={handleAddRemuneration}
          handleCancel={handleCloseAddRemunerationModal}
        />
      )}
      {loading && <BackDrop />}
    </>
  );
};
