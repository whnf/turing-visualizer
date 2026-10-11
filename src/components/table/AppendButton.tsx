import { Button } from "@/ui/button";

import { addPhase, addToken } from "@/redux/reducers/table";
import { useAppDispatch } from "@/redux/store";

function AppendButton({
  appendAction,
  label,
}: {
  appendAction: typeof addPhase | typeof addToken;
  label: string;
}) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(appendAction());
  };

  return <Button onClick={handleClick}>{label}</Button>;
}

export function AppendPhase() {
  return <AppendButton appendAction={addPhase} label="Add State" />;
}

export function AppendToken() {
  return <AppendButton appendAction={addToken} label="Add Symbol" />;
}
