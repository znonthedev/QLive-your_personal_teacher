import React, { useEffect, useState } from "react";
import classes from "./Subjects.module.css";
import { HomeLayout } from "../../layouts/HomeLayout";
import { Header } from "../../layouts/Header/Header";
import snippetFolder from "../../assets/snippet_folder.svg";
import article from "../../assets/article.svg";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import emptySubject from "../../assets/empty_subject.png";
import { AddButton } from "../../components/AddButton/AddButton";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { CustomEmptyState } from "../../components/CustomEmptyState/CustomEmptyState";
import { CreateModal } from "../../components/CreateModal/CreateModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubjectApi,
  deleteSubjectApi,
  editSubjectApi,
  getSubjectsApi,
} from "../../Store/adminSlice";
import { BackDrop } from "../../components/BackDrop/BackDrop";

export const Subjects = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [createSubjectModal, setCreateSubjectModal] = useState(false);
  const [singleSubject, setSingleSubject] = useState({});
  const [editSubjectModal, setEditSubjectModal] = useState(false);

  const dispatch = useDispatch();

  const { allSubjects, loading } = useSelector((state) => state.admin);

  // Subject Delete Modal handling
  const handleOpenDeleteModal = (subject) => {
    setDeleteModal(true);
    setSingleSubject(subject);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  // Subject Create Modal handling
  const handleOpenCreateSubjectModal = () => {
    setCreateSubjectModal(true);
  };
  const handleCloseCreateSubjectModal = () => {
    setCreateSubjectModal(false);
  };

  // Subject Edit Modal handling
  const handleOpenEditSubjectModal = (subject) => {
    setEditSubjectModal(true);
    setSingleSubject(subject);
  };
  const handleCloseEditSubjectModal = () => {
    setEditSubjectModal(false);
    setSingleSubject({});
  };

  // Getting All subject
  useEffect(() => {
    dispatch(getSubjectsApi());
  }, []);

  // Subject Creating Function
  const handleCreateSubject = async (data) => {
    if (!data) {
      return;
    }

    const input = {
      name: data,
    };
    try {
      const response = await dispatch(createSubjectApi(input));
      if (response.payload) {
        dispatch(getSubjectsApi());
        handleCloseCreateSubjectModal();
      } else {
        handleCloseCreateSubjectModal();
      }
    } catch (error) {
      console.error(error);
      handleCloseCreateSubjectModal();
    }
  };

  // Subject Editing Function
  const handleEditSubject = async (data) => {
    if (!data) {
      return;
    }

    const input = {
      name: data,
    };
    try {
      const response = await dispatch(
        editSubjectApi({ subjectId: singleSubject?.id, input })
      );
      if (response.payload) {
        dispatch(getSubjectsApi());
        handleCloseEditSubjectModal();
      } else {
        handleCloseEditSubjectModal();
      }
    } catch (error) {
      console.error(error);
      handleCloseEditSubjectModal();
    }
  };

  // Subject Deleting Function
  const handleDeleteSubject = async () => {
    try {
      const response = await dispatch(deleteSubjectApi(singleSubject?.id));
      if (response.payload) {
        dispatch(getSubjectsApi());
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
        <div className={classes.subjectsContainer}>
          <Header heading={"Subjects"} />
          <div className={classes.subject_body}>
            {loading ? (
              <BackDrop />
            ) : (
              <>
                {allSubjects && allSubjects.length > 0 ? (
                  <>
                    <h2 className={classes.heading}>Manage Subjects</h2>
                    <span className={classes.label}>
                      <img src={snippetFolder} alt="Folder" />
                      Subject Name
                    </span>
                    <div className={classes.card_container}>
                      {allSubjects
                        .slice()
                        .reverse()
                        .map((subject) => (
                          <div
                            key={subject?.id}
                            className={classes.teacher_card}
                          >
                            <img
                              src={article}
                              alt="Subject"
                              className={classes.article_icon}
                            />
                            <h3 className={classes.name}>{subject?.name}</h3>
                            <div className={classes.actions}>
                              <img
                                src={editIcon}
                                alt="Edit"
                                onClick={() =>
                                  handleOpenEditSubjectModal(subject)
                                }
                              />
                              <img
                                src={deleteIcon}
                                alt="Delete"
                                onClick={() => handleOpenDeleteModal(subject)}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                ) : (
                  <CustomEmptyState
                    emptyIcon={emptySubject}
                    mainText={"No subjects created"}
                    paraText={
                      "No subjects available. Tap the '+' button to create new subjects"
                    }
                  />
                )}
              </>
            )}
            <AddButton onClick={handleOpenCreateSubjectModal} />
          </div>
        </div>
      </HomeLayout>
      {deleteModal && (
        <ConfirmModal
          headingText={`Are you sure you want to delete the subject ‘${singleSubject?.name}’?`}
          warningText={
            "Deleting the subject will permanently remove it from the list, and it will also be removed from the associated teachers."
          }
          confirmText={"Delete"}
          handleSubmit={handleDeleteSubject}
          handleCancel={handleCloseDeleteModal}
        />
      )}
      {createSubjectModal && (
        <CreateModal
          heading={"Create Subject"}
          labelText={"Subject name"}
          handleCreate={handleCreateSubject}
          handleCancel={handleCloseCreateSubjectModal}
        />
      )}
      {editSubjectModal && (
        <CreateModal
          heading={"Edit Subject"}
          labelText={"Subject name"}
          defaultValue={singleSubject?.name}
          handleCreate={handleEditSubject}
          handleCancel={handleCloseEditSubjectModal}
        />
      )}
    </>
  );
};
