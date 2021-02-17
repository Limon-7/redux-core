import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./PostSlice";
import usersReducer from "./UsersSlice";

export default configureStore({
  reducer: {
    post: postReducer,
    users: usersReducer,
  },
});
