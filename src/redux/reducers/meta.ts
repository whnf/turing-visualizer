import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { defaultMachine } from "@/lib/machine";

import { openMachine } from "@/redux/actions";

type MetaState = {
  id: string;
  title: string;
  description: string;
  updatedAt: number;
};

const { id, title, description, updatedAt } = defaultMachine;

const initialState: MetaState = { id, title, description, updatedAt };

const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(openMachine, (state, action) => {
      const { id, title, description, updatedAt } = action.payload;

      Object.assign(state, { id, title, description, updatedAt });
    });
  },
  selectors: {
    selectMeta: (state) => state,
    selectTitle: (state) => state.title,
    selectDescription: (state) => state.description,
  },
});

export const { setTitle, setDescription } = metaSlice.actions;

export const { selectMeta, selectTitle, selectDescription } =
  metaSlice.selectors;

export default metaSlice.reducer;
