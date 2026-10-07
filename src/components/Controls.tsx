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
  SPEEDS,
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

  const handleReset = () => {
    if (started) {
      dispatch(reset());
    }
  };

  const handleBack = () => {
    if (started) {
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
    dispatch(
      setSpeed(SPEEDS[Array.isArray(value) ? value[0] : value] ?? speed),
    );
  };

  const running = useAppSelector(selectRunning);

  useRunLoop();

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1 items-center gap-4">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!started || running}
        >
          <RotateCcw />
          Reset
        </Button>
        <span className="text-muted-foreground">
          {stepCount} step{stepCount !== 1 && "s"}
        </span>
      </div>
      <ButtonGroup className="flex flex-1 justify-center">
        <Button onClick={handleBack} disabled={!started || running}>
          <ArrowLeftToLine /> Back
        </Button>
        <Button onClick={handleStep} disabled={!canStep || running}>
          Step <ArrowRightToLine />
        </Button>
        {!running ? (
          <Button variant="outline" onClick={handleRun} disabled={!canStep}>
            <Play /> Run
          </Button>
        ) : (
          <Button variant="outline" onClick={handlePause} disabled={!canStep}>
            <SquarePause /> Pause
          </Button>
        )}
      </ButtonGroup>
      <div className="flex flex-1 items-center justify-end gap-4">
        <span className="text-muted-foreground">{speed}/s</span>
        <Slider
          value={[SPEEDS.indexOf(speed)]}
          onValueChange={handleSpeed}
          min={0}
          max={SPEEDS.length - 1}
          step={1}
          className="max-w-32"
        />
      </div>
    </div>
  );
}
