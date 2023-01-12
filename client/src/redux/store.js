import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { linksReducer } from "./slices/links";

const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linksReducer,
  },
});

export default store;
