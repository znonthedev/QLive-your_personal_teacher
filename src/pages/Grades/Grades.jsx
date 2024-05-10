import React, { useEffect, useState } from "react";
import classes from "./Grades.module.css";
import { HomeLayout } from "../../layouts/HomeLayout";
import { Header } from "../../layouts/Header/Header";
import snippetFolder from "../../assets/snippet_folder.svg";
import gradeIcon from "../../assets/star-filled.svg";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import emptyGrade from "../../assets/empty-grade.png";
import { AddButton } from "../../components/AddButton/AddButton";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { CustomEmptyState } from "../../components/CustomEmptyState/CustomEmptyState";
import { CreateModal } from "../../components/CreateModal/CreateModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createGradeApi,
  deleteGradeApi,
  editGradeApi,
  getGradesApi,
} from "../../Store/adminSlice";
import { BackDrop } from "../../components/BackDrop/BackDrop";

export const Grades = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [createGradeModal, setCreateGradeModal] = useState(false);
  const [editGradeModal, setEditGradeModal] = useState(false);
  const [singleGrade, setSingleGrade] = useState({});
  const dispatch = useDispatch();

  const { allGrades, loading } = useSelector((state) => state.admin);

  // Grade Delete Modal handling
  const handleOpenDeleteModal = (grade) => {
    setDeleteModal(true);
    setSingleGrade(grade);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  // Grade Create Modal handling
  const handleOpenCreateModal = () => {
    setCreateGradeModal(true);
  };
  const handleCloseCreateModal = () => {
    setCreateGradeModal(false);
  };

  // Grade Edit Modal handling
  const handleOpenEditModal = (grade) => {
    setEditGradeModal(true);
    setSingleGrade(grade);
  };
  const handleCloseEditModal = () => {
    setEditGradeModal(false);
  };

  // Grade All Grade
  useEffect(() => {
    dispatch(getGradesApi());
  }, []);

  // Grade Creating Function
  const handleCreateGrade = async (data) => {
    if (!data) {
      return;
    }

    const input = {
      name: data,
    };
    try {
      const response = await dispatch(createGradeApi(input));
      if (response.payload) {
        dispatch(getGradesApi());
        handleCloseCreateModal();
      } else {
        handleCloseCreateModal();
      }
    } catch (error) {
      console.error(error);
      handleCloseCreateModal();
    }
  };

  // Grade Editing Function
  const handleEditGrade = async (data) => {
    if (!data) {
      return;
    }

    const input = {
      name: data,
    };
    try {
      const response = await dispatch(
        editGradeApi({ gradeId: singleGrade?.id, input })
      );
      if (response.payload) {
        dispatch(getGradesApi());
        handleCloseEditModal();
      } else {
        handleCloseEditModal();
      }
    } catch (error) {
      console.error(error);
      handleCloseEditModal();
    }
  };

  // Grade Deleting Function
  const handleDeleteGrade = async () => {
    try {
      const response = await dispatch(deleteGradeApi(singleGrade?.id));
      if (response.payload) {
        dispatch(getGradesApi());
        handleCloseDeleteModal();
      } else {
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error(error);
      handleCloseDeleteModal();
    }
  };

  return (
    <>
      <HomeLayout>
        <div className={classes.gradesContainer}>
          <Header heading={"Grades"} />
          <div className={classes.grades_body}>
            {loading ? (
              <BackDrop />
            ) : (
              <>
                {allGrades && allGrades.length > 0 ? (
                  <>
                    <h2 className={classes.heading}>Manage Grades</h2>
                    <span className={classes.label}>
                      <img src={snippetFolder} alt="Folder" />
                      Grades
                    </span>
                    <div className={classes.card_container}>
                      {allGrades
                        .slice()
                        .reverse()
                        .map((grade) => (
                          <div key={grade?.id} className={classes.teacher_card}>
                            <img
                              src={gradeIcon}
                              alt="Grade"
                              className={classes.grade_icon}
                            />
                            <h3 className={classes.name}>{grade?.name}</h3>
                            <div className={classes.actions}>
                              <img
                                src={editIcon}
                                alt="Edit"
                                onClick={() => handleOpenEditModal(grade)}
                              />
                              <img
                                src={deleteIcon}
                                alt="Delete"
                                onClick={() => handleOpenDeleteModal(grade)}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                ) : (
                  <CustomEmptyState
                    emptyIcon={emptyGrade}
                    mainText={"No grades created"}
                    paraText={
                      "No grade available. Tap the '+' button to create new grade."
                    }
                  />
                )}
              </>
            )}
            <AddButton onClick={handleOpenCreateModal} />
          </div>
        </div>
      </HomeLayout>
      {deleteModal && (
        <ConfirmModal
          headingText={`Are you sure you want to delete ‘${singleGrade?.name}’ from the Grade list ?`}
          warningText={
            "Deleting the Grade will permanently remove it from the list, and it will also be removed from the associated teachers."
          }
          confirmText={"Delete"}
          handleSubmit={handleDeleteGrade}
          handleCancel={handleCloseDeleteModal}
        />
      )}
      {createGradeModal && (
        <CreateModal
          heading={"Create Grade"}
          labelText={"Grade name"}
          handleCreate={handleCreateGrade}
          handleCancel={handleCloseCreateModal}
        />
      )}
      {editGradeModal && (
        <CreateModal
          heading={"Edit Grade"}
          labelText={"Grade name"}
          defaultValue={singleGrade?.name}
          handleCreate={handleEditGrade}
          handleCancel={handleCloseEditModal}
        />
      )}
    </>
  );
};
