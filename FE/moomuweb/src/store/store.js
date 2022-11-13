import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import tokenReducer from "../reducers/tokenSlice";
import stationReducer from "../reducers/stationSlice";

export const store = configureStore({
  reducer: { token: tokenReducer, station: stationReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;