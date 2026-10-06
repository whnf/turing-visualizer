import { createAction } from "@reduxjs/toolkit";

import { type SavedMachine } from "@/lib/storage";

export const loadMachine = createAction<SavedMachine>("machine/load");
