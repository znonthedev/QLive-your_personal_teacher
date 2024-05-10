// contactSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contact_no: '',
  whatsapp_no: '',
  email: '',
};

const contactSlice = createSlice({
  name: 'teacherContact',
  initialState,
  reducers: {
    updateContactField(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
});

export const { updateContactField } = contactSlice.actions;
export default contactSlice.reducer;
