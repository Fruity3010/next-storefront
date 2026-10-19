import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { isProductionEnvironment } from '@/utilities/environment';
import { api } from './api/baseApi';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: !isProductionEnvironment()
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
