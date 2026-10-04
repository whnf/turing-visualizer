import { createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";
import type { EntityState, PayloadAction } from "@reduxjs/toolkit";

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

const initialPhases: Phase[] = [
  { id: INITIAL_ID, name: "q0" },
  { id: "q1", name: "q1" },
  { id: "q2", name: "q2" },
  { id: "q3", name: "q3" },
  { id: "q4", name: "q4" },
  { id: "q5", name: "q5" },
  { id: "qa", name: "qa" },
  { id: "qr", name: "qr" },
];

const initialTokens: Token[] = [
  { id: BLANK_ID, name: "\u2423" },
  { id: "t0", name: "0" },
  { id: "t1", name: "1" },
  { id: "tx", name: "X" },
];

const initialTransitions: Record<ID, Record<ID, Transition>> = {
  [INITIAL_ID]: {
    [BLANK_ID]: { nextPhaseId: "qa", nextTokenId: BLANK_ID, move: "S" },
    t0: { nextPhaseId: "q1", nextTokenId: "tx", move: "R" },
    t1: { nextPhaseId: "q2", nextTokenId: "tx", move: "R" },
    tx: { nextPhaseId: "qa", nextTokenId: "tx", move: "S" },
  },
  q1: {
    [BLANK_ID]: { nextPhaseId: "q3", nextTokenId: BLANK_ID, move: "L" },
    t0: { nextPhaseId: "q1", nextTokenId: "t0", move: "R" },
    t1: { nextPhaseId: "q1", nextTokenId: "t1", move: "R" },
    tx: { nextPhaseId: "q3", nextTokenId: "tx", move: "L" },
  },
  q2: {
    [BLANK_ID]: { nextPhaseId: "q4", nextTokenId: BLANK_ID, move: "L" },
    t0: { nextPhaseId: "q2", nextTokenId: "t0", move: "R" },
    t1: { nextPhaseId: "q2", nextTokenId: "t1", move: "R" },
    tx: { nextPhaseId: "q4", nextTokenId: "tx", move: "L" },
  },
  q3: {
    [BLANK_ID]: { nextPhaseId: "qa", nextTokenId: BLANK_ID, move: "S" },
    t0: { nextPhaseId: "q5", nextTokenId: "tx", move: "L" },
    t1: { nextPhaseId: "qr", nextTokenId: "t1", move: "S" },
    tx: { nextPhaseId: "qa", nextTokenId: "tx", move: "S" },
  },
  q4: {
    [BLANK_ID]: { nextPhaseId: "qa", nextTokenId: BLANK_ID, move: "S" },
    t0: { nextPhaseId: "qr", nextTokenId: "t0", move: "S" },
    t1: { nextPhaseId: "q5", nextTokenId: "tx", move: "L" },
    tx: { nextPhaseId: "qa", nextTokenId: "tx", move: "S" },
  },
  q5: {
    [BLANK_ID]: { nextPhaseId: INITIAL_ID, nextTokenId: BLANK_ID, move: "R" },
    t0: { nextPhaseId: "q5", nextTokenId: "t0", move: "L" },
    t1: { nextPhaseId: "q5", nextTokenId: "t1", move: "L" },
    tx: { nextPhaseId: INITIAL_ID, nextTokenId: "tx", move: "R" },
  },
};

const initialState: TableState = {
  phases: phasesAdapter.setAll(phasesAdapter.getInitialState(), initialPhases),
  tokens: tokensAdapter.setAll(tokensAdapter.getInitialState(), initialTokens),
  transitions: initialTransitions,
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
  selectors: {
    selectPhases: phaseSelectors.selectAll,
    selectPhaseById: phaseSelectors.selectById,
    selectTokens: tokenSelectors.selectAll,
    selectTokenById: tokenSelectors.selectById,
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
  selectTokens,
  selectTokenById,
  selectTransitions,
  selectTransitionByPhaseIdAndTokenId,
  selectNextPhaseByPhaseIdAndTokenId,
  selectNextTokenByPhaseIdAndTokenId,
  selectMoveByPhaseIdAndTokenId,
} = tableSlice.selectors;

export default tableSlice.reducer;
