import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./axiosInstance";

// <-- Teachers Apis starts here -->

// Get All Teachers Api
export const getTeachersApi = createAsyncThunk(
  "admin/getTeachersApi",
  async (pageNumber) => {
    const response = await axiosApi.get(
      `/qlive/store/teacher/?page=${pageNumber}`
    );
    return response.data;
  }
);

// Get List Teacher Api
export const getListTeachersApi = createAsyncThunk(
  "admin/getListTeachersApi",
  async (pageNumber) => {
    const response = await axiosApi.get(
      `/qlive/store/teacher/?page=${pageNumber}`
    );
    return response.data;
  }
);

// Create Teacher Api
export const createTeacherApi = createAsyncThunk(
  "admin/createTeacherApi",
  async ({ teacherData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(
        "/qlive/store/teacher/",
        teacherData
      );
      navigate("/teachers");
      sessionStorage.removeItem("teacherProfileData");
      sessionStorage.removeItem("teacherContactData");
      sessionStorage.removeItem("teacherFinanceData");
      sessionStorage.removeItem("teacherSkillData");
      sessionStorage.removeItem("teacherFilters");
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.roll_no?.[0] || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

// Get Single Teacher Api
export const getSingleTeacherApi = createAsyncThunk(
  "admin/getSingleTeacherApi",
  async (teacherId) => {
    const response = await axiosApi.get(`/qlive/store/teacher/${teacherId}/`);
    return response.data;
  }
);

// Delete Teacher Api
export const deleteTeacherApi = createAsyncThunk(
  "admin/deleteTeacherApi",
  async (teacherId) => {
    const response = await axiosApi.delete(
      `/qlive/store/teacher/${teacherId}/`
    );
    sessionStorage.removeItem("teacherFilters");
    return response?.status;
  }
);

// Edit Teacher Api
export const editTeacherApi = createAsyncThunk(
  "admin/editTeacherApi",
  async ({ teacherId, input }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.put(
        `/qlive/store/teacher/${teacherId}/`,
        input
      );
      sessionStorage.removeItem("teacherFilters");
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.roll_no?.[0] || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

// <-- Teachers Apis ends here -->

// <-- Subjects Apis starts here -->

// Get All Subjects Api
export const getSubjectsApi = createAsyncThunk(
  "admin/getSubjectsApi",
  async () => {
    const response = await axiosApi.get("/qlive/store/subject/");
    return response.data;
  }
);

// Create Subject Api
export const createSubjectApi = createAsyncThunk(
  "admin/createSubjectApi",
  async (input) => {
    const response = await axiosApi.post("/qlive/store/subject/", input);
    return response.data;
  }
);

// Edit Subject Api
export const editSubjectApi = createAsyncThunk(
  "admin/editSubjectApi",
  async ({ subjectId, input }) => {
    const response = await axiosApi.put(
      `/qlive/store/subject/${subjectId}/`,
      input
    );
    return response.data;
  }
);

// Delete Subject Api
export const deleteSubjectApi = createAsyncThunk(
  "admin/deleteSubjectApi",
  async (subjectId) => {
    const response = await axiosApi.delete(
      `/qlive/store/subject/${subjectId}/`
    );
    return response?.status;
  }
);

// <-- Subjects Apis ends here -->

// <-- Grades Apis starts here -->

// Get All Grades Api
export const getGradesApi = createAsyncThunk("admin/getGradesApi", async () => {
  const response = await axiosApi.get("/qlive/store/grade/");
  return response.data;
});

// Create Grade Api
export const createGradeApi = createAsyncThunk(
  "admin/createGradeApi",
  async (input) => {
    const response = await axiosApi.post("/qlive/store/grade/", input);
    return response.data;
  }
);

// Edit Grade Api
export const editGradeApi = createAsyncThunk(
  "admin/editGradeApi",
  async ({ gradeId, input }) => {
    const response = await axiosApi.put(
      `/qlive/store/grade/${gradeId}/`,
      input
    );
    return response.data;
  }
);

// Delete Grade Api
export const deleteGradeApi = createAsyncThunk(
  "admin/deleteGradeApi",
  async (gradeId) => {
    const response = await axiosApi.delete(`/qlive/store/grade/${gradeId}/`);
    return response?.status;
  }
);

// <-- Grades Apis ends here -->

// <-- Staff Apis starts here -->

// Get Staff Api
export const getStaffApi = createAsyncThunk("admin/getStaffApi", async () => {
  const response = await axiosApi.get("/account/register/staff/");
  return response.data;
});

// Change Staff's Password Api
export const changeStaffPasswordApi = createAsyncThunk(
  "admin/changeStaffPasswordApi",
  async ({ staffId, password, navigate }) => {
    const response = await axiosApi.put(
      `/account/staff/update-password/${staffId}/`,
      { password: password }
    );
    navigate("/settings");
    return response.data;
  }
);

// <-- Staff Apis ends here -->

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    error: null,
    allTeachers: [],
    listTeachers: [],
    singleTeacher: {},
    teachersCount: 0,
    allSubjects: [],
    subjectsCount: 0,
    allGrades: [],
    staff: {},
    warning: null,
    totalPages: 1,
    teacherTotalPages: 1,
    paginationLoading: false,
  },
  reducers: {
    resetAllTeachers(state) {
      state.allTeachers = [];
    },
    resetAllListTeachers(state) {
      state.listTeachers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeachersApi.pending, (state, action) => {
        state.paginationLoading = true;
        state.error = null;
      })
      .addCase(getTeachersApi.fulfilled, (state, action) => {
        state.paginationLoading = false;
        state.totalPages = action.payload.total_pages;
        const newTeachers = action.payload?.results;
        // Check if newTeachers is not empty
        if (newTeachers && newTeachers.length > 0) {
          const uniqueNewTeachers = newTeachers.filter(
            (teacher) =>
              !state.allTeachers.find(
                (existingTeacher) => existingTeacher.id === teacher.id
              )
          );
          state.resultIsEmpty = false;
          state.allTeachers = [...state.allTeachers, ...uniqueNewTeachers];
          state.teachersCount = action.payload?.total_count;
        } else {
          state.resultIsEmpty = true;
        }
      })
      .addCase(getTeachersApi.rejected, (state, action) => {
        state.paginationLoading = false;
        state.error = action.error.message;
      })
      .addCase(getListTeachersApi.pending, (state, action) => {
        state.paginationLoading = true;
        state.error = null;
      })
      .addCase(getListTeachersApi.fulfilled, (state, action) => {
        state.paginationLoading = false;
        state.teacherTotalPages = action.payload.total_pages;
        const newTeachers = action.payload?.results;
        // Check if newTeachers is not empty
        if (newTeachers && newTeachers.length > 0) {
          const uniqueNewTeachers = newTeachers.filter(
            (teacher) =>
              !state.listTeachers.find(
                (existingTeacher) => existingTeacher.id === teacher.id
              )
          );
          state.resultIsEmpty = false;
          state.listTeachers = [...state.listTeachers, ...uniqueNewTeachers];
        } else {
          state.resultIsEmpty = true;
        }
      })
      .addCase(getListTeachersApi.rejected, (state, action) => {
        state.loading = false;
        state.paginationLoading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleTeacherApi.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleTeacherApi.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTeacher = action.payload;
      })
      .addCase(getSingleTeacherApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSubjectsApi.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectsApi.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubjects = action.payload?.subjects;
        state.subjectsCount = action.payload?.subject_count;
      })
      .addCase(getSubjectsApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createSubjectApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createSubjectApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createSubjectApi.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteSubjectApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteSubjectApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteSubjectApi.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editSubjectApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editSubjectApi.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editSubjectApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getGradesApi.fulfilled, (state, action) => {
        state.loading = false;
        state.allGrades = action.payload;
      })
      .addCase(getGradesApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createGradeApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createGradeApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createGradeApi.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editGradeApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editGradeApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editGradeApi.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteGradeApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteGradeApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteGradeApi.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createTeacherApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createTeacherApi.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createTeacherApi.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
        state.filteredTeachers = [];
        state.teacherWarning = null;
      })
      .addCase(editTeacherApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editTeacherApi.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(editTeacherApi.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
        state.filteredTeachers = [];
        state.teacherWarning = null;
      })
      .addCase(deleteTeacherApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTeacherApi.fulfilled, (state) => {
        state.loading = false;
        const deletedTeacherId = state.singleTeacher.id;
        state.listTeachers = state.listTeachers.filter(
          (teacher) => teacher.id !== deletedTeacherId
        );
        state.teacherWarning = null;
      })
      .addCase(getStaffApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getStaffApi.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload?.[0];
      })
      .addCase(changeStaffPasswordApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changeStaffPasswordApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(changeStaffPasswordApi.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default adminSlice.reducer;
