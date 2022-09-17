import { configureStore } from "@reduxjs/toolkit";
import usernameReducer from "./usernameReducer";
import passwordReducer from "./passwordReducer";
import loggedUserReducer from "./loggedUserReducer";
import blogReducer from "./blogReducer";
import allBlogsRed from "./allBlogsRed";
const store = configureStore({
  reducer: {
    username: usernameReducer,
    password: passwordReducer,
    user: loggedUserReducer,
    blogList: blogReducer,
    allBlogs: allBlogsRed,
  },
});

export default store;
