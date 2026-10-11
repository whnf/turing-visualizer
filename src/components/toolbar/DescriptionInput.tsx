import { Input } from "@/ui/input";

import { selectDescription, setDescription } from "@/redux/reducers/meta";
import { selectPhaseCount, selectTokenCount } from "@/redux/reducers/table";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export function DescriptionInput() {
  const dispatch = useAppDispatch();

  const description = useAppSelector(selectDescription);
  const phaseCount = useAppSelector(selectPhaseCount);
  const tokenCount = useAppSelector(selectTokenCount);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(setDescription(e.target.value));
  };

  return (
    <Input
      key={description}
      defaultValue={description}
      onBlur={handleBlur}
      placeholder={`${phaseCount} states, ${tokenCount} symbols`}
    />
  );
}
