import { Badge } from "@/components/ui/badge";

import { useAppSelector } from "@/store/hooks";

export function TapeEditHint() {
  const canEdit = useAppSelector((state) => state.tape.past.length === 0);

  if (!canEdit) {
    return (
      <Badge variant="outline" className="justify-self-end">
        Reset to edit
      </Badge>
    );
  }

  return (
    <Badge className="justify-self-end">
      <span className="group-has-[[data-tape]:focus]/card:hidden">
        Click to edit
      </span>
      <span className="hidden group-has-[[data-tape]:focus]/card:inline">
        Editing
      </span>
    </Badge>
  );
}
