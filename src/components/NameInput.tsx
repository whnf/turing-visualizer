import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";

import { useAppDispatch } from "@/store/hooks";
import {
  type ID,
  type Phase,
  type Token,
  BLANK_ID,
  INITIAL_ID,
  renamePhase,
  renameToken,
} from "@/store/tableSlice";
import { PhaseInsert, TokenInsert } from "@/components/InsertButton";
import { PhaseDelete, TokenDelete } from "@/components/DeleteButton";

function NameInput({
  entity,
  index,
  fixedId,
  fixedLabel,
  renameAction,
  DeleteButton,
  InsertButton,
}: {
  entity: Phase | Token;
  index: number;
  fixedId: ID;
  fixedLabel: string;
  renameAction: typeof renamePhase | typeof renameToken;
  DeleteButton: typeof PhaseDelete | typeof TokenDelete;
  InsertButton: typeof PhaseInsert | typeof TokenInsert;
}) {
  const dispatch = useAppDispatch();

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    dispatch(renameAction({ id: entity.id, name: e.target.value }));
  };

  return (
    <InputGroup className="h-full">
      <InputGroupInput
        key={entity.name}
        defaultValue={entity.name}
        onBlur={handleBlur}
        className="h-full"
      />
      <InputGroupAddon align="inline-end" className="pr-3 has-[>button]:mr-0">
        {entity.id === fixedId ? (
          <Badge className="h-4 rounded-full px-1.5 text-[10px]">
            {fixedLabel}
          </Badge>
        ) : (
          <DeleteButton id={entity.id} />
        )}
      </InputGroupAddon>
      <InsertButton index={index} />
    </InputGroup>
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
      fixedId={INITIAL_ID}
      fixedLabel="Initial"
      renameAction={renamePhase}
      DeleteButton={PhaseDelete}
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
      fixedId={BLANK_ID}
      fixedLabel="Blank"
      renameAction={renameToken}
      DeleteButton={TokenDelete}
      InsertButton={TokenInsert}
    />
  );
}
