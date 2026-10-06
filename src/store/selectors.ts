import { createSelector } from "@reduxjs/toolkit";

import type { SavedMachine } from "@/lib/storage";

import type { RootState } from "@/store/store";
import {
  selectPhaseById,
  selectPhases,
  selectTokens,
  selectTransition,
  selectTransitions,
} from "@/store/tableSlice";
import { selectPhaseId, selectTokenId } from "@/store/tapeSlice";

export const selectInput = (state: RootState) =>
  state.tape.past[0] ?? state.tape.present;

export const selectCurrentPhase = (state: RootState) =>
  selectPhaseById(state, selectPhaseId(state));

export const selectCurrentTransition = (state: RootState) =>
  selectTransition(state, selectPhaseId(state), selectTokenId(state));

export const selectSavedMachine = createSelector(
  [
    (state: RootState) => state.meta,
    selectPhases,
    selectTokens,
    selectTransitions,
    selectInput,
  ],
  (meta, phases, tokens, transitions, { cells, head }): SavedMachine => ({
    ...meta,
    phases,
    tokens,
    transitions,
    cells,
    head,
  }),
);
