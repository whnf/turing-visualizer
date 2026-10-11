import { SquareDot } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { selectStarted } from "@/redux/reducers/tape";
import { useAppSelector } from "@/redux/store";

export function TapeEditHint() {
  const started = useAppSelector(selectStarted);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector<HTMLElement>("[data-tape]")?.focus();
  };

  if (started) {
    return (
      <Badge variant="outline" className="justify-self-end">
        Reset to edit
      </Badge>
    );
  }

  return (
    <Badge className="justify-self-end" onMouseDown={handleMouseDown}>
      <SquareDot className="mr-0.5" />
      <span className="group-has-[[data-tape]:focus]/card:hidden">
        Click to edit
      </span>
      <span className="hidden group-has-[[data-tape]:focus]/card:inline">
        Editing
      </span>
    </Badge>
  );
}
