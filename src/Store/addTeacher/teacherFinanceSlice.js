import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bank_name: '',
  account_no: '',
  bank_acc_holder_name: '',
  branch: '',
  ifsc_code: '',
  google_pay: '',
  phone_pay: '',
};

const financesSlice = createSlice({
  name: 'teacherFinance',
  initialState,
  reducers: {
    updateFinancesField(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
});

export const { updateFinancesField } = financesSlice.actions;
export default financesSlice.reducer;
