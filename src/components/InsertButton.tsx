import { cn } from "cn";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAppDispatch } from "@/store/hooks";
import { addPhase, addToken } from "@/store/tableSlice";

function InsertButton({
  index,
  insertAction,
  className,
}: {
  index: number;
  insertAction: typeof addPhase | typeof addToken;
  className?: string;
}) {
  const dispatch = useAppDispatch();

  const handleInsert = () => {
    dispatch(insertAction("", index + 1));
  };

  return (
    <div
      className={cn(
        "group absolute flex items-center justify-center",
        className,
      )}
    >
      <Button
        size="icon-xs"
        onClick={handleInsert}
        className="size-4 rounded-full opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 active:not-aria-[haspopup]:translate-y-0"
      >
        <PlusIcon />
      </Button>
    </div>
  );
}

export function PhaseInsert({ index }: { index: number }) {
  return (
    <InsertButton
      index={index}
      insertAction={addPhase}
      className="inset-x-0 bottom-0 h-6 translate-y-1/2"
    />
  );
}

export function TokenInsert({ index }: { index: number }) {
  return (
    <InsertButton
      index={index}
      insertAction={addToken}
      className="inset-y-0 right-0 w-6 translate-x-1/2 in-[th:last-child]:anchored-to-last-token"
    />
  );
}
