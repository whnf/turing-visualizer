import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

import { saveSpeed } from "@/lib/storage";

import metaReducer from "@/store/metaSlice";
import runnerReducer, { setSpeed } from "@/store/runnerSlice";
import tableReducer from "@/store/tableSlice";
import tapeReducer from "@/store/tapeSlice";

const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: setSpeed,
  effect: ({ payload }) => saveSpeed(payload),
});

export const store = configureStore({
  reducer: {
    meta: metaReducer,
    runner: runnerReducer,
    table: tableReducer,
    tape: tapeReducer,
  },
  middleware: (getDefault) => getDefault().prepend(listener.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
