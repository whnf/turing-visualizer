import { useEffect } from "react";

import { pause, selectRunning, selectSpeed } from "@/redux/reducers/runner";
import { selectPresent, step } from "@/redux/reducers/tape";
import { selectCurrentTransition } from "@/redux/selectors";
import { useAppDispatch, useAppSelector, useAppStore } from "@/redux/store";

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
