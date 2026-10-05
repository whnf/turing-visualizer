import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type RunnerState = {
  speed: number;
  status: "idle" | "running";
};

const initialState: RunnerState = {
  speed: 1,
  status: "idle",
};

const runnerSlice = createSlice({
  name: "runner",
  initialState,
  reducers: {
    setSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
    },
    run(state) {
      state.status = "running";
    },
    stop(state) {
      state.status = "idle";
    },
  },
});

export const { setSpeed, run, stop } = runnerSlice.actions;

export default runnerSlice.reducer;
