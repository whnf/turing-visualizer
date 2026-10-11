import { createAction } from "@reduxjs/toolkit";

import type { Machine } from "@/lib/machine";

export const openMachine = createAction<Machine>("machine/open");
