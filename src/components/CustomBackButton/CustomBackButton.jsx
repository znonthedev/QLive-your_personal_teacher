import React from 'react'
import classes from "./CustomBackButton.module.css"
import arrowLeft from "../../assets/arrow_back.svg"

export const CustomBackButton = ({onClick}) => {
  return (
    <div className={classes.customBackContainer}>
        <img src={arrowLeft} alt="Arrow Left"  className={classes.arrow} onClick={onClick}/>
    </div>
  )
}
