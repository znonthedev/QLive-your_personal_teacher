import React, { useState } from "react";
import classes from "./CustomSearch.module.css";
import searchIcon from "../../assets/search.svg";
import { useNavigate, useLocation } from "react-router-dom";

export const CustomSearch = ({
  searchHandler,
  count,
  previousPage,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    searchHandler(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
      e.target.blur();
    }
  };

  return (
    <div className={classes.customSearchContainer}>
      <img src={searchIcon} alt="Search" className={classes.search_icon} />
      <input
        type="text"
        placeholder="Search"
        id="search"
        className={classes.search_input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <p
        className={classes.filters}
        onClick={() =>
          navigate("/filters", {
            state: {
              previousUrl: location.pathname,
              previousPage: previousPage,
            },
          })
        }
      >
        Filters <span className={classes.count}>{count}</span>
      </p>
    </div>
  );
};
