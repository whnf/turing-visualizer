import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

import { listener } from "@/redux/listeners";
import meta from "@/redux/reducers/meta";
import runner from "@/redux/reducers/runner";
import table from "@/redux/reducers/table";
import tape from "@/redux/reducers/tape";
import theme from "@/redux/reducers/theme";

export const store = configureStore({
  reducer: {
    meta,
    runner,
    table,
    tape,
    theme,
  },
  middleware: (getDefault) => getDefault().prepend(listener.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
