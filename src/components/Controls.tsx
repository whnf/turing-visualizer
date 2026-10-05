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

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectTransitionByPhaseIdAndTokenId } from "@/store/tableSlice";
import {
  step,
  reset,
  back,
  selectPhaseId,
  selectTokenId,
} from "@/store/tapeSlice";
import { run, setSpeed, stop } from "@/store/runnerSlice";
import { useRunLoop } from "@/hooks/useRunLoop";

export function Controls() {
  const transition = useAppSelector((state) =>
    selectTransitionByPhaseIdAndTokenId(
      state,
      selectPhaseId(state),
      selectTokenId(state),
    ),
  );

  const hasHistory = useAppSelector((state) => state.tape.past.length > 0);

  const dispatch = useAppDispatch();

  const canReset = hasHistory;
  const handleReset = () => {
    if (canReset) {
      dispatch(reset());
    }
  };

  const canBack = hasHistory;
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

  const handleStop = () => {
    dispatch(stop());
  };

  const speed = useAppSelector((state) => state.runner.speed);

  const handleSpeed = (value: number | readonly number[]) => {
    dispatch(setSpeed(Array.isArray(value) ? value[0] : value));
  };

  const running = useAppSelector((state) => state.runner.status === "running");

  useRunLoop();

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex-1">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!canReset || running}
        >
          <RotateCcw />
          Reset
        </Button>
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
          onClick={!running ? handleRun : handleStop}
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
