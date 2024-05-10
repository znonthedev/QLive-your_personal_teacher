import React, { useEffect, useState } from "react";
import classes from "./Filters.module.css";
import closeIcon from "../../assets/close.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGradesApi,
  getSubjectsApi,
} from "../../Store/adminSlice";
import { BackDrop } from "../../components/BackDrop/BackDrop";
import { dashboardFilterApi, teacherFilterApi } from "../../Store/filterSlice";

export const Filters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { allGrades, allSubjects, loading } = useSelector(
    (state) => state.admin
  );
  const previousPage = location?.state?.previousPage;

  const initialFilters = JSON.parse(
    previousPage === "teachers"
      ? sessionStorage.getItem("teacherFilters")
      : sessionStorage.getItem("dashboardFilters")
  ) || {
    selectedSubject: "all",
    rollNumber: "",
    experience: "",
    englishProficiency: "",
    selectedGrade: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [pageNumber, setPageNumber] = useState(1);

  const handleSubjectChange = (event) => {
    if (event.target.value === "all") {
      setFilters({ ...filters, selectedSubject: event.target.value });
    } else {
      const subjectId = parseFloat(event.target.value);
      setFilters({ ...filters, selectedSubject: subjectId });
    }
  };

  const handleRollNumberChange = (event) => {
    setFilters({ ...filters, rollNumber: event.target.value });
  };

  const handleExperienceChange = (event) => {
    setFilters({ ...filters, experience: event.target.value });
  };

  const handleEnglishProficiencyChange = (event) => {
    setFilters({ ...filters, englishProficiency: event.target.value });
  };

  const handleGradeChange = (event) => {
    setFilters({ ...filters, selectedGrade: event.target.value });
  };

  useEffect(() => {
    dispatch(getGradesApi());
    dispatch(getSubjectsApi());
  }, []);

  // Add "All Subjects" option to the beginning of the allSubjects array
  const subjectsWithAllOption = [
    { id: "all", name: "All Subjects" },
    ...allSubjects,
  ];

  const handleSubmitFilter = async () => {
    const filtersChanged =
    filters.selectedSubject !== initialFilters.selectedSubject ||
    filters.rollNumber !== initialFilters.rollNumber ||
    filters.experience !== initialFilters.experience ||
    filters.englishProficiency !== initialFilters.englishProficiency ||
    filters.selectedGrade !== initialFilters.selectedGrade;

    if (!filtersChanged) {
      navigate(
        location.state.previousUrl ? location.state.previousUrl : "/"
      );
      return;
    }

    const input = {
      subject: filters?.selectedSubject !== "all" && filters?.selectedSubject,
      experience: parseInt(filters?.experience),
      englishProficiency: filters?.englishProficiency,
      rollNo:
        filters?.rollNumber === "numbered"
          ? true
          : filters?.rollNumber === "unNumbered"
          ? false
          : undefined,
      grade: parseInt(filters?.selectedGrade),
    };
    if (previousPage === "teachers") {
      try {
        dispatch({ type: 'search/resetTeacherSearchResults' });
        dispatch({ type: 'admin/resetAllListTeachers' });
        dispatch({ type: "filter/resetFilterTeacher" });
        const response = await dispatch(teacherFilterApi({ input, pageNumber }));
        if (response.payload) {
          navigate(
            location.state.previousUrl ? location.state.previousUrl : "/"
          );
        } else {
          console.log("some thing went wrong");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        dispatch({ type: 'search/resetSearchResults' });
        dispatch({ type: 'admin/resetAllTeachers' });
        dispatch({ type: "filter/resetFilterDashboard" });
        const response = await dispatch(
          dashboardFilterApi({ input, pageNumber })
        );
        if (response.payload) {
          navigate(
            location.state.previousUrl ? location.state.previousUrl : "/"
          );
        } else {
          console.log("some thing went wrong");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Save filter parameters to local storage whenever they change
  useEffect(() => {
    if (previousPage === "teachers") {
      sessionStorage.setItem("teacherFilters", JSON.stringify(filters));
    } else {
      sessionStorage.setItem("dashboardFilters", JSON.stringify(filters));
    }
  }, [filters]);
  

  return (
    <>
      <div className={classes.filtersContainer}>
        <div className={classes.header}>
          <img
            src={closeIcon}
            alt="Back"
            className={classes.backArrow}
            onClick={() =>
              navigate(
                location.state.previousUrl ? location.state.previousUrl : "/"
              )
            }
          />
          <h1 className={classes.heading}>Filters</h1>
          <button className={classes.saveBtn} onClick={handleSubmitFilter}>
            Apply
          </button>
        </div>
        <form className={classes.form} action="">
          <h2 className={classes.subHeading}>Filter options</h2>
          <label htmlFor="rollNumber" className={classes.label}>
            Roll number
          </label>
          <select
            name="rollNumber"
            id="rollNumber"
            className={classes.selector}
            value={filters?.rollNumber}
            onChange={handleRollNumberChange}
          >
            <option value={"all teachers"}>All teachers</option>
            <option value={"numbered"}>Numbered</option>
            <option value={"unNumbered"}>Unnumbered</option>
          </select>
          <label htmlFor="experience" className={classes.label}>
            Experience
          </label>
          <select
            name="experience"
            id="experience"
            className={classes.selector}
            value={filters?.experience}
            onChange={handleExperienceChange}
          >
            <option value="">All experience level</option>
            <option value={1}>1 Year</option>
            <option value={2}>2 Years</option>
            <option value={3}>3 Years</option>
            <option value={4}>4 Years</option>
            <option value={5}>5 and above</option>
          </select>
          <label htmlFor="proficiency" className={classes.label}>
            English proficiency
          </label>
          <select
            name="proficiency"
            id="proficiency"
            className={classes.selector}
            value={filters?.englishProficiency}
            onChange={handleEnglishProficiencyChange}
          >
            <option value="">All proficiency level</option>
            <option value="100%">100%</option>
            <option value="90%">90%</option>
            <option value="80%">80%</option>
            <option value="Below+80%">Below 80%</option>
          </select>
          <label htmlFor="grade" className={classes.label}>
            Grade
          </label>
          <select
            name="grade"
            id="grade"
            className={classes.selector}
            value={filters?.selectedGrade}
            onChange={handleGradeChange}
          >
            <option value="">All grade</option>
            {allGrades?.map((grade) => (
              <option key={grade?.id} value={grade?.id}>
                {grade?.name}
              </option>
            ))}
          </select>
          <h2 className={classes.subHeading}>Filter by Subject</h2>
          {subjectsWithAllOption?.map((subject) => (
            <div key={subject?.id} className={classes.subject_wrapper}>
              <input
                type="radio"
                id={subject?.id}
                name="subject"
                value={subject?.id}
                checked={filters?.selectedSubject === subject.id}
                onChange={handleSubjectChange}
              />
                <label htmlFor={subject?.id}>{subject?.name}</label>
            </div>
          ))}
        </form>
      </div>
      {loading && <BackDrop />}
    </>
  );
};
