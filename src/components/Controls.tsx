import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Play,
  RotateCcw,
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

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex-1">
        <Button variant="outline" onClick={handleReset} disabled={!canReset}>
          <RotateCcw />
          Reset
        </Button>
      </div>
      <ButtonGroup className="flex-1 flex justify-center">
        <Button onClick={handleBack} disabled={!canBack}>
          <ArrowLeftToLine /> Back
        </Button>
        <Button onClick={handleStep} disabled={!canStep}>
          Step <ArrowRightToLine />
        </Button>
        <Button variant="outline">
          <Play /> Run
        </Button>
      </ButtonGroup>
      <div className="flex-1 flex justify-end">
        <Slider defaultValue={1} max={10} step={1} className="max-w-32" />
      </div>
    </div>
  );
}
