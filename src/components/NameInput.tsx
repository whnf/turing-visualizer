import { Input } from "@/components/ui/input";

import { useAppDispatch } from "@/store/hooks";
import {
  type Phase,
  type Token,
  renamePhase,
  renameToken,
} from "@/store/tableSlice";
import { PhaseInsert, TokenInsert } from "@/components/InsertButton";

function NameInput({
  entity,
  index,
  renameAction,
  InsertButton,
}: {
  entity: Phase | Token;
  index: number;
  renameAction: typeof renamePhase | typeof renameToken;
  InsertButton: typeof PhaseInsert | typeof TokenInsert;
}) {
  const dispatch = useAppDispatch();

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    dispatch(renameAction({ id: entity.id, name: e.target.value }));
  };

  return (
    <div className="h-full relative">
      <Input
        key={entity.name}
        defaultValue={entity.name}
        onBlur={handleBlur}
        className="h-full text-center"
      />
      <InsertButton index={index} />
    </div>
  );
}

export function PhaseNameInput({
  phase,
  index,
}: {
  phase: Phase;
  index: number;
}) {
  return (
    <NameInput
      entity={phase}
      index={index}
      renameAction={renamePhase}
      InsertButton={PhaseInsert}
    />
  );
}

export function TokenNameInput({
  token,
  index,
}: {
  token: Token;
  index: number;
}) {
  return (
    <NameInput
      entity={token}
      index={index}
      renameAction={renameToken}
      InsertButton={TokenInsert}
    />
  );
}
