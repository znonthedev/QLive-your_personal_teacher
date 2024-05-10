import React from 'react'
import classes from "./BackDrop.module.css"

export const BackDrop = () => {
  return (
    <div className={classes.backDrop_container}>
        <span className={classes.loader}></span>
    </div>
  )
}
