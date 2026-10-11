import { createListenerMiddleware } from "@reduxjs/toolkit";

import { saveSpeed, saveTheme } from "@/lib/storage";

import { setSpeed } from "@/store/runnerSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { selectTheme, toggleTheme } from "@/store/themeSlice";

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
