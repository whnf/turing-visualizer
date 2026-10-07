import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { DeletePhase, DeleteToken } from "@/components/DeleteButton";

import { BLANK, Q0, type Phase, type Token } from "@/lib/machine";

import { useAppDispatch } from "@/store/hooks";
import { renamePhase, renameToken } from "@/store/tableSlice";

function NameInput({
  entity,
  renameAction,
  DeleteButton,
  badge,
}: {
  entity: Phase | Token;
  renameAction: typeof renamePhase | typeof renameToken;
  DeleteButton: typeof DeletePhase | typeof DeleteToken;
  badge?: string;
}) {
  const dispatch = useAppDispatch();

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    dispatch(renameAction({ id: entity.id, name: e.target.value }));
  };

  return (
    <InputGroup className="h-full overflow-hidden">
      <InputGroupInput
        key={entity.name}
        defaultValue={entity.name}
        onBlur={handleBlur}
        className="h-full"
      />
      {badge ? (
        <InputGroupAddon align="inline-end">
          <Badge variant="secondary">{badge}</Badge>
        </InputGroupAddon>
      ) : (
        <InputGroupAddon
          align="inline-end"
          className="opacity-0 group-focus-within/input-group:opacity-100 group-hover/input-group:opacity-100"
        >
          <DeleteButton id={entity.id} />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}

export function PhaseNameInput({ phase }: { phase: Phase }) {
  return (
    <NameInput
      entity={phase}
      renameAction={renamePhase}
      DeleteButton={DeletePhase}
      badge={phase.id === Q0 ? "Initial" : undefined}
    />
  );
}

export function TokenNameInput({ token }: { token: Token }) {
  return (
    <NameInput
      entity={token}
      renameAction={renameToken}
      DeleteButton={DeleteToken}
      badge={token.id === BLANK ? "Blank" : undefined}
    />
  );
}
