import { Badge } from "@/components/ui/badge";

import { useAppSelector } from "@/store/hooks";
import { selectPhaseById } from "@/store/tableSlice";
import { selectPhaseId } from "@/store/tapeSlice";

export function CurrentPhase() {
  const phase = useAppSelector((state) =>
    selectPhaseById(state, selectPhaseId(state)),
  );

  return <Badge variant="secondary">{phase?.name}</Badge>;
}
