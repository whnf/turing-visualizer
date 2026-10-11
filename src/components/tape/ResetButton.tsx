import { RotateCcw } from "lucide-react";

import { Button } from "@/ui/button";

import { selectRunning } from "@/redux/reducers/runner";
import { reset, selectStarted } from "@/redux/reducers/tape";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export function ResetButton() {
  const dispatch = useAppDispatch();

  const started = useAppSelector(selectStarted);
  const running = useAppSelector(selectRunning);

  const handleClick = () => {
    if (started) {
      dispatch(reset());
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={!started || running}
    >
      <RotateCcw />
      Reset
    </Button>
  );
}
