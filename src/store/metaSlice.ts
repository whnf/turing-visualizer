import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type ID } from "@/store/tableSlice";

type MetaState = {
  id: ID;
  title: string;
  description: string;
};

const initialState: MetaState = {
  id: "",
  title: "",
  description: "",
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
});

export const { setTitle, setDescription } = metaSlice.actions;

export default metaSlice.reducer;
