import { Badge } from "@/ui/badge";

import { selectStarted } from "@/redux/reducers/tape";
import { useAppSelector } from "@/redux/store";

export function EditHint() {
  const started = useAppSelector(selectStarted);

  if (started) {
    return (
      <Badge variant="outline" className="justify-self-end">
        Reset to edit
      </Badge>
    );
  }

  return (
    <span className="flex justify-self-end">
      <Badge
        variant="outline"
        className="group-has-[[data-tape]:focus]/card:hidden"
      >
        <span className="mr-0.5 size-1 bg-current" />
        Click tape to edit
      </Badge>
      <Badge className="hidden group-has-[[data-tape]:focus]/card:inline-flex">
        <span className="mr-0.5 size-1 bg-current" />
        Editing
      </Badge>
    </span>
  );
}
