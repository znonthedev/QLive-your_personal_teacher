import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./axiosInstance";

// Login Api
export const loginApi = createAsyncThunk(
  "auth/loginApi",
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/account/login/", userData);
      localStorage.setItem("qlive_token", response.data.token);
      localStorage.setItem("qlive_role", response.data.role);
      window.location.reload();
      navigate("/");
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error_message || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

// Logout Api
export const logoutApi = createAsyncThunk(
  "auth/logoutApi",
  async (navigate) => {
    try {
      const response = await axiosApi.post("/account/logout/");
      localStorage.clear();
      navigate("/");
      sessionStorage.clear();
      window.location.reload();
      return response.data;
    } catch (error) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
      window.location.reload();
      console.error("Logout error:", error);
      throw error;
    }
  }
);

// Reset Password Api
export const resetPasswordApi = createAsyncThunk(
  "auth/resetPasswordApi",
  async ({ email, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(
        "/account/resetpassword/",
        {
          email: email,
        },
        {
          // Override the timeout for this specific request
          timeout: 0,
        }
      );
      localStorage.setItem("otp_instance", response?.data?.otp_instance);
      navigate("/resetpin");
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.email?.[0] || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

// Reset Pin Api
export const resetPinApi = createAsyncThunk(
  "auth/resetPinApi",
  async ({ input, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/account/confirmotp/", input);
      navigate("/updatepassword");
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.non_field_errors?.[0] || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

// Confirm Password Api
export const confirmPasswordApi = createAsyncThunk(
  "auth/confirmPasswordApi",
  async ({ input, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/account/confirmpassword/", input);
      navigate("/");
      localStorage.removeItem("otp_instance");
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginApi.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(resetPasswordApi.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(resetPasswordApi.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(resetPinApi.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(resetPinApi.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(confirmPasswordApi.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(confirmPasswordApi.fulfilled, (state) => {
        state.error = null;
      });
  },
});

export default authSlice.reducer;
