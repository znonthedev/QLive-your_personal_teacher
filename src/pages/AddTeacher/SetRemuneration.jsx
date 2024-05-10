import React, { useEffect, useState } from "react";
import classes from "./AddTeacher.module.css";
import { AddTeacherHeader } from "./AddTeacherHeader/AddTeacherHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTeacherApi } from "../../Store/adminSlice";
import { BackDrop } from "../../components/BackDrop/BackDrop";

export const SetRemuneration = () => {
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.admin);

  const formDataFromSessionStorage = JSON.parse(
    sessionStorage.getItem("teacherProfileData")
  );

  const [remunerations, setRemunerations] = useState(
    formDataFromSessionStorage?.grades.map((grade) => ({
      grade: grade.id,
      min_remuneration: null,
      max_remuneration: null,
    })) || []
  );

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRemunerations = [...remunerations];
    updatedRemunerations[index][name] = value;
    setRemunerations(updatedRemunerations);

    // Check if all fields are filled
    const allFilled = updatedRemunerations.every(
      (remuneration) =>
        remuneration.min_remuneration !== null &&
        remuneration.max_remuneration !== null
    );
    setAllFieldsFilled(allFilled);
  };

  const handleFinish = () => {
    setFormSubmitted(true);
    if (allFieldsFilled) {
      const teacherData = {
        ...JSON.parse(sessionStorage.getItem("teacherProfileData")),
        ...JSON.parse(sessionStorage.getItem("teacherContactData")),
        ...JSON.parse(sessionStorage.getItem("teacherFinanceData")),
        ...JSON.parse(sessionStorage.getItem("teacherSkillData")),
        remunerations,
      };

      dispatch(createTeacherApi({ teacherData, navigate }));
    } else {
      alert("Please fill in all fields before finishing.");
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
      <div className={`${classes.addTeacherContainer} ${classes.remunerationContainer}`}>
        <AddTeacherHeader
          title={"Set Remuneration"}
          backPath={"/addteacherskills"}
          handleFinish={handleFinish}
        />
        <form className={classes.form} action="">
          <span className={`${classes.counterLabel} ${classes.paraText}`}>
            Before finishing setup set minimum and maximum remuneration of the
            teacher for assigned grades.
          </span>
          {formDataFromSessionStorage?.grades.map((grade, index) => (
            <React.Fragment key={grade?.id}>
              <div className={classes.grade_card}>
                Grade: <span>{grade?.name}</span>
              </div>
              <label htmlFor="remuneration" className={classes.label}>
                Remuneration
              </label>
              <div id="remuneration" className={classes.inputs_wrapper}>
                <div className={classes.halfInput}>
                  <input
                    type="number"
                    name="min_remuneration"
                    id={`min_remuneration_${index}`}
                    className={`${classes.input} ${
                      formSubmitted &&
                      remunerations[index]?.min_remuneration === null &&
                      classes.errorInput
                    }`}
                    placeholder="Minimum"
                    value={remunerations[index]?.min_remuneration || ""}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                  {formSubmitted &&
                    remunerations[index]?.min_remuneration === null && (
                      <span className={classes.warning_text}>
                        This field is required!
                      </span>
                    )}
                </div>
                <div className={classes.halfInput}>
                  <input
                    type="number"
                    name="max_remuneration"
                    id={`max_remuneration_${index}`}
                    className={`${classes.input} ${
                      formSubmitted &&
                      remunerations[index]?.max_remuneration === null &&
                      classes.errorInput
                    }`}
                    placeholder="Maximum"
                    value={remunerations[index]?.max_remuneration || ""}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                  {formSubmitted &&
                    remunerations[index]?.max_remuneration === null && (
                      <span className={classes.warning_text}>
                        This field is required!
                      </span>
                    )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </form>
      </div>
      {loading && <BackDrop />}
    </>
  );
};
