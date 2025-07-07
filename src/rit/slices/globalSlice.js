import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  globalValue: 1,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalValue: (state, action) => {
      state.globalValue = action.payload;
    },
  },
});

export const { setGlobalValue } = globalSlice.actions;
export default globalSlice.reducer;
