import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Teachers } from "./pages/Teachers/Teachers";
import { Subjects } from "./pages/Subjects/Subjects";
import { Settings } from "./pages/Settings/Settings";
import { AddTeacherProfile } from "./pages/AddTeacher/AddTeacherProfile";
import { AddTeacherContact } from "./pages/AddTeacher/AddTeacherContact";
import { AddTeacherFinances } from "./pages/AddTeacher/AddTeacherFinances";
import { AddTeacherSkills } from "./pages/AddTeacher/AddTeacherSkills";
import { TeacherProfile } from "./pages/TeacherProfile/TeacherProfile";
import { EditTeacher } from "./pages/EditTeacher/EditTeacher";
import { ChangePassword } from "./pages/Auth/ChangePassword/ChangePassword";
import { Filters } from "./pages/Filters/Filters";
import { Login } from "./pages/Auth/Login/Login";
import { ResetPassword } from "./pages/Auth/ResetPassword/ResetPassword";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { Grades } from "./pages/Grades/Grades";
import { SetRemuneration } from "./pages/AddTeacher/SetRemuneration";
import { ResetPin } from "./pages/Auth/ResetPassword/ResetPin";
import { UpdatePassword } from "./pages/Auth/ResetPassword/UpdatePassword";
import { EditRemuneration } from "./pages/EditRemuneration/EditRemuneration";
import { StaffPortal } from "./pages/StaffPortal/StaffPortal";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("qlive_token");
  const role = localStorage.getItem("qlive_role");

  useEffect(() => {
    const clearSessionStorage = () => {
      sessionStorage.removeItem("dashboardFilters");
      sessionStorage.removeItem("teacherFilters");
    };

    window.addEventListener("beforeunload", clearSessionStorage);

    return () => {
      window.removeEventListener("beforeunload", clearSessionStorage);
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* Home Pages */}
        {token && role === "admin" ? (
          <Route path="/" element={<Dashboard />} />
        ) : token && role === "staff" ? (
          <Route path="/" element={<StaffPortal />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}

        {/* 404 page */}
        <Route path="*" element={<PageNotFound />} />

        {/* Forgot Password */}
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/resetpin" element={<ResetPin />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />

        {token && (
          <>
            {/* home pages */}
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/grades" element={<Grades />} />

            {/* settings page */}
            <Route path="/settings" element={<Settings />} />

            {/* Change Password */}
            <Route path="/changepassword" element={<ChangePassword />} />

            {/* Add Teacher Pages */}
            <Route path="/addteacherprofile" element={<AddTeacherProfile />} />
            <Route path="/addteachercontact" element={<AddTeacherContact />} />
            <Route
              path="/addteacherfinances"
              element={<AddTeacherFinances />}
            />
            <Route path="/addteacherskills" element={<AddTeacherSkills />} />
            <Route path="/setremuneration" element={<SetRemuneration />} />

            {/* Teacher Profile */}
            <Route path="/teacherprofile/:id" element={<TeacherProfile />} />

            {/* Edit Teacher */}
            <Route path="/editteacher/:id" element={<EditTeacher />} />
            <Route path="/edit-remuneration" element={<EditRemuneration />} />

            {/* Filters Page */}
            <Route path="/filters" element={<Filters />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
