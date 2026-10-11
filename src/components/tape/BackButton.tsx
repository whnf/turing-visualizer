import { ArrowLeftToLine } from "lucide-react";

import { Button } from "@/ui/button";

import { selectRunning } from "@/redux/reducers/runner";
import { back, selectStarted } from "@/redux/reducers/tape";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export function BackButton() {
  const dispatch = useAppDispatch();

  const started = useAppSelector(selectStarted);
  const running = useAppSelector(selectRunning);

  const handleClick = () => {
    dispatch(back());
  };

  return (
    <Button onClick={handleClick} disabled={!started || running}>
      <ArrowLeftToLine /> Back
    </Button>
  );
}
