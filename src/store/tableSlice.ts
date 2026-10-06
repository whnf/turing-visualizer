import { createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";
import type { EntityState, PayloadAction } from "@reduxjs/toolkit";

import { loadMachine } from "@/store/actions";

export type ID = string;

export const INITIAL_ID: ID = "initial";
export const BLANK_ID: ID = "blank";

export type Phase = {
  id: ID;
  name: string;
};

export type Token = {
  id: ID;
  name: string;
};

export type Move = "L" | "S" | "R";

export type Transition = {
  nextPhaseId?: ID;
  nextTokenId?: ID;
  move: Move;
};

export type TableState = {
  phases: EntityState<Phase, ID>;
  tokens: EntityState<Token, ID>;
  transitions: Record<ID, Record<ID, Transition>>;
};

const phasesAdapter = createEntityAdapter<Phase>();
const tokensAdapter = createEntityAdapter<Token>();

const initialState: TableState = {
  phases: phasesAdapter.setAll(phasesAdapter.getInitialState(), [
    { id: INITIAL_ID, name: "q0" },
  ]),
  tokens: tokensAdapter.setAll(tokensAdapter.getInitialState(), [
    { id: BLANK_ID, name: "_" },
  ]),
  transitions: {},
};

const phaseSelectors = phasesAdapter.getSelectors(
  (state: TableState) => state.phases,
);
const tokenSelectors = tokensAdapter.getSelectors(
  (state: TableState) => state.tokens,
);

function nextFreeName<T extends { name: string }>(
  state: EntityState<T, ID>,
  prefix: string,
) {
  const names = new Set(Object.values(state.entities).map((e) => e.name));
  let n = 0;
  while (names.has(`${prefix}${n}`)) {
    n++;
  }
  return `${prefix}${n}`;
}

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addPhase: {
      reducer(state, action: PayloadAction<ID>) {
        phasesAdapter.addOne(state.phases, {
          id: action.payload,
          name: nextFreeName(state.phases, "q"),
        });
      },
      prepare() {
        return { payload: nanoid() };
      },
    },
    renamePhase(state, action: PayloadAction<{ id: ID; name: string }>) {
      const { id, name } = action.payload;

      phasesAdapter.updateOne(state.phases, { id, changes: { name } });
    },
    removePhase(state, action: PayloadAction<ID>) {
      const id = action.payload;

      if (id === INITIAL_ID) {
        return;
      }

      phasesAdapter.removeOne(state.phases, id);
      delete state.transitions[id];

      for (const row of Object.values(state.transitions)) {
        for (const col of Object.values(row)) {
          if (col.nextPhaseId === id) {
            col.nextPhaseId = undefined;
          }
        }
      }
    },
    addToken: {
      reducer(state, action: PayloadAction<ID>) {
        tokensAdapter.addOne(state.tokens, {
          id: action.payload,
          name: nextFreeName(state.tokens, ""),
        });
      },
      prepare() {
        return { payload: nanoid() };
      },
    },
    renameToken(state, action: PayloadAction<{ id: ID; name: string }>) {
      const { id, name } = action.payload;

      tokensAdapter.updateOne(state.tokens, { id, changes: { name } });
    },
    removeToken(state, action: PayloadAction<ID>) {
      const id = action.payload;

      if (id === BLANK_ID) {
        return;
      }

      tokensAdapter.removeOne(state.tokens, id);
      for (const row of Object.values(state.transitions)) {
        delete row[id];

        for (const col of Object.values(row)) {
          if (col.nextTokenId === id) {
            col.nextTokenId = undefined;
          }
        }
      }
    },
    setTransition(
      state,
      action: PayloadAction<{
        phaseId: ID;
        tokenId: ID;
        changes: Partial<Transition>;
      }>,
    ) {
      const { phaseId, tokenId, changes } = action.payload;

      if (!state.transitions[phaseId]) {
        state.transitions[phaseId] = {};
      }

      if (!state.transitions[phaseId][tokenId]) {
        state.transitions[phaseId][tokenId] = {
          nextPhaseId: undefined,
          nextTokenId: undefined,
          move: "S",
        };
      }

      Object.assign(state.transitions[phaseId][tokenId], changes);
    },
  },
  extraReducers: (builder) =>
    builder.addCase(loadMachine, (state, action) => {
      phasesAdapter.setAll(state.phases, action.payload.phases);
      tokensAdapter.setAll(state.tokens, action.payload.tokens);
      state.transitions = action.payload.transitions;
    }),
  selectors: {
    selectPhases: phaseSelectors.selectAll,
    selectPhaseById: phaseSelectors.selectById,
    selectPhaseCount: phaseSelectors.selectTotal,
    selectTokens: tokenSelectors.selectAll,
    selectTokenById: tokenSelectors.selectById,
    selectTokenCount: tokenSelectors.selectTotal,
    selectTransitions: (state) => state.transitions,
    selectTransitionByPhaseIdAndTokenId: (state, phaseId: ID, tokenId: ID) =>
      state.transitions[phaseId]?.[tokenId],
    selectNextPhaseByPhaseIdAndTokenId: (state, phaseId: ID, tokenId: ID) => {
      const nextPhaseId = state.transitions[phaseId]?.[tokenId]?.nextPhaseId;
      return nextPhaseId
        ? phaseSelectors.selectById(state, nextPhaseId)
        : undefined;
    },
    selectNextTokenByPhaseIdAndTokenId: (state, phaseId: ID, tokenId: ID) => {
      const nextTokenId = state.transitions[phaseId]?.[tokenId]?.nextTokenId;
      return nextTokenId
        ? tokenSelectors.selectById(state, nextTokenId)
        : undefined;
    },
    selectMoveByPhaseIdAndTokenId: (state, phaseId: ID, tokenId: ID) => {
      return state.transitions[phaseId]?.[tokenId]?.move;
    },
  },
});

export const {
  addPhase,
  renamePhase,
  removePhase,
  addToken,
  renameToken,
  removeToken,
  setTransition,
} = tableSlice.actions;

export const {
  selectPhases,
  selectPhaseById,
  selectPhaseCount,
  selectTokens,
  selectTokenById,
  selectTokenCount,
  selectTransitions,
  selectTransitionByPhaseIdAndTokenId,
  selectNextPhaseByPhaseIdAndTokenId,
  selectNextTokenByPhaseIdAndTokenId,
  selectMoveByPhaseIdAndTokenId,
} = tableSlice.selectors;

export default tableSlice.reducer;
