import { Play, SquarePause } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/ui/button";

import {
  pause,
  run,
  selectRunning,
  selectSpeed,
} from "@/redux/reducers/runner";
import { selectPresent, step } from "@/redux/reducers/tape";
import { selectCurrentTransition } from "@/redux/selectors";
import { useAppDispatch, useAppSelector, useAppStore } from "@/redux/store";

export function RunButton() {
  const dispatch = useAppDispatch();
  const store = useAppStore();

  const present = useAppSelector(selectPresent);
  const running = useAppSelector(selectRunning);
  const transition = useAppSelector(selectCurrentTransition);

  const canStep = !!transition?.nextPhaseId;

  useEffect(() => {
    if (!running) {
      return;
    }

    if (!canStep) {
      dispatch(pause());
      return;
    }

    const delay = 1000 / selectSpeed(store.getState());
    const id = setTimeout(() => dispatch(step(transition)), delay);
    return () => clearTimeout(id);
  }, [dispatch, store, present, running, canStep, transition]);

  const handleRun = () => {
    if (canStep) {
      dispatch(step(transition));
      dispatch(run());
    }
  };

  const handlePause = () => {
    dispatch(pause());
  };

  return !running ? (
    <Button variant="outline" onClick={handleRun} disabled={!canStep}>
      <Play /> Run
    </Button>
  ) : (
    <Button variant="outline" onClick={handlePause} disabled={!canStep}>
      <SquarePause /> Pause
    </Button>
  );
}
