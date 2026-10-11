import { Trash } from "lucide-react";

import { InputGroupButton } from "@/ui/input-group";

import { removePhase, removeToken } from "@/redux/reducers/table";
import { useAppDispatch } from "@/redux/store";

function DeleteButton({
  id,
  deleteAction,
}: {
  id: string;
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

export function DeletePhase({ id }: { id: string }) {
  return <DeleteButton id={id} deleteAction={removePhase} />;
}

export function DeleteToken({ id }: { id: string }) {
  return <DeleteButton id={id} deleteAction={removeToken} />;
}
