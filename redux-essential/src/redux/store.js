import { configureStore } from "@reduxjs/toolkit";
import PostsReducer from "./PostsSlice";
import UsersReducer from "./UsersSlice";

export default configureStore({
  reducer: {
    posts: PostsReducer,
    users: UsersReducer,
  },
});
