import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Play,
  RotateCcw,
  SquarePause,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Slider } from "@/components/ui/slider";

import { useRunLoop } from "@/hooks/useRunLoop";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  pause,
  run,
  selectRunning,
  selectSpeed,
  setSpeed,
} from "@/store/runnerSlice";
import { selectCurrentTransition } from "@/store/selectors";
import {
  back,
  reset,
  selectStarted,
  selectStepCount,
  step,
} from "@/store/tapeSlice";

export function Controls() {
  const transition = useAppSelector(selectCurrentTransition);

  const started = useAppSelector(selectStarted);

  const stepCount = useAppSelector(selectStepCount);

  const dispatch = useAppDispatch();

  const canReset = started;
  const handleReset = () => {
    if (canReset) {
      dispatch(reset());
    }
  };

  const canBack = started;
  const handleBack = () => {
    if (canBack) {
      dispatch(back());
    }
  };

  const canStep = !!transition?.nextPhaseId;
  const handleStep = () => {
    if (canStep) {
      dispatch(step(transition));
    }
  };

  const handleRun = () => {
    if (canStep) {
      dispatch(step(transition));
      dispatch(run());
    }
  };

  const handlePause = () => {
    dispatch(pause());
  };

  const speed = useAppSelector(selectSpeed);

  const handleSpeed = (value: number | readonly number[]) => {
    dispatch(setSpeed(Array.isArray(value) ? value[0] : value));
  };

  const running = useAppSelector(selectRunning);

  useRunLoop();

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1 items-center">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!canReset || running}
        >
          <RotateCcw />
          Reset
        </Button>
        <span className="ml-4 text-muted-foreground">
          {stepCount} step{stepCount !== 1 && "s"}
        </span>
      </div>
      <ButtonGroup className="flex flex-1 justify-center">
        <Button onClick={handleBack} disabled={!canBack || running}>
          <ArrowLeftToLine /> Back
        </Button>
        <Button onClick={handleStep} disabled={!canStep || running}>
          Step <ArrowRightToLine />
        </Button>
        <Button
          variant="outline"
          onClick={!running ? handleRun : handlePause}
          disabled={!canStep}
        >
          {!running ? (
            <>
              <Play /> Run
            </>
          ) : (
            <>
              <SquarePause /> Stop
            </>
          )}
        </Button>
      </ButtonGroup>
      <div className="flex flex-1 justify-end">
        <Slider
          value={[speed]}
          onValueChange={handleSpeed}
          min={1}
          max={10}
          step={1}
          className="max-w-32"
        />
      </div>
    </div>
  );
}
