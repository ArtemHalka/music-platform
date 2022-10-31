import {configureStore, Store} from '@reduxjs/toolkit';
import {rootReducer, RootState} from "./reducers";
import thunk from "redux-thunk";
import {createWrapper} from "next-redux-wrapper";

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(thunk),
  })
}

export const store = makeStore();
export const wrapper = createWrapper<Store<RootState>>(makeStore);
