import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  english_fluency: '',
  interview_rating: '',
  success_demo: 0,
  failed_demo: 0,
  teacher_change: 0,
};

const teacherSkillSlice = createSlice({
  name: 'teacherSkill',
  initialState,
  reducers: {
    updateSkillField(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
});

export const { updateSkillField } = teacherSkillSlice.actions;
export default teacherSkillSlice.reducer;
