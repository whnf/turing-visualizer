import { Slider } from "@/ui/slider";

import { selectSpeed, setSpeed, SPEEDS } from "@/redux/reducers/runner";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export function SpeedSlider() {
  const dispatch = useAppDispatch();

  const speed = useAppSelector(selectSpeed);

  const handleChange = (value: number | readonly number[]) => {
    dispatch(
      setSpeed(SPEEDS[Array.isArray(value) ? value[0] : value] ?? speed),
    );
  };

  return (
    <>
      <span className="text-muted-foreground">{speed}/s</span>
      <Slider
        value={[SPEEDS.indexOf(speed)]}
        onValueChange={handleChange}
        min={0}
        max={SPEEDS.length - 1}
        step={1}
        className="max-w-32"
      />
    </>
  );
}
