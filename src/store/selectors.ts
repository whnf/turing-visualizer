import { createSelector } from "@reduxjs/toolkit";

import {
  selectPhases,
  selectTokens,
  selectTransitions,
} from "@/store/tableSlice";
import { type RootState } from "@/store/store";
import { type SavedMachine } from "@/lib/storage";

export const selectSavedMachine = createSelector(
  [
    (s: RootState) => s.meta,
    selectPhases,
    selectTokens,
    selectTransitions,
    (s: RootState) => s.tape.past[0] ?? s.tape.present,
  ],
  (meta, phases, tokens, transitions, { cells, head }): SavedMachine => ({
    ...meta,
    phases,
    tokens,
    transitions,
    tape: { cells, head },
  }),
);
