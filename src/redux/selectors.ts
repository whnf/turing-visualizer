import { createSelector } from "@reduxjs/toolkit";

import type { Machine } from "@/lib/machine";

import { selectMeta } from "@/redux/reducers/meta";
import {
  selectPhaseById,
  selectPhases,
  selectTokens,
  selectTransition,
  selectTransitions,
} from "@/redux/reducers/table";
import {
  selectCurrentPhaseId,
  selectCurrentTokenId,
  selectInitialConfiguration,
} from "@/redux/reducers/tape";
import type { RootState } from "@/redux/store";

export const selectCurrentPhase = (state: RootState) =>
  selectPhaseById(state, selectCurrentPhaseId(state));

export const selectCurrentTransition = (state: RootState) =>
  selectTransition(
    state,
    selectCurrentPhaseId(state),
    selectCurrentTokenId(state),
  );

export const selectMachine = createSelector(
  [
    selectMeta,
    selectPhases,
    selectTokens,
    selectTransitions,
    selectInitialConfiguration,
  ],
  (meta, phases, tokens, transitions, { cells, head }): Machine => ({
    ...meta,
    phases,
    tokens,
    transitions,
    cells,
    head,
  }),
);
