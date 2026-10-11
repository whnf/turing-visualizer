import { Input } from "@/ui/input";

import { selectTitle, setTitle } from "@/redux/reducers/meta";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export function TitleInput() {
  const dispatch = useAppDispatch();

  const title = useAppSelector(selectTitle);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  return (
    <Input
      key={title}
      defaultValue={title}
      onBlur={handleBlur}
      placeholder="Untitled machine"
    />
  );
}
