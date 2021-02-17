import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";

// configure store

// configure root reducer pasing state and action argument
// function rootReducer(state = {}, action) {
//   return {
//     counter: counterReducer(state.counter, action),
//   };
// }
// configure root reducer using combineReducers
// export const rootReducer = combineReducers({
//   counter: counterReducer,
// });

/* Configure store */

export default configureStore({
  reducer: {
    // counter: get the reducer from counterSlice name
    counter: counterReducer,
  },
});

// const store = configureStore({
//   reducer: rootReducer,
// });

// configure store using createSore()
// const store = createStore(rootReducer);
// export default store;
