import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { ThunkAction } from "redux-thunk";

import { configureStore } from "@reduxjs/toolkit";
import type { Action } from "@reduxjs/toolkit";

import { rootReducer } from "@store/rootReducer";

/* next.d.ts 생성 후 process 해결됨, 그런데 왜 store에서는 읽히고 다른 폴더에서는 안 읽히는지 모름 */
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_ENABLE_REDUX_DEV_TOOLS === "true",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
