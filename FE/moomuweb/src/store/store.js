import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import tokenReducer from "../reducers/tokenSlice";

export default configureStore({
  reducer: { token: tokenReducer },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
