import { useEffect } from "react";

import { useAppSelector, useAppDispatch, useAppStore } from "@/store/hooks";

import { stop } from "@/store/runnerSlice";
import { selectTransitionByPhaseIdAndTokenId } from "@/store/tableSlice";
import { selectPhaseId, selectTokenId, step } from "@/store/tapeSlice";

export const useRunLoop = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();

  const present = useAppSelector((state) => state.tape.present);
  const transition = useAppSelector((state) =>
    selectTransitionByPhaseIdAndTokenId(
      state,
      selectPhaseId(state),
      selectTokenId(state),
    ),
  );

  const status = useAppSelector((state) => state.runner.status);

  useEffect(() => {
    if (status !== "running") {
      return;
    }

    if (!transition?.nextPhaseId) {
      dispatch(stop());
      return;
    }

    const delay = 1000 / store.getState().runner.speed;
    const id = setTimeout(() => dispatch(step(transition)), delay);
    return () => clearTimeout(id);
  }, [status, present, transition, dispatch, store]);
};
