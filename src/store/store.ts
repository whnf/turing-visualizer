import { configureStore } from "@reduxjs/toolkit";

import metaReducer from "@/store/metaSlice";
import runnerReducer from "@/store/runnerSlice";
import tableReducer from "@/store/tableSlice";
import tapeReducer from "@/store/tapeSlice";

export const store = configureStore({
  reducer: {
    meta: metaReducer,
    runner: runnerReducer,
    table: tableReducer,
    tape: tapeReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
