import {
  createEntityAdapter,
  createSlice,
  nanoid,
  type EntityState,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  BLANK,
  defaultMachine,
  Q0,
  type Phase,
  type Token,
  type Transition,
} from "@/lib/machine";

import { loadMachine } from "@/redux/actions";

export type TableState = {
  phases: EntityState<Phase, string>;
  tokens: EntityState<Token, string>;
  transitions: Record<string, Record<string, Transition>>;
};

const phasesAdapter = createEntityAdapter<Phase>();
const tokensAdapter = createEntityAdapter<Token>();

const initialState: TableState = {
  phases: phasesAdapter.setAll(
    phasesAdapter.getInitialState(),
    defaultMachine.phases,
  ),
  tokens: tokensAdapter.setAll(
    tokensAdapter.getInitialState(),
    defaultMachine.tokens,
  ),
  transitions: defaultMachine.transitions,
};

const phaseSelectors = phasesAdapter.getSelectors(
  (state: TableState) => state.phases,
);
const tokenSelectors = tokensAdapter.getSelectors(
  (state: TableState) => state.tokens,
);

function nextFreeName<T extends { name: string }>(
  state: EntityState<T, string>,
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
    appendPhase: {
      reducer(state, action: PayloadAction<string>) {
        phasesAdapter.addOne(state.phases, {
          id: action.payload,
          name: nextFreeName(state.phases, "q"),
        });
      },
      prepare() {
        return { payload: nanoid() };
      },
    },
    renamePhase(state, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload;

      phasesAdapter.updateOne(state.phases, { id, changes: { name } });
    },
    deletePhase(state, action: PayloadAction<string>) {
      const id = action.payload;

      if (id === Q0) {
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
    appendToken: {
      reducer(state, action: PayloadAction<string>) {
        tokensAdapter.addOne(state.tokens, {
          id: action.payload,
          name: nextFreeName(state.tokens, ""),
        });
      },
      prepare() {
        return { payload: nanoid() };
      },
    },
    renameToken(state, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload;

      tokensAdapter.updateOne(state.tokens, { id, changes: { name } });
    },
    deleteToken(state, action: PayloadAction<string>) {
      const id = action.payload;

      if (id === BLANK) {
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
        phaseId: string;
        tokenId: string;
        changes: Partial<Transition>;
      }>,
    ) {
      const { phaseId, tokenId, changes } = action.payload;

      if (!state.transitions[phaseId]) {
        state.transitions[phaseId] = {};
      }

      if (!state.transitions[phaseId][tokenId]) {
        state.transitions[phaseId][tokenId] = {};
      }

      Object.assign(state.transitions[phaseId][tokenId], changes);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMachine, (state, action) => {
      phasesAdapter.setAll(state.phases, action.payload.phases);
      tokensAdapter.setAll(state.tokens, action.payload.tokens);
      state.transitions = action.payload.transitions;
    });
  },
  selectors: {
    selectPhases: phaseSelectors.selectAll,
    selectPhaseById: phaseSelectors.selectById,
    selectPhaseCount: phaseSelectors.selectTotal,
    selectTokens: tokenSelectors.selectAll,
    selectTokenById: tokenSelectors.selectById,
    selectTokenCount: tokenSelectors.selectTotal,
    selectTransitions: (state) => state.transitions,
    selectTransition: (state, phaseId: string, tokenId: string) =>
      state.transitions[phaseId]?.[tokenId],
    selectNextPhase: (state, phaseId: string, tokenId: string) => {
      const nextPhaseId = state.transitions[phaseId]?.[tokenId]?.nextPhaseId;
      return nextPhaseId
        ? phaseSelectors.selectById(state, nextPhaseId)
        : undefined;
    },
    selectNextToken: (state, phaseId: string, tokenId: string) => {
      const nextTokenId = state.transitions[phaseId]?.[tokenId]?.nextTokenId;
      return nextTokenId
        ? tokenSelectors.selectById(state, nextTokenId)
        : undefined;
    },
    selectMove: (state, phaseId: string, tokenId: string) => {
      return state.transitions[phaseId]?.[tokenId]?.move;
    },
  },
});

export const {
  appendPhase,
  renamePhase,
  deletePhase,
  appendToken,
  renameToken,
  deleteToken,
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
  selectTransition,
  selectNextPhase,
  selectNextToken,
  selectMove,
} = tableSlice.selectors;

export default tableSlice.reducer;
