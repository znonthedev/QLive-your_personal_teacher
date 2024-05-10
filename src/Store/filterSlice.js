import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./axiosInstance";

// filter Api
export const dashboardFilterApi = createAsyncThunk(
  "filter/dashboardFilterApi",
  async ({ input, pageNumber }) => {
    let queryString = `/qlive/store/teacher/?page=${pageNumber}&`;

    // Construct the query string based on the presence of each input
    if (input.subject) {
      queryString += `subject=${input.subject}&`;
    }
    if (input.experience) {
      queryString += `experience=${input.experience}&`;
    }
    if (input.englishProficiency) {
      queryString += `english_fluency=${input.englishProficiency}&`;
    }
    if (input.rollNo !== undefined) {
      // Check for undefined explicitly
      queryString += `has_roll_no=${input.rollNo}&`;
    }
    if (input.grade) {
      queryString += `grade=${input.grade}&`;
    }

    // Remove the trailing '&' if it exists
    if (queryString.endsWith("&")) {
      queryString = queryString.slice(0, -1);
    }

    const response = await axiosApi.get(queryString);
    return response.data;
  }
);

export const teacherFilterApi = createAsyncThunk(
  "filter/teacherFilterApi",
  async ({ input, pageNumber }) => {
    let queryString = `/qlive/store/teacher/?page=${pageNumber}&`;

    // Construct the query string based on the presence of each input
    if (input.subject) {
      queryString += `subject=${input.subject}&`;
    }
    if (input.experience) {
      queryString += `experience=${input.experience}&`;
    }
    if (input.englishProficiency) {
      queryString += `english_fluency=${input.englishProficiency}&`;
    }
    if (input.rollNo !== undefined) {
      // Check for undefined explicitly
      queryString += `has_roll_no=${input.rollNo}&`;
    }
    if (input.grade) {
      queryString += `grade=${input.grade}&`;
    }

    // Remove the trailing '&' if it exists
    if (queryString.endsWith("&")) {
      queryString = queryString.slice(0, -1);
    }
    const response = await axiosApi.get(queryString);
    return response.data;
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    paginationLoading: false,
    resultIsEmpty: false,
    filteredDashboard: [],
    filteredTeachers: [],
    dashboardwarning: null,
    teacherWarning: null,
    filterTotalPages: 1,
    filterTeacherTotalPages: 1,
    loading: false,
  },
  reducers: {
    resetFilterDashboard(state) {
      state.filteredDashboard = [];
      state.dashboardwarning = null;
    },
    resetFilterTeacher(state) {
      state.filteredTeachers = [];
      state.teacherWarning = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(teacherFilterApi.pending, (state, action) => {
        state.loading = true;
        state.paginationLoading = true;
      })
      .addCase(teacherFilterApi.fulfilled, (state, action) => {
        state.loading = false;
        state.paginationLoading = false;
        state.filterTeacherTotalPages = action.payload.total_pages;
        if (action.payload.results?.length === 0) {
          state.teacherWarning = "No teachers found in this filter!";
          state.filteredTeachers = action.payload.results;
        } else {
          state.teacherWarning = null;
          const newItems = action.payload.results.filter(
            (item) =>
              !state.filteredTeachers.some(
                (existingItem) => existingItem.id === item.id
              )
          );
          // Concatenate the filtered new paginated items to the existing filteredDashboard array
          state.filteredTeachers = [...state.filteredTeachers, ...newItems];
        }
      })
      .addCase(dashboardFilterApi.pending, (state, action) => {
        state.loading = true;
        state.paginationLoading = true;
      })
      .addCase(dashboardFilterApi.fulfilled, (state, action) => {
        state.loading = false;
        state.paginationLoading = false;
        state.filterTotalPages = action.payload.total_pages; // Update totalPages from the API response
        if (action.payload.results?.length === 0) {
          state.dashboardwarning = "No teachers found in this filter!";
          state.filteredDashboard = action.payload.results;
        } else {
          state.dashboardwarning = null;
          // Filter out duplicates from the new paginated items
          const newItems = action.payload.results.filter(
            (item) =>
              !state.filteredDashboard.some(
                (existingItem) => existingItem.id === item.id
              )
          );
          // Concatenate the filtered new paginated items to the existing filteredDashboard array
          state.filteredDashboard = [...state.filteredDashboard, ...newItems];
        }
      });
  },
});

export default filterSlice.reducer;
