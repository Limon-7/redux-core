import { createSlice } from "@reduxjs/toolkit";
export const slice = createSlice({
  name: "counter",
  initialState: {
    value: 10,
  },
  reducers: {
    increment: (state, action) => {
      state.value += 1;
    },
    decrement: (state, action) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});
export const { increment, decrement, incrementByAmount, reset } = slice.actions;
// selector
export const selectCount = (state) => state.counter.value;
// async redux:
export const incremetAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 3000);
};
export default slice.reducer;
