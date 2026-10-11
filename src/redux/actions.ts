import { createAction } from "@reduxjs/toolkit";

import type { SavedMachine } from "@/lib/machine";

export const loadMachine = createAction<SavedMachine>("machine/load");
