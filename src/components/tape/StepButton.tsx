import { ArrowRightToLine } from "lucide-react";

import { Button } from "@/ui/button";

import { selectRunning } from "@/redux/reducers/runner";
import { step } from "@/redux/reducers/tape";
import { selectCurrentTransition } from "@/redux/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export function StepButton() {
  const dispatch = useAppDispatch();

  const transition = useAppSelector(selectCurrentTransition);
  const running = useAppSelector(selectRunning);

  const canStep = !!transition?.nextPhaseId;

  const handleClick = () => {
    if (canStep) {
      dispatch(step(transition));
    }
  };

  return (
    <Button onClick={handleClick} disabled={!canStep || running}>
      Step <ArrowRightToLine />
    </Button>
  );
}
