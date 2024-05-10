import React, { useEffect, useRef, useState } from "react";
import classes from "./TeacherProfile.module.css";
import arrowBack from "../../assets/arrow_back.svg";
import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/edit.svg";
import blackListIcon from "../../assets/folder_limited.svg";
import blackListIconFilled from "../../assets/folder_limited-dark.svg";
import avatar from "../../assets/teacher.png";
import trophy from "../../assets/trophy.svg";
import successDemo from "../../assets/success-demo.svg";
import teacherChange from "../../assets/teacher-change.svg";
import failedDemo from "../../assets/failed-demo.svg";
import blacklistAvatar from "../../assets/blacklist-avatar.png";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { RatingStar } from "../../components/RatingStar";
import { DownloadButton } from "../../components/DownloadButton/DownloadButton";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTeacherApi,
  editTeacherApi,
  getSingleTeacherApi,
} from "../../Store/adminSlice";
import { SelectGradeModal } from "../../components/DownloadImage/SelectGradeModal";
import { SetAmountModal } from "../../components/DownloadImage/SetAmountModal";
import html2canvas from "html2canvas";
import { GeneratedImage } from "../../components/DownloadImage/GeneratedImage/GeneratedImage";

export const TeacherProfile = () => {
  const token = localStorage.getItem("qlive_token");
  const role = localStorage.getItem("qlive_role");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [deleteModal, setDeleteModal] = useState(false);
  const [blacklistModal, setBlacklistModal] = useState(false);
  const [removeblacklistModal, setRemoveblacklistModal] = useState(false);
  const [selectGradeModal, setSelectGradeModal] = useState(false);
  const [setAmountModal, setSetAmountModal] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [remunerationAmount, setRemunerationAmount] = useState(0);
  const imageRef = useRef(null);

  const teacherId = params.id;
  const { singleTeacher } = useSelector((state) => state.admin);

  // delete modal handler
  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  // blacklist modal handler
  const handleOpenBlacklistModal = () => {
    if (singleTeacher?.black_list) {
      setRemoveblacklistModal(true);
    } else {
      setBlacklistModal(true);
    }
  };
  const handleCloseBlacklistModal = () => {
    if (singleTeacher?.black_list) {
      setRemoveblacklistModal(false);
    } else {
      setBlacklistModal(false);
    }
  };

  // fetching teacher details
  useEffect(() => {
    dispatch(getSingleTeacherApi(teacherId));
  }, []);

  // Add to Blacklist Function
  const handleAddToBlacklist = async () => {
    const input = {
      black_list: true,
    };
    try {
      const response = await dispatch(
        editTeacherApi({ teacherId: singleTeacher?.id, input })
      );
      if (response.payload) {
        dispatch(getSingleTeacherApi(teacherId));
        handleCloseBlacklistModal();
      } else {
        handleCloseBlacklistModal();
      }
    } catch (error) {
      console.error(error);
      handleCloseBlacklistModal();
    }
  };

  // Remove from Blacklist Function
  const handleRemovefromBlacklist = async () => {
    const input = {
      black_list: false,
    };
    try {
      const response = await dispatch(
        editTeacherApi({ teacherId: singleTeacher?.id, input })
      );
      if (response.payload) {
        dispatch(getSingleTeacherApi(teacherId));
        handleCloseBlacklistModal();
      } else {
        handleCloseBlacklistModal();
      }
    } catch (error) {
      console.error(error);
      handleCloseBlacklistModal();
    }
  };

  // Teacher Deleting Function
  const handleDeleteTeacher = async () => {
    try {
      const response = await dispatch(deleteTeacherApi(singleTeacher?.id));

      if (response.payload) {
        navigate(
          location.state?.previousUrl ? location.state?.previousUrl : "/"
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

  // Select Grade Modal handler
  const handleOpenSelectGradeModal = () => {
    setSelectGradeModal(true);
  };
  const handleCloseSelectGradeModal = () => {
    setSelectGradeModal(false);
    setSelectedGrade("");
  };

  // Set Amount Modal handler
  const handleOpenSetAmountModal = (gradeId) => {
    handleCloseSelectGradeModal();
    setSelectedGrade(gradeId);
    setSetAmountModal(true);
  };
  const handleCloseSetAmountModal = () => {
    setSetAmountModal(false);
    handleOpenSelectGradeModal();
  };

  const handleDownload = async (maxRemunerationValue) => {
    await setRemunerationAmount(maxRemunerationValue);
    html2canvas(imageRef.current).then((canvas) => {
      const url = canvas.toDataURL();
      const link = document.createElement("a");
      link.download = `${singleTeacher?.teacher_name}'s_generated_image.png`;
      link.href = url;
      link.click();
    });
    setSetAmountModal(false);
    setSelectedGrade("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={classes.teacherProfileContainer}>
        <div className={classes.header}>
          <img
            src={arrowBack}
            alt="Back"
            onClick={() =>
              navigate(
                location.state?.previousUrl ? location.state?.previousUrl : "/"
              )
            }
          />
          {token && role === "admin" && (
            <>
              <img
                src={
                  singleTeacher?.black_list
                    ? blackListIconFilled
                    : blackListIcon
                }
                alt="BlackList"
                onClick={handleOpenBlacklistModal}
              />
              <img
                src={deleteIcon}
                alt="Delete"
                onClick={handleOpenDeleteModal}
              />
              <img
                src={editIcon}
                alt="Edit"
                onClick={() =>
                  navigate(`/editteacher/${teacherId}`, {
                    state: { previousUrl: `/teacherprofile/${teacherId}` },
                  })
                }
              />
            </>
          )}
        </div>
        <div
          className={`${classes.active_container} ${
            !singleTeacher?.active && classes.inactive_container
          }`}
        >
          {" "}
          <div
            className={`${classes.round} ${
              !singleTeacher?.active && classes.inactive_round
            }`}
          ></div>
          {singleTeacher?.active ? "Active" : "Inactive"}
        </div>
        <div className={classes.nameCard}>
          <img
            src={singleTeacher?.black_list ? blacklistAvatar : avatar}
            alt="Avatar"
            className={classes.avatar}
          />
          <div>
            <h3 className={classes.name}>{singleTeacher?.teacher_name}</h3>
            <div className={classes.rating_container}>
              <RatingStar
                rating={singleTeacher?.total_rating}
                blackListed={singleTeacher?.black_list}
              />
              <span>{singleTeacher?.total_rating}</span>
            </div>
            <p className={classes.date}>{formatDate(singleTeacher?.date)}</p>
          </div>
          <div
            className={`${classes.pointsContainer} ${
              singleTeacher?.total_point < 0 ? classes.negativePoints : ""
            }`}
          >
            <img src={trophy} alt="Trophy" />
            Points: <span>{singleTeacher?.total_point}</span>
          </div>
        </div>
        <div className={classes.mark_container}>
          <div className={classes.markCard}>
            <img src={successDemo} alt="Success" />
            <span className={classes.point} id="success_demo">
              {singleTeacher?.success_demo}
            </span>
            <label htmlFor="success_demo" className={classes.labelText}>
              Success demo
            </label>
          </div>
          <div className={classes.markCard}>
            <img src={failedDemo} alt="Failed" />
            <span className={classes.point} id="failed_demo">
              {singleTeacher?.failed_demo}
            </span>
            <label htmlFor="failed_demo" className={classes.labelText}>
              Failed demo
            </label>
          </div>
          <div className={classes.markCard}>
            <img src={teacherChange} alt="Change" />
            <span className={classes.point} id="teacher_change">
              {singleTeacher?.teacher_change}
            </span>
            <label htmlFor="teacher_change" className={classes.labelText}>
              Teacher change
            </label>
          </div>
          <div className={classes.markCard}>
            <span className={classes.point} id="experience">
              {singleTeacher?.experience}
            </span>
            <label htmlFor="experience" className={classes.labelText}>
              Years experience
            </label>
          </div>
          <div className={classes.markCard}>
            <span className={classes.point} id="proficiency">
              {singleTeacher?.english_fluency}
            </span>
            <label htmlFor="proficiency" className={classes.labelText}>
              English proficiency
            </label>
          </div>
          <div className={classes.markCard}>
            <span className={classes.point} id="rating">
              {singleTeacher?.interview_rating}
            </span>
            <label htmlFor="rating" className={classes.labelText}>
              Interview rating
            </label>
          </div>
        </div>
        <div className={classes.details_container}>
          <h2 className={classes.heading_text}>Slots</h2>
          <div className={classes.slot_container}>
            <div className={classes.available_slot}>
              <label htmlFor="available">Available</label>
              <span id="available">{singleTeacher?.available_slot || 0}</span>
            </div>
            <div className={`${classes.available_slot} ${classes.filled_slot}`}>
              <label htmlFor="filled">Filled</label>
              <span id="filled">{singleTeacher?.filled_slot || 0}</span>
            </div>
          </div>
          <h2 className={classes.heading_text}>Basic info</h2>
          <div className={classes.detail_wrapper}>
            <label
              htmlFor="rollNo"
              className={`${classes.labelText} ${classes.details_label}`}
            >
              Roll number
            </label>
            {singleTeacher?.roll_no ? (
              <h4 className={classes.detail_text} id="rollNo">
                {singleTeacher?.roll_no}
              </h4>
            ) : (
              <span className={classes.notfound_text}>Not assigned</span>
            )}
            <label
              htmlFor="qualification"
              className={`${classes.labelText} ${classes.details_label}`}
            >
              Qualification
            </label>
            <h4 className={classes.detail_text} id="qualification">
              {singleTeacher?.qualification}
            </h4>
            <label
              htmlFor="subjects"
              className={`${classes.labelText} ${classes.details_label}`}
            >
              Subjects
            </label>
            {singleTeacher?.subject_name &&
            singleTeacher?.subject_name.length > 0 ? (
              <h4 className={classes.detail_text} id="subjects">
                {singleTeacher?.subject_name?.map((subject, index) => (
                  <React.Fragment key={index}>
                    {subject}
                    {index < singleTeacher.subject_name.length - 1 &&
                      " | "}{" "}
                  </React.Fragment>
                ))}
              </h4>
            ) : (
              <span className={classes.notfound_text}>No subjects found</span>
            )}
          </div>
          <h2 className={classes.heading_text}>Contact details</h2>
          <div className={classes.detail_wrapper}>
            <label
              htmlFor="contact"
              className={`${classes.labelText} ${classes.details_label}`}
            >
              Contact
            </label>
            <h4 className={classes.detail_text} id="contact">
              {singleTeacher?.contact_no}
            </h4>
            <label
              htmlFor="whatsapp"
              className={`${classes.labelText} ${classes.details_label}`}
            >
              Whatsapp
            </label>
            <h4 className={classes.detail_text} id="whatsapp">
              <Link to={`https://wa.me/${singleTeacher?.whatsapp_no}`}>
                https://wa.me/{singleTeacher?.whatsapp_no}
              </Link>
            </h4>
            <label
              htmlFor="email"
              className={`${classes.labelText} ${classes.details_label}`}
            >
              Email
            </label>
            <h4 className={classes.detail_text} id="email">
              {singleTeacher?.email}
            </h4>
          </div>
          <h2 className={classes.heading_text}>Financial and bank details</h2>
          <div className={classes.detail_wrapper}>
            {singleTeacher?.bank_name && (
              <>
                <label
                  htmlFor="bankName"
                  className={`${classes.labelText} ${classes.details_label}`}
                >
                  Bank name
                </label>
                <h4 className={classes.detail_text} id="bankName">
                  {singleTeacher?.bank_name}
                </h4>
              </>
            )}
            {singleTeacher?.bank_acc_holder_name && (
              <>
                <label
                  htmlFor="accountHolder"
                  className={`${classes.labelText} ${classes.details_label}`}
                >
                  Account holder
                </label>
                <h4 className={classes.detail_text} id="accountHolder">
                  {singleTeacher?.bank_acc_holder_name}
                </h4>
              </>
            )}
            {singleTeacher?.account_no && (
              <>
                <label
                  htmlFor="accountNumber"
                  className={`${classes.labelText} ${classes.details_label}`}
                >
                  Account number
                </label>
                <h4 className={classes.detail_text} id="accountNumber">
                  {singleTeacher?.account_no}
                </h4>
              </>
            )}
            {singleTeacher?.branch && (
              <>
                <label
                  htmlFor="branch"
                  className={`${classes.labelText} ${classes.details_label}`}
                >
                  Branch
                </label>
                <h4 className={classes.detail_text} id="branch">
                  {singleTeacher?.branch}
                </h4>
              </>
            )}
            {singleTeacher?.ifsc_code && (
              <>
                <label
                  htmlFor="ifsc"
                  className={`${classes.labelText} ${classes.details_label}`}
                >
                  IFSC
                </label>
                <h4 className={classes.detail_text} id="ifsc">
                  {singleTeacher?.ifsc_code}
                </h4>
              </>
            )}
            {singleTeacher?.google_pay && (
              <>
                <label
                  htmlFor="gPay"
                  className={`${classes.labelText} ${classes.details_label}`}
                >
                  Gpay number
                </label>
                <h4 className={classes.detail_text} id="gPay">
                  {singleTeacher?.google_pay}
                </h4>
              </>
            )}
            {singleTeacher?.phone_pay && (
              <>
                <label
                  htmlFor="phonePe"
                  className={`${classes.labelText} ${classes.details_label}`}
                >
                  PhonePe number
                </label>
                <h4 className={classes.detail_text} id="phonePe">
                  {singleTeacher?.phone_pay}
                </h4>
              </>
            )}
          </div>
          <h2 className={classes.heading_text}>Remuneration in Grades</h2>
          {singleTeacher?.remunerations &&
          singleTeacher?.remunerations.length > 0 ? (
            singleTeacher?.remunerations?.map((remuneration) => (
              <div key={remuneration?.id} className={classes.detail_wrapper}>
                <label
                  htmlFor="grade"
                  className={`${classes.labelText} ${classes.details_label}`}
                >
                  {remuneration?.grade_name}
                </label>
                <h4 className={classes.detail_text} id="grade">
                  ₹
                  {parseFloat(remuneration?.min_remuneration)
                    .toFixed(2)
                    .replace(/\.00$/, "")}{" "}
                  - ₹
                  {parseFloat(remuneration?.max_remuneration)
                    .toFixed(2)
                    .replace(/\.00$/, "")}
                </h4>
              </div>
            ))
          ) : (
            <span className={classes.notfound_text}>
              No remunerations found
            </span>
          )}
          <h2 className={classes.heading_text}>Additional details</h2>
          <div className={classes.detail_wrapper}>
            <label
              htmlFor="about"
              className={`${classes.labelText} ${classes.details_label}`}
            >
              About
            </label>
            <h4 className={classes.detail_text} id="about">
              {singleTeacher?.about}
            </h4>
            <label
              htmlFor="remarks"
              className={`${classes.labelText} ${classes.details_label}`}
            >
              Remarks
            </label>
            <h4 className={classes.detail_text} id="remarks">
              {singleTeacher?.remark}
            </h4>
            {singleTeacher?.additional_info && (
              <>
                <label
                  htmlFor="additional_info"
                  className={`${classes.labelText} ${classes.details_label}`}
                >
                  Additional info
                </label>
                <h4 className={classes.detail_text} id="additional_info">
                  {singleTeacher?.additional_info}
                </h4>
              </>
            )}
            {singleTeacher?.video_link && (
              <>
                <label
                  htmlFor="demoVideo"
                  className={`${classes.labelText} ${classes.details_label}`}
                >
                  Demo video
                </label>
                <h4 className={classes.detail_text} id="demoVideo">
                  <Link to={`${singleTeacher?.video_link}`}>
                    {singleTeacher?.video_link}
                  </Link>
                </h4>
              </>
            )}
          </div>
        </div>
        <DownloadButton onClick={handleOpenSelectGradeModal} />
        <GeneratedImage
          forwardedRef={imageRef}
          teacherName={singleTeacher?.teacher_name}
          about={singleTeacher?.about}
          experience={singleTeacher?.experience}
          englishProficiency={singleTeacher?.english_fluency}
          qualification={singleTeacher?.qualification}
          rating={singleTeacher?.total_rating}
          amount={remunerationAmount}
        />
      </div>
      {deleteModal && (
        <ConfirmModal
          headingText={"Are you sure you want to delete this teacher?"}
          paraText={"This action cannot be undone."}
          confirmText={"Delete"}
          handleSubmit={handleDeleteTeacher}
          handleCancel={handleCloseDeleteModal}
        />
      )}
      {blacklistModal && (
        <ConfirmModal
          headingText={"Confirm blacklisting this teacher?"}
          paraText={
            "You have the option to unmark this teacher from the blacklist at any time if needed."
          }
          confirmText={"Confirm"}
          handleSubmit={handleAddToBlacklist}
          handleCancel={handleCloseBlacklistModal}
        />
      )}
      {removeblacklistModal && (
        <ConfirmModal
          headingText={"Remove from Blacklist"}
          paraText={
            "Removing this teacher from the blacklist restores regular status."
          }
          confirmText={"Confirm"}
          handleSubmit={handleRemovefromBlacklist}
          handleCancel={handleCloseBlacklistModal}
        />
      )}
      {selectGradeModal && (
        <SelectGradeModal
          grades={singleTeacher?.remunerations}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          handleSubmit={handleOpenSetAmountModal}
          handleCancel={handleCloseSelectGradeModal}
        />
      )}
      {setAmountModal && (
        <SetAmountModal
          gradeId={selectedGrade}
          grades={singleTeacher?.remunerations}
          handleSubmit={handleDownload}
          handleCancel={handleCloseSetAmountModal}
        />
      )}
    </>
  );
};
