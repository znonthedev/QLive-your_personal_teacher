import React, { useEffect, useState } from "react";
import classes from "./EditRemuneration.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import arrowBack from "../../assets/arrow_back.svg";

export const EditRemuneration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gradeNames } = location.state;
  const [updatedRemunerations, setUpdatedRemunerations] = useState(
    location.state.remunerations
  );

  const handleRemunerationChange = (index, field, value) => {
    let parsedValue;
    if (value === "") {
      // If the value is an empty string, set it directly
      parsedValue = "";
    } else {
      // Parse the input value to a number
      parsedValue = parseFloat(value);
    }

    const updatedRemunerationsCopy = [...updatedRemunerations];
    updatedRemunerationsCopy[index] = {
      ...updatedRemunerationsCopy[index],
      [field]: parsedValue,
    };
    setUpdatedRemunerations(updatedRemunerationsCopy);
  };

  // Function to handle saving the updated data
  const handleSave = () => {
    // Check if all input fields are filled
    const isValid = updatedRemunerations.every(
      (remuneration) =>
        remuneration.min_remuneration !== "" &&
        remuneration.max_remuneration !== ""
    );

    // If all input fields are filled, navigate to the editeacher page and pass the updated remuneration data
    if (isValid) {
      navigate(location.state.previousUrl, {
        state: {
          ...location.state,
          remunerations: updatedRemunerations,
        },
      });
    } else {
      alert("Please fill in all remuneration fields.");
    }
  };

  // Function to handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  // Add event listener for keydown when component mounts
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  console.log(updatedRemunerations);

  return (
    <div className={classes.editRemunerationContainer}>
      <div className={classes.header}>
        <img
          src={arrowBack}
          alt="Back"
          className={classes.backArrow}
          onClick={() =>
            navigate(location.state.previousUrl, {
              state: {
                ...location.state,
                remunerations: location.state.remunerations,
              },
            })
          }
        />
        <h1 className={classes.heading}>Edit Remuneration</h1>
        <button className={classes.saveBtn} onClick={handleSave}>
          Save
        </button>
      </div>
      <div className={classes.remunerations_container}>
        {updatedRemunerations?.map((remuneration, index) => (
          <React.Fragment key={remuneration?.grade}>
            <div className={classes.grade_card}>
              Grade: <span>{gradeNames[remuneration.grade]}</span>
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
                    remuneration.min_remuneration === "" && classes.errorInput
                  }`}
                  placeholder="Minimum"
                  value={updatedRemunerations[index].min_remuneration}
                  onChange={(e) =>
                    handleRemunerationChange(
                      index,
                      "min_remuneration",
                      e.target.value
                    )
                  }
                  onKeyDown={handleKeyDown}
                />
                {remuneration.min_remuneration === "" && (
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
                    remuneration.max_remuneration === "" && classes.errorInput
                  }`}
                  placeholder="Maximum"
                  value={updatedRemunerations[index].max_remuneration}
                  onChange={(e) =>
                    handleRemunerationChange(
                      index,
                      "max_remuneration",
                      e.target.value
                    )
                  }
                  onKeyDown={handleKeyDown}
                />
                {remuneration.max_remuneration === "" && (
                  <span className={classes.warning_text}>
                    This field is required!
                  </span>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
