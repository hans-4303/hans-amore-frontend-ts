import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {
  counter: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    incrementFive(state, action) {
      state.counter = state.counter + parseInt(action.payload.amount);
    },
    customStateValue(state, action) {
      state.counter = state.counter + parseInt(action.payload.amount);
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;

/* 이미 작성된 slice의 reducer만 export default */
export default counterSlice.reducer;