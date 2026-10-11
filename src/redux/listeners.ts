import { createListenerMiddleware } from "@reduxjs/toolkit";

import { saveSpeed, saveTheme } from "@/lib/storage";

import { setSpeed } from "@/redux/reducers/runner";
import { selectTheme, toggleTheme } from "@/redux/reducers/theme";
import type { AppDispatch, RootState } from "@/redux/store";

export const listener = createListenerMiddleware();

const startAppListening = listener.startListening.withTypes<
  RootState,
  AppDispatch
>();

startAppListening({
  actionCreator: setSpeed,
  effect: ({ payload }) => saveSpeed(payload),
});

startAppListening({
  actionCreator: toggleTheme,
  effect: (_, api) => saveTheme(selectTheme(api.getState())),
});
