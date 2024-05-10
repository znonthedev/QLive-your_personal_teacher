import React, { useEffect, useRef, useState } from "react";
import classes from "./Dashboard.module.css";
import { HomeLayout } from "../../layouts/HomeLayout";
import { Header } from "../../layouts/Header/Header";
import { CustomSearch } from "../../components/CustomSearch/CustomSearch";
import { RollNumber } from "../../components/RollNumber/RollNumber";
import chevronRight from "../../assets/chevron_right.svg";
import emptyTeacher from "../../assets/empty_teacher.png";
import { RatingStar } from "../../components/RatingStar";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomEmptyState } from "../../components/CustomEmptyState/CustomEmptyState";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectsApi, getTeachersApi } from "../../Store/adminSlice";
import { BackDrop } from "../../components/BackDrop/BackDrop";
import { dashboardSearchApi } from "../../Store/searchSlice";
import { dashboardFilterApi } from "../../Store/filterSlice";
import { PaginationLoader } from "../../components/CustomSpinner/PaginationLoader";

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [filterCount, setFilterCount] = useState(0); // State to store the count of filters
  const [pageNumber, setPageNumber] = useState(1);
  const [searchPageNumber, setSearchPageNumber] = useState(1);
  const [filterPageNumber, setFilterPageNumber] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const cardContainerRef = useRef(null);

  const {
    allTeachers,
    teachersCount,
    subjectsCount,
    warning,
    loading,
    totalPages,
    paginationLoading,
  } = useSelector((state) => state.admin);

  const { searchResultDashboard, searchWarning, searchTotalPages } =
    useSelector((state) => state.search);

  const {
    filteredDashboard,
    resultIsEmpty,
    dashboardwarning,
    filterTotalPages,
  } = useSelector((state) => state.filter);

  useEffect(() => {
    if (!resultIsEmpty && filteredDashboard.length === 0) {
      dispatch(getTeachersApi(pageNumber));
    }
  }, [pageNumber, resultIsEmpty]);

  useEffect(() => {
    dispatch(getSubjectsApi());
  }, []);

  const handleSearch = (input) => {
    setSearchInput(input);
    dispatch({ type: "admin/resetAllTeachers" });
    dispatch({ type: "search/resetSearchResults" });
    dispatch({ type: "filter/resetFilterDashboard" });
    dispatch(dashboardSearchApi({ input, pageNumber: searchPageNumber }));
  };

  useEffect(() => {
    // Retrieve filters from session storage
    const filters =
      JSON.parse(sessionStorage.getItem("dashboardFilters")) ?? {};

    // Calculate the count of non-empty filters
    let filtersCount = Object.values(filters).filter(Boolean).length;

    // Decrement the count if selectedSubject is "all"
    if (filters && filters.selectedSubject === "all") {
      filtersCount--;
    }

    if (filters && filters.rollNumber === "all teachers") {
      filtersCount--;
    }

    setFilterCount(filtersCount);
  }, [handleSearch]);

  // const handleScroll = () => {
  //   const container = cardContainerRef.current;
  //   if (container) {
  //     const { scrollTop, clientHeight, scrollHeight } = container;

  //     // Calculate how close the user is to the bottom of the container
  //     const scrollBottom = scrollHeight - (scrollTop + clientHeight);

  //     // Define a threshold to trigger loading more data (e.g., 50 pixels from the bottom)
  //     const threshold = 50;

  //     if (scrollBottom <= threshold) {
  //       if (pageNumber < totalPages) {
  //         // User has scrolled to the bottom
  //         setPageNumber((prevPageNumber) => prevPageNumber + 1);
  //       } else if (
  //         searchResultDashboard.length > 0 &&
  //         searchPageNumber < searchTotalPages
  //       ) {
  //         dispatch(
  //           dashboardSearchApi({
  //             input: searchInput,
  //             pageNumber: searchPageNumber + 1,
  //           })
  //         );
  //       } else if (filterPageNumber < filterTotalPages) {
  //         const filters =
  //           JSON.parse(sessionStorage.getItem("teacherFilters")) ?? {};
  //         const input = {
  //           subject:
  //             filters?.selectedSubject !== "all" && filters?.selectedSubject,
  //           experience: parseInt(filters?.experience),
  //           englishProficiency: filters?.englishProficiency,
  //           rollNo:
  //             filters?.rollNumber === "numbered"
  //               ? true
  //               : filters?.rollNumber === "unNumbered"
  //               ? false
  //               : undefined,
  //           grade: parseInt(filters?.selectedGrade),
  //         };
  //         dispatch(
  //           dashboardFilterApi({ input, pageNumber: filterPageNumber + 1 })
  //         );
  //       }
  //     }
  //   }
  // };

  const handleScroll = () => {
    const container = cardContainerRef.current;
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container;

      // Calculate how close the user is to the bottom of the container
      const scrollBottom = scrollHeight - (scrollTop + clientHeight);

      // Define a threshold to trigger loading more data (e.g., 50 pixels from the bottom)
      const threshold = 50;

      if (scrollBottom <= threshold) {
        if (pageNumber < totalPages) {
          // User has scrolled to the bottom
          setTimeout(() => {
            setPageNumber(pageNumber + 1);
          }, 500);
        } else if (
          searchResultDashboard.length > 0 &&
          searchPageNumber < searchTotalPages
        ) {
          dispatch(
            teacherSearchApi({
              input: searchInput,
              pageNumber: searchPageNumber + 1,
            })
          );
        } else if (filterPageNumber < filterTotalPages) {
          const filters =
            JSON.parse(sessionStorage.getItem("dashboardFilters")) ?? {};
          const input = {
            subject:
              filters?.selectedSubject !== "all" && filters?.selectedSubject,
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
          dispatch(
            dashboardFilterApi({ input, pageNumber: filterPageNumber + 1 })
          );
        }
      }
    }
  };

  useEffect(() => {
    const container = cardContainerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);
      container.addEventListener("touchmove", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("touchmove", handleScroll);
      };
    }
  }, [
    pageNumber,
    searchResultDashboard,
    searchPageNumber,
    filterPageNumber,
    cardContainerRef,
  ]);

  const teachersToDisplay =
    searchResultDashboard.length > 0
      ? searchResultDashboard
      : dashboardwarning === "No teachers found in this filter!" ||
        filteredDashboard.length > 0
      ? filteredDashboard
      : allTeachers;

  useEffect(() => {
    return () => {
      dispatch({ type: "search/resetSearchResults" });
    };
  }, [location.pathname, dispatch]);

  useEffect(() => {
    dispatch({ type: "admin/resetAllTeachers" });
    setPageNumber(1);
    dispatch(getTeachersApi(1));
  }, [dispatch, location.pathname]);

  return (
    <HomeLayout>
      <div className={classes.dashboardContainer}>
        <Header heading={"Dashboard"} />
        <div className={classes.counters_wrapper}>
          <div className={classes.count_card}>
            <h4 className={classes.labelText}>Teachers</h4>
            <h3 className={classes.count}>{teachersCount}</h3>
          </div>
          <div className={classes.count_card}>
            <h4 className={classes.labelText}>Subjects</h4>
            <h3 className={classes.count}>{subjectsCount}</h3>
          </div>
        </div>
        <CustomSearch
          searchHandler={handleSearch}
          count={filterCount}
          previousPage="dashboard"
        />
        <div className={classes.card_label}>
          <span>No.</span>
          <span>Teachers</span>
        </div>
        {loading ? (
          <BackDrop />
        ) : (
          <>
            {teachersToDisplay && teachersToDisplay.length > 0 ? (
              <div
                ref={cardContainerRef}
                onScroll={handleScroll}
                className={classes.card_container}
              >
                {teachersToDisplay?.map((teacher) => (
                  <div
                    key={teacher?.id}
                    className={classes.teacher_card}
                    onClick={() =>
                      navigate(`/teacherprofile/${teacher?.id}`, {
                        state: { previousUrl: location.pathname },
                      })
                    }
                  >
                    <RollNumber
                      rollNo={teacher?.roll_no}
                      blacklisted={teacher?.black_list}
                    />
                    <div className={classes.details_container}>
                      <h3 className={classes.name}>{teacher?.teacher_name}</h3>
                      <div className={classes.rating_container}>
                        <RatingStar
                          rating={teacher?.total_rating}
                          blackListed={teacher?.black_list}
                        />{" "}
                        <span className={classes.total_rating}>
                          {teacher?.total_rating}
                        </span>
                        <span className={classes.available_slot}>
                          {teacher?.available_slot === null
                            ? "0"
                            : teacher?.available_slot < 10
                            ? `0${teacher?.available_slot}`
                            : teacher?.available_slot}
                        </span>
                        <span
                          className={`${classes.available_slot} ${classes.filled_slot}`}
                        >
                          {teacher?.filled_slot === null
                            ? "0"
                            : teacher?.filled_slot < 10
                            ? `0${teacher?.filled_slot}`
                            : teacher?.filled_slot}
                        </span>
                      </div>
                      <p className={classes.description}>{teacher?.about}</p>
                    </div>
                    <img
                      src={chevronRight}
                      alt="Right Icon"
                      className={classes.right_icon}
                    />
                  </div>
                ))}
                {paginationLoading && (
                  <div className={classes.paginationLoading_container}>
                    <PaginationLoader />
                  </div>
                )}
              </div>
            ) : (
              <CustomEmptyState
                emptyIcon={emptyTeacher}
                mainText={
                  searchWarning
                    ? searchWarning
                    : dashboardwarning
                    ? dashboardwarning
                    : "No teachers created"
                }
                paraText={
                  !searchWarning &&
                  !dashboardwarning &&
                  "Add new teachers to manage their profiles and information"
                }
              />
            )}
          </>
        )}
      </div>
    </HomeLayout>
  );
};
