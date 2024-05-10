import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./axiosInstance";

export const dashboardSearchApi = createAsyncThunk(
  "filter/dashboardSearchApi",
  async ({ input, pageNumber }) => {
    const response = await axiosApi.get(
      `/qlive/store/teacher/?search=${input}&page=${pageNumber}`
    );
    sessionStorage.removeItem("dashboardFilters");
    return response.data;
  }
);

export const teacherSearchApi = createAsyncThunk(
  "filter/teacherSearchApi",
  async ({ input, pageNumber }) => {
    const response = await axiosApi.get(
      `/qlive/store/teacher/?search=${input}&page=${pageNumber}`
    );
    sessionStorage.removeItem("teacherFilters");
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResultDashboard: [],
    searchResultTeacher: [],
    searchLoading: false,
    searchWarning: null,
    searchTeacherWarning: null,
    searchTotalPages:1,
    searchTeacherTotalPages:1,
  },
  reducers: {
    resetSearchResults(state) {
      state.searchResultDashboard = [];
      state.searchWarning= null
    },
    resetTeacherSearchResults(state) {
      state.searchResultTeacher = [];
      state.searchTeacherWarning= null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(teacherSearchApi.pending, (state, action) => {
        state.searchLoading = true;
      })
      .addCase(teacherSearchApi.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchTeacherTotalPages = action.payload.total_pages;
        const newResults = action.payload.results;

        if (newResults.length === 0 && state.searchResultTeacher.length === 0) {
          // Handle case where no results are found
          state.searchTeacherWarning = "Couldn't find any teacher with that name!";
        } else {
          state.searchTeacherWarning = null;
      
          // Filter out duplicates from newResults
          const uniqueNewResults = newResults.filter(newResult => (
            !state.searchResultTeacher.some(existingResult => (
              existingResult.id === newResult.id // Assuming each item has a unique identifier like "id"
            ))
          ));
      
          // Concatenate the unique new results with existing results
          // Make sure to update state immutably
          state.searchResultTeacher = [...state.searchResultTeacher, ...uniqueNewResults];
        }
      })
      .addCase(dashboardSearchApi.pending, (state, action) => {
        state.searchLoading = true;
      })
      .addCase(dashboardSearchApi.fulfilled, (state, action) => {
        state.loading = false;
        state.searchLoading = false;
        state.searchTotalPages = action.payload.total_pages;
        const newResults = action.payload.results;
        if (newResults.length === 0 && state.searchResultDashboard.length === 0) {
          // Handle case where no results are found
          state.searchWarning = "Couldn't find any teacher with that name!";
        } else {
          state.searchWarning = null;
      
          // Filter out duplicates from newResults
          const uniqueNewResults = newResults.filter(newResult => (
            !state.searchResultDashboard.some(existingResult => (
              existingResult.id === newResult.id // Assuming each item has a unique identifier like "id"
            ))
          ));
      
          // Concatenate the unique new results with existing results
          // Make sure to update state immutably
          state.searchResultDashboard = [...state.searchResultDashboard, ...uniqueNewResults];
        }
      });    
  },
});

export default searchSlice.reducer;
