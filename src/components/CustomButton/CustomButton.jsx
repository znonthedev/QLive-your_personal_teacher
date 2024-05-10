import React from 'react'
import classes from "./CustomButton.module.css"

export const CustomButton = ({children,onClick,disabled}) => {
  return (
    <button className={classes.customButton} onClick={onClick} disabled={disabled ? true : false}>{children}</button>
  )
}
