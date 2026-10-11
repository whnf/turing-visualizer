import { configureStore } from "@reduxjs/toolkit";

import { listener } from "@/store/listeners";
import metaReducer from "@/store/metaSlice";
import runnerReducer from "@/store/runnerSlice";
import tableReducer from "@/store/tableSlice";
import tapeReducer from "@/store/tapeSlice";
import themeReducer from "@/store/themeSlice";

export const store = configureStore({
  reducer: {
    meta: metaReducer,
    runner: runnerReducer,
    table: tableReducer,
    tape: tapeReducer,
    theme: themeReducer,
  },
  middleware: (getDefault) => getDefault().prepend(listener.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
