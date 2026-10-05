import { configureStore } from "@reduxjs/toolkit";

import runnerReducer from "@/store/runnerSlice";
import tableReducer from "@/store/tableSlice";
import tapeReducer from "@/store/tapeSlice";

export const store = configureStore({
  reducer: {
    runner: runnerReducer,
    table: tableReducer,
    tape: tapeReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
