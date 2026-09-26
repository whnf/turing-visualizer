import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAppDispatch } from "@/store/hooks";
import { type ID, removePhase, removeToken } from "@/store/tableSlice";

function DeleteButton({
  id,
  deleteAction,
}: {
  id: ID;
  deleteAction: typeof removePhase | typeof removeToken;
}) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteAction(id));
  };

  return (
    <Button
      size="icon-xs"
      onClick={handleDelete}
      className="size-4 rounded-full opacity-0 transition-opacity group-hover/input-group:opacity-100 focus-visible:opacity-100"
    >
      <XIcon />
    </Button>
  );
}

export function PhaseDelete({ id }: { id: ID }) {
  return <DeleteButton id={id} deleteAction={removePhase} />;
}

export function TokenDelete({ id }: { id: ID }) {
  return <DeleteButton id={id} deleteAction={removeToken} />;
}
