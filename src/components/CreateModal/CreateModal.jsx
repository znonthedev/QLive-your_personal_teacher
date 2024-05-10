import React, { useState } from "react";
import classes from "./CreateModal.module.css";

export const CreateModal = ({
  heading,
  labelText,
  defaultValue,
  handleCreate,
  handleCancel,
}) => {
  const [data, setData] = useState(defaultValue ? defaultValue : "");

  const handleSubmit = () => {
    handleCreate(data);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className={classes.createSubjectContainer}>
      <div className={classes.card}>
        <h1 className={classes.heading}>{heading}</h1>
        <label htmlFor={labelText} className={classes.label}>
          {labelText}
        </label>
        <input
          type="text"
          name={labelText}
          id={labelText}
          className={classes.input}
          placeholder={labelText}
          value={data}
          onChange={(e) => setData(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className={classes.actions}>
          <button className={classes.action_btn} onClick={handleCancel}>
            Cancel
          </button>
          <button
            style={{ color: "#2E5980" }}
            className={classes.action_btn}
            onClick={handleSubmit}
          >
            {defaultValue ? "Edit" : "Create"}
          </button>
        </div>
      </div>
      <div className={classes.modal_closer} onClick={handleCancel}></div>
    </div>
  );
};
