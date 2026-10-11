import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";

import {
  BLANK,
  defaultMachine,
  Move,
  Q0,
  type Transition,
} from "@/lib/machine";

import { loadMachine } from "@/redux/actions";
import { deleteToken } from "@/redux/reducers/table";

export type Run = {
  cells: Record<number, string>;
  head: number;
  phaseId: string;
};

export type TapeState = {
  past: Run[];
  present: Run;
};

const initialState: TapeState = {
  past: [],
  present: {
    cells: defaultMachine.cells,
    head: defaultMachine.head,
    phaseId: Q0,
  },
};

const tapeSlice = createSlice({
  name: "tape",
  initialState,
  reducers: {
    writeInput(state, action: PayloadAction<string>) {
      if (state.past.length > 0) {
        return;
      }

      if (action.payload === BLANK) {
        delete state.present.cells[state.present.head];
      } else {
        state.present.cells[state.present.head] = action.payload;
      }
    },
    moveHead(state, action: PayloadAction<number>) {
      if (state.past.length > 0) {
        return;
      }

      state.present.head = action.payload;
    },
    step(state, action: PayloadAction<Transition>) {
      const { nextPhaseId, nextTokenId, move } = action.payload;

      if (!nextPhaseId) {
        return;
      }

      state.past.push(current(state.present));

      if (nextTokenId) {
        if (nextTokenId === BLANK) {
          delete state.present.cells[state.present.head];
        } else {
          state.present.cells[state.present.head] = nextTokenId;
        }
      }

      state.present.head += {
        [Move.Left]: -1,
        [Move.Stay]: 0,
        [Move.Right]: 1,
      }[move ?? Move.Stay];
      state.present.phaseId = nextPhaseId;
    },
    back(state) {
      const previous = state.past.pop();

      if (previous) {
        state.present = previous;
      }
    },
    reset(state) {
      state.present = state.past[0] ?? state.present;
      state.past = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMachine, (state, action) => {
        const { cells, head } = action.payload;

        state.past = [];
        state.present = { cells, head, phaseId: Q0 };
      })
      .addCase(deleteToken, (state, action) => {
        for (const { cells } of [state.present, ...state.past]) {
          for (const [index, id] of Object.entries(cells)) {
            if (id === action.payload) {
              delete cells[Number(index)];
            }
          }
        }
      });
  },
  selectors: {
    selectPhaseId: (state) => state.present.phaseId,
    selectTokenId: (state) => state.present.cells[state.present.head] ?? BLANK,
    selectPresent: (state) => state.present,
    selectStarted: (state) => state.past.length > 0,
    selectStepCount: (state) => state.past.length,
  },
});

export const { writeInput, moveHead, step, back, reset } = tapeSlice.actions;

export const {
  selectPhaseId,
  selectTokenId,
  selectPresent,
  selectStarted,
  selectStepCount,
} = tapeSlice.selectors;

export default tapeSlice.reducer;
