import React, { useEffect, useRef, useState } from "react";
import classes from "./Teachers.module.css";
import { HomeLayout } from "../../layouts/HomeLayout";
import { Header } from "../../layouts/Header/Header";
import { CustomSearch } from "../../components/CustomSearch/CustomSearch";
import { RollNumber } from "../../components/RollNumber/RollNumber";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import emptyTeacher from "../../assets/empty_teacher.png";
import { AddButton } from "../../components/AddButton/AddButton";
import { useNavigate, useLocation } from "react-router-dom";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { CustomEmptyState } from "../../components/CustomEmptyState/CustomEmptyState";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeacherApi, getListTeachersApi } from "../../Store/adminSlice";
import { BackDrop } from "../../components/BackDrop/BackDrop";
import { PaginationLoader } from "../../components/CustomSpinner/PaginationLoader";
import { teacherSearchApi } from "../../Store/searchSlice";
import { teacherFilterApi } from "../../Store/filterSlice";

export const Teachers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [singleTeacher, setSingleTeacher] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [searchPageNumber, setSearchPageNumber] = useState(1);
  const [filterPageNumber, setFilterPageNumber] = useState(1);
  const [filterCount, setFilterCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [teachersToDisplay, setTeachersToDisplay] = useState([]);

  const cardContainerRef = useRef(null);

  const { listTeachers, loading, teacherTotalPages, paginationLoading } =
    useSelector((state) => state.admin);

  const { searchResultTeacher, searchTeacherWarning, searchTeacherTotalPages } =
    useSelector((state) => state.search);

  const {
    filteredTeachers,
    teacherWarning,
    resultIsEmpty,
    filterTeacherTotalPages,
  } = useSelector((state) => state.filter);

  // Delete Modal handling
  const handleOpenDeleteModal = (singleTeacher) => {
    setDeleteModal(true);
    setSingleTeacher(singleTeacher);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    if (!resultIsEmpty && filteredTeachers.length === 0) {
      dispatch(getListTeachersApi(pageNumber));
    }
  }, [pageNumber, resultIsEmpty]);

  useEffect(() => {
    sessionStorage.removeItem("teacherProfileData");
    sessionStorage.removeItem("teacherContactData");
    sessionStorage.removeItem("teacherFinanceData");
    sessionStorage.removeItem("teacherSkillData");
  }, []);

  // Teacher Deleting Function
  const handleDeleteTeacher = async () => {
    try {
      const response = await dispatch(deleteTeacherApi(singleTeacher?.id));
      if (response.payload) {
        setTeachersToDisplay((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher.id !== singleTeacher.id)
        );
        handleCloseDeleteModal();
      } else {
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error(error);
      handleCloseDeleteModal();
    }
  };

  // formating date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `Added, ${day} ${month}, ${year}`;
  };

  const handleSearch = (input) => {
    setSearchInput(input);
    dispatch({ type: "search/resetTeacherSearchResults" });
    dispatch({ type: "admin/resetAllListTeachers" });
    dispatch({ type: "filter/resetFilterTeacher" });
    dispatch(teacherSearchApi({ input, pageNumber: searchPageNumber }));
  };

  useEffect(() => {
    // Retrieve filters from session storage
    const filters = JSON.parse(sessionStorage.getItem("teacherFilters")) ?? {};

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
  //       if (pageNumber < teacherTotalPages) {
  //         // User has scrolled to the bottom
  //         setPageNumber((prevPageNumber) => prevPageNumber + 1);
  //       } else if (
  //         searchResultTeacher.length > 0 &&
  //         searchPageNumber < searchTeacherTotalPages
  //       ) {
  //         dispatch(
  //           teacherSearchApi({
  //             input: searchInput,
  //             pageNumber: searchPageNumber + 1,
  //           })
  //         );
  //       } else if (filterPageNumber < filterTeacherTotalPages) {
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
  //           teacherFilterApi({ input, pageNumber: filterPageNumber + 1 })
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
        if (pageNumber < teacherTotalPages) {
          // User has scrolled to the bottom
          setTimeout(() => {
            setPageNumber(pageNumber + 1);
          }, 500);
        } else if (
          searchResultTeacher.length > 0 &&
          searchPageNumber < searchTeacherTotalPages
        ) {
          dispatch(
            teacherSearchApi({
              input: searchInput,
              pageNumber: searchPageNumber + 1,
            })
          );
        } else if (filterPageNumber < filterTeacherTotalPages) {
          const filters =
            JSON.parse(sessionStorage.getItem("teacherFilters")) ?? {};
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
            teacherFilterApi({ input, pageNumber: filterPageNumber + 1 })
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
    searchResultTeacher,
    searchPageNumber,
    filterPageNumber,
    cardContainerRef,
  ]);

  useEffect(() => {
    const teachersToDisplay =
      searchResultTeacher.length > 0
        ? searchResultTeacher
        : teacherWarning === "No teachers found in this filter!" ||
          filteredTeachers.length > 0
        ? filteredTeachers
        : listTeachers;
    setTeachersToDisplay(teachersToDisplay);
  }, [listTeachers, filteredTeachers, searchResultTeacher, teacherWarning]);

  useEffect(() => {
    return () => {
      dispatch({ type: "search/resetTeacherSearchResults" });
    };
  }, [location.pathname, dispatch]);

  useEffect(() => {
    dispatch({ type: "admin/resetAllListTeachers" });
    setPageNumber(1);
    dispatch(getListTeachersApi(1)); 
  }, [dispatch, location.pathname]);
  

  return (
    <>
      <HomeLayout>
        <div className={classes.teachersContainer}>
          <Header heading={"Teachers"} />
          <div className={classes.search_wrapper}>
            <CustomSearch
              count={filterCount}
              searchHandler={handleSearch}
              previousPage="teachers"
            />
          </div>
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
                      className={classes.teacher_card_wrapper}
                    >
                      <div
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
                          <h3 className={classes.name}>
                            {teacher?.teacher_name}
                          </h3>
                          <p className={classes.date}>
                            {formatDate(teacher?.date)}
                          </p>
                        </div>
                      </div>
                      <div className={classes.actions}>
                        <img
                          src={editIcon}
                          alt="Edit"
                          onClick={() =>
                            navigate(`/editteacher/${teacher?.id}`, {
                              state: { previousUrl: location.pathname },
                            })
                          }
                        />
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          onClick={() => handleOpenDeleteModal(teacher)}
                        />
                      </div>
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
                    searchTeacherWarning
                      ? searchTeacherWarning
                      : teacherWarning
                      ? teacherWarning
                      : "No teachers created"
                  }
                  paraText={
                    !searchTeacherWarning &&
                    !teacherWarning &&
                    "Tap the '+' button to add new teachers and manage their profiles"
                  }
                />
              )}
            </>
          )}
          <AddButton onClick={() => navigate("/addteacherprofile")} />
        </div>
      </HomeLayout>
      {deleteModal && (
        <ConfirmModal
          headingText={`Are you sure you want to delete ‘${singleTeacher?.teacher_name}’ from the teacher list?`}
          paraText={"This action cannot be undone."}
          confirmText={"Delete"}
          handleSubmit={handleDeleteTeacher}
          handleCancel={handleCloseDeleteModal}
        />
      )}
    </>
  );
};
