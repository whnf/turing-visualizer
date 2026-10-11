import { selectStepCount } from "@/redux/reducers/tape";
import { useAppSelector } from "@/redux/store";

export function StepCount() {
  const stepCount = useAppSelector(selectStepCount);

  return (
    <span className="text-muted-foreground">
      {stepCount} step{stepCount !== 1 && "s"}
    </span>
  );
}
