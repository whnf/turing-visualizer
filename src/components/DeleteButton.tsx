import { Trash } from "lucide-react";

import { InputGroupButton } from "@/components/ui/input-group";

import { useAppDispatch } from "@/store/hooks";
import { removePhase, removeToken, type ID } from "@/store/tableSlice";

function DeleteButton({
  id,
  deleteAction,
}: {
  id: ID;
  deleteAction: typeof removePhase | typeof removeToken;
}) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(deleteAction(id));
  };

  return (
    <InputGroupButton
      size="icon-xs"
      variant="destructive"
      onClick={handleClick}
    >
      <Trash />
    </InputGroupButton>
  );
}

export function DeletePhase({ id }: { id: ID }) {
  return <DeleteButton id={id} deleteAction={removePhase} />;
}

export function DeleteToken({ id }: { id: ID }) {
  return <DeleteButton id={id} deleteAction={removeToken} />;
}
