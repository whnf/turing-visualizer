import { Badge } from "@/components/ui/badge";

import { useAppSelector } from "@/store/hooks";
import { selectCurrentPhase } from "@/store/selectors";

export function CurrentPhase() {
  const phase = useAppSelector(selectCurrentPhase);

  return <Badge variant="secondary">{phase?.name}</Badge>;
}
