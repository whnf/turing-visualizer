import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { loadMachine } from "@/store/actions";
import { type ID } from "@/store/tableSlice";

type MetaState = {
  id: ID;
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
  extraReducers: (builder) =>
    builder.addCase(loadMachine, (state, action) => {
      const { id, title, description, updatedAt } = action.payload;

      Object.assign(state, { id, title, description, updatedAt });
    }),
});

export const { setTitle, setDescription } = metaSlice.actions;

export default metaSlice.reducer;
