import { Button } from "@/ui/button";

import { Move } from "@/lib/machine";

import { selectMove, setTransition } from "@/redux/reducers/table";
import { useAppDispatch, useAppSelector } from "@/redux/store";

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
