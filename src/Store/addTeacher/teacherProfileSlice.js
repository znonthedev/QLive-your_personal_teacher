// teacherProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teacher_name: '',
  roll_no: '',
  qualification: '',
  experience: '',
  subject: [],
  grades: [], // Add grades field
  about: '',
  remark: '',
  video_link: '',
  available_slot: '',
  filled_slot: '',
  additional_info: ''
};

const teacherProfileSlice = createSlice({
  name: 'teacherProfile',
  initialState,
  reducers: {
    updateTeacherProfileField(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    updateGrades(state, action) {
      state.grades = action.payload;
    },
    updateSubjects(state, action) {
      state.subject = action.payload;
    },
  },
});

export const { updateTeacherProfileField, updateGrades, updateSubjects } = teacherProfileSlice.actions;
export default teacherProfileSlice.reducer;
