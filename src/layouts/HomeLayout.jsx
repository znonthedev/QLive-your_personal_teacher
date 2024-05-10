import React from "react";
import { BottomNavBar } from "./BottomNavBar/BottomNavBar";

export const HomeLayout = ({ children }) => {
  const styles = {
    width: "100%",
    maxWidth: "37.5rem",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FCFCFE",
    position: "relative",
  };

  return (
    <div style={styles}>
      {children}
      <BottomNavBar />
    </div>
  );
};
