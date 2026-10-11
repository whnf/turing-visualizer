import { Button } from "@/ui/button";

import { appendPhase, appendToken } from "@/redux/reducers/table";
import { useAppDispatch } from "@/redux/store";

function AppendButton({
  appendAction,
  label,
}: {
  appendAction: typeof appendPhase | typeof appendToken;
  label: string;
}) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(appendAction());
  };

  return <Button onClick={handleClick}>{label}</Button>;
}

export function AppendPhase() {
  return <AppendButton appendAction={appendPhase} label="Add State" />;
}

export function AppendToken() {
  return <AppendButton appendAction={appendToken} label="Add Symbol" />;
}
