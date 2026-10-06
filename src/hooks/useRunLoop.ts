import { useEffect } from "react";

import { useAppDispatch, useAppSelector, useAppStore } from "@/store/hooks";
import { pause, selectRunning, selectSpeed } from "@/store/runnerSlice";
import { selectCurrentTransition } from "@/store/selectors";
import { selectPresent, step } from "@/store/tapeSlice";

export const useRunLoop = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();

  const present = useAppSelector(selectPresent);
  const transition = useAppSelector(selectCurrentTransition);

  const running = useAppSelector(selectRunning);

  useEffect(() => {
    if (!running) {
      return;
    }

    if (!transition?.nextPhaseId) {
      dispatch(pause());
      return;
    }

    const delay = 1000 / selectSpeed(store.getState());
    const id = setTimeout(() => dispatch(step(transition)), delay);
    return () => clearTimeout(id);
  }, [running, present, transition, dispatch, store]);
};
