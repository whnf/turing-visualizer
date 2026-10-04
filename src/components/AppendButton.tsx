import { Button } from "@/components/ui/button";

import { useAppDispatch } from "@/store/hooks";
import { addPhase, addToken } from "@/store/tableSlice";

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
