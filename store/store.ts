import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

const rootReducer = combineReducers({ [api.reducerPath]: api.reducer });

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault().concat(api.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
