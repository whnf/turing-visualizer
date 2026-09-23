import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  type ID,
  type Move,
  setTransition,
  selectPhases,
  selectTokens,
  selectNextPhaseByPhaseIdAndTokenId,
  selectNextTokenByPhaseIdAndTokenId,
  selectMoveByPhaseIdAndTokenId,
} from "@/store/tableSlice";

function TransitionSelect({
  phaseId,
  tokenId,
  label,
  field,
  selectNext,
}: {
  phaseId: ID;
  tokenId: ID;
  label: string;
  field: "nextPhaseId" | "nextTokenId";
  selectNext:
    | typeof selectNextPhaseByPhaseIdAndTokenId
    | typeof selectNextTokenByPhaseIdAndTokenId;
}) {
  const dispatch = useAppDispatch();

  const nextEntity = useAppSelector((state) =>
    selectNext(state, phaseId, tokenId),
  );

  const handleChange = (entityId: ID | null) => {
    if (!entityId) {
      return;
    }

    dispatch(
      setTransition({ phaseId, tokenId, changes: { [field]: entityId } }),
    );
  };

  return (
    <Select value={nextEntity?.id ?? null} onValueChange={handleChange}>
      <SelectTrigger className="h-full! w-full">
        <SelectValue>{nextEntity?.name ?? label}</SelectValue>
      </SelectTrigger>
      <SelectMenu label={label} selectAll={selectPhases} />
    </Select>
  );
}

function SelectMenu({
  label,
  selectAll,
}: {
  label: string;
  selectAll: typeof selectPhases | typeof selectTokens;
}) {
  const entities = useAppSelector(selectAll);

  return (
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{label}</SelectLabel>
        {entities.map((entity) => (
          <SelectItem key={entity.id} value={entity.id}>
            {entity.name}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  );
}

export function NextPhaseSelect({
  phaseId,
  tokenId,
}: {
  phaseId: ID;
  tokenId: ID;
}) {
  return (
    <TransitionSelect
      phaseId={phaseId}
      tokenId={tokenId}
      label="State"
      field="nextPhaseId"
      selectNext={selectNextPhaseByPhaseIdAndTokenId}
    />
  );
}

export function NextTokenSelect({
  phaseId,
  tokenId,
}: {
  phaseId: ID;
  tokenId: ID;
}) {
  return (
    <TransitionSelect
      phaseId={phaseId}
      tokenId={tokenId}
      label="Symbol"
      field="nextTokenId"
      selectNext={selectNextTokenByPhaseIdAndTokenId}
    />
  );
}

export function MoveButton({ phaseId, tokenId }: { phaseId: ID; tokenId: ID }) {
  const dispatch = useAppDispatch();

  const move = useAppSelector((state) =>
    selectMoveByPhaseIdAndTokenId(state, phaseId, tokenId),
  );

  const handleClick = () => {
    if (!move) {
      return;
    }

    const nextMove = {
      L: "S",
      S: "R",
      R: "L",
    }[move] as Move;

    dispatch(
      setTransition({
        phaseId,
        tokenId,
        changes: { move: nextMove },
      }),
    );
  };

  return (
    <Button onClick={handleClick} variant="outline" className="h-full w-10">
      {move ?? "S"}
    </Button>
  );
}
