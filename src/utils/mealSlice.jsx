import { createSlice } from '@reduxjs/toolkit';

const mealSlice = createSlice({
  name: 'meal',
  initialState: [],
  reducers: {
    setMeals: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMeals } = mealSlice.actions;
export default mealSlice.reducer;