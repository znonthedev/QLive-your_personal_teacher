import React from "react";
import classes from "./GeneratedImage.module.css";
import avatar from "../../../assets/generated-avatar.png";
import { RatingStar } from "../../RatingStar";

export const GeneratedImage = ({
  forwardedRef,
  teacherName,
  about,
  experience,
  englishProficiency,
  qualification,
  rating,
  amount,
}) => {
  return (
    <div className={classes.generatedImageContainer_wrapper}>
      <div ref={forwardedRef} className={classes.generatedImageContainer}>
        <div className={classes.first_section}>
          <img src={avatar} alt="" className={classes.avatar} />
          <div className={classes.details_container}>
            <div className={classes.details_wrapper}>
              <label htmlFor="name" className={classes.label}>
                Name
              </label>
              <h2 id="name" className={classes.name_text}>
                {teacherName}
              </h2>
            </div>
            <div className={classes.details_wrapper}>
              <label htmlFor="qualification" className={classes.label}>
                Qualification
              </label>
              <h2 id="qualification" className={classes.name_text}>
                {qualification}
              </h2>
            </div>
          </div>
        </div>
        <div className={classes.second_section}>
          <div className={classes.experience_container}>
            <h3 className={classes.value_text}>{experience}</h3>
            <p className={classes.second_label}>
              Years of <br /> Experience
            </p>
          </div>
          <div className={classes.experience_container}>
            <h3 className={classes.value_text}>{englishProficiency}</h3>
            <p className={classes.second_label}>
              English <br /> Proficiency
            </p>
          </div>
        </div>
        <div className={classes.third_section}>
          <p className={classes.description}>{about}</p>
        </div>
        <div className={classes.fourth_section}>
          <div className={classes.price_container}>
            <label
              htmlFor="amount"
              className={`${classes.second_label} ${classes.price_label}`}
            >
              Amount :
            </label>
            <h6 id="amount" className={classes.price}>
              <span>₹</span>
              {parseInt(amount) + 30}
            </h6>
          </div>
          <div className={classes.price_container}>
            <label
              htmlFor="offer"
              className={`${classes.second_label} ${classes.price_label} ${classes.redText}`}
            >
              Special offer :
            </label>
            <h6 id="offer" className={`${classes.price} ${classes.redText}`}>
              <span>₹</span> {parseInt(amount)}
            </h6>
          </div>
        </div>
        <div className={classes.fourth_details_wrapper}>
          <div className={classes.fourth_details_container}>
            <label
              htmlFor="structure"
              className={`${classes.second_label} ${classes.third_label}`}
            >
              Payment Structure:
            </label>
            <div id="structure" className={classes.secondary_container}>
              <label
                htmlFor="hourly"
                className={`${classes.second_label} ${classes.secondary_label}`}
              >
                Hourly Rate:
              </label>
              <h6
                id="hourly"
                className={`${classes.price} ${classes.secondary_text}`}
              >
                <span>₹</span> {parseInt(amount)}
              </h6>
            </div>
          </div>

          <div className={classes.fourth_details_container}>
            <label
              htmlFor="frequency"
              className={`${classes.second_label} ${classes.third_label}`}
            >
              Class Frequency:
            </label>
            <div id="frequency" className={classes.secondary_container}>
              <label
                htmlFor="weekly"
                className={`${classes.second_label} ${classes.secondary_label}`}
              >
                Weekly:
              </label>
              <h6
                id="weekly"
                className={`${classes.price} ${classes.secondary_text}`}
              >
                2 classes per subject
              </h6>
            </div>
            <div id="frequency" className={classes.secondary_container}>
              <label
                htmlFor="monthly"
                className={`${classes.second_label} ${classes.secondary_label}`}
              >
                Monthly:
              </label>
              <h6
                id="monthly"
                className={`${classes.price} ${classes.secondary_text}`}
              >
                8 classes per subject
              </h6>
            </div>
          </div>
          <div className={classes.fourth_details_container}>
            <label
              htmlFor="monthly_payment"
              className={`${classes.second_label} ${classes.third_label}`}
            >
              Monthly Payment (One Subject):
            </label>
            <div id="classes" className={classes.secondary_container}>
              <label
                htmlFor="classes"
                className={`${classes.second_label} ${classes.secondary_label} ${classes.redText}`}
              >
                8 classes × {parseInt(amount)} =
              </label>
              <h6
                id="weekly"
                className={`${classes.total_price} ${classes.redText}`}
              >
                {parseInt(amount) * 8}/- Indian Rupee
              </h6>
            </div>
            <p className={classes.time_label}>*Each class is one hour</p>
          </div>
        </div>
        <div className={classes.fifith_section}>
          <div className={classes.rating_container}>
            <RatingStar
              blackListed={false}
              rating={rating}
              size={48}
              margin={"0 -3px"}
            />
            <span className={classes.rating}>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
