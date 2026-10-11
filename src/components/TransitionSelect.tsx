import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Move } from "@/lib/machine";
import {
  selectMove,
  selectNextPhase,
  selectNextToken,
  selectPhases,
  selectTokens,
  setTransition,
} from "@/redux/reducers/table";
import { useAppDispatch, useAppSelector } from "@/redux/store";

function TransitionSelect({
  phaseId,
  tokenId,
  label,
  field,
  selectNext,
  selectAll,
}: {
  phaseId: string;
  tokenId: string;
  label: string;
  field: "nextPhaseId" | "nextTokenId";
  selectNext: typeof selectNextPhase | typeof selectNextToken;
  selectAll: typeof selectPhases | typeof selectTokens;
}) {
  const dispatch = useAppDispatch();

  const nextEntity = useAppSelector((state) =>
    selectNext(state, phaseId, tokenId),
  );

  const handleChange = (entityId: string | null) => {
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
      <SelectMenu label={label} selectAll={selectAll} />
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
  phaseId: string;
  tokenId: string;
}) {
  return (
    <TransitionSelect
      phaseId={phaseId}
      tokenId={tokenId}
      label="State"
      field="nextPhaseId"
      selectNext={selectNextPhase}
      selectAll={selectPhases}
    />
  );
}

export function NextTokenSelect({
  phaseId,
  tokenId,
}: {
  phaseId: string;
  tokenId: string;
}) {
  return (
    <TransitionSelect
      phaseId={phaseId}
      tokenId={tokenId}
      label="Symbol"
      field="nextTokenId"
      selectNext={selectNextToken}
      selectAll={selectTokens}
    />
  );
}

export function MoveButton({
  phaseId,
  tokenId,
}: {
  phaseId: string;
  tokenId: string;
}) {
  const dispatch = useAppDispatch();

  const move = useAppSelector((state) => selectMove(state, phaseId, tokenId));

  const handleClick = () => {
    const nextMoves: Record<Move, Move> = {
      [Move.Left]: Move.Stay,
      [Move.Stay]: Move.Right,
      [Move.Right]: Move.Left,
    };
    const nextMove = nextMoves[move ?? Move.Stay];

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
      {move ?? Move.Stay}
    </Button>
  );
}
