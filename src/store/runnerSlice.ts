import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { loadMachine } from "@/store/actions";

type RunnerState = {
  running: boolean;
  speed: number;
};

const initialState: RunnerState = {
  running: false,
  speed: 1,
};

const runnerSlice = createSlice({
  name: "runner",
  initialState,
  reducers: {
    run(state) {
      state.running = true;
    },
    pause(state) {
      state.running = false;
    },
    setSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMachine, (state) => {
      state.running = false;
    });
  },
  selectors: {
    selectRunning: (state) => state.running,
    selectSpeed: (state) => state.speed,
  },
});

export const { run, pause, setSpeed } = runnerSlice.actions;

export const { selectRunning, selectSpeed } = runnerSlice.selectors;

export default runnerSlice.reducer;
