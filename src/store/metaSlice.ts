import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { loadMachine } from "@/store/actions";

type MetaState = {
  id: string;
  title: string;
  description: string;
  updatedAt: number;
};

const initialState: MetaState = {
  id: "",
  title: "",
  description: "",
  updatedAt: 0,
};

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
    builder.addCase(loadMachine, (state, action) => {
      const { id, title, description, updatedAt } = action.payload;

      Object.assign(state, { id, title, description, updatedAt });
    });
  },
  selectors: {
    selectTitle: (state) => state.title,
    selectDescription: (state) => state.description,
  },
});

export const { setTitle, setDescription } = metaSlice.actions;

export const { selectTitle, selectDescription } = metaSlice.selectors;

export default metaSlice.reducer;
