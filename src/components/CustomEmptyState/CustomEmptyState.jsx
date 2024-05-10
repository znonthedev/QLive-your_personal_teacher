import React from 'react'
import classes from "./CustomEmptyState.module.css"

export const CustomEmptyState = ({emptyIcon,mainText,paraText}) => {
  return (
    <div className={classes.customEmptyStateContainer}>
        <img src={emptyIcon} alt="Empty" className={classes.empty_icon}/>
        <h2 className={classes.main_text}>{mainText}</h2>
        <p className={classes.para_text}>{paraText}</p>
    </div>
  )
}
