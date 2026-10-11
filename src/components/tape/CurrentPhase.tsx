import { Badge } from "@/ui/badge";

import { selectCurrentPhase } from "@/redux/selectors";
import { useAppSelector } from "@/redux/store";

export function CurrentPhase() {
  const phase = useAppSelector(selectCurrentPhase);

  if (!phase) {
    return <Badge variant="destructive">No state</Badge>;
  }

  return <Badge variant="secondary">{phase.name}</Badge>;
}
