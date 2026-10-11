import { Badge } from "@/components/ui/badge";

import { selectCurrentPhase } from "@/redux/selectors";
import { useAppSelector } from "@/redux/store";

export function CurrentPhase() {
  const phase = useAppSelector(selectCurrentPhase);

  return <Badge variant="secondary">{phase?.name}</Badge>;
}
