import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import tokenReducer from "../reducers/tokenSlice";
import stationReducer from "../reducers/stationSlice";
import selectionReducer from "../reducers/selectionSlice";

export const store = configureStore({
  reducer: { token: tokenReducer, station: stationReducer, selection: selectionReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
