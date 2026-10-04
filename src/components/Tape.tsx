import { ArrowUp, ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  selectTokenById,
  selectTokens,
  BLANK_ID,
  type ID,
} from "@/store/tableSlice";
import { moveHead, writeInput } from "@/store/tapeSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

const CELL = 60;
const PITCH = CELL + 8;
const HALF = 40;

export function Tape() {
  const tokens = useAppSelector(selectTokens);

  const { present, past } = useAppSelector((s) => s.tape);
  const { head } = present;

  const dispatch = useAppDispatch();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }

    switch (e.key) {
      case "ArrowLeft":
        dispatch(moveHead(head - 1));
        break;
      case "ArrowRight":
        dispatch(moveHead(head + 1));
        break;
      case "Backspace":
        dispatch(writeInput(BLANK_ID));
        break;
      case "Delete":
      case " ":
        dispatch(writeInput(BLANK_ID));
        break;
      default: {
        const token = tokens.find((t) => t.name === e.key);

        if (!token) {
          return;
        }

        dispatch(writeInput(token.id));
      }
    }

    e.preventDefault();
  };

  const indices = Array.from(
    { length: 2 * HALF + 1 },
    (_, k) => head - HALF + k,
  );

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Tape"
      className="group flex flex-col items-center gap-2 outline-none"
    >
      <ArrowDown className="stroke-1" />
      <div className="relative h-12 w-full overflow-hidden mask-x-from-[calc(100%-6rem)]">
        <div
          className="absolute left-1/2 transition-transform duration-200 ease-out"
          style={{ transform: `translateX(${-(head * PITCH + CELL / 2)}px)` }}
        >
          {indices.map((i) => (
            <Cell
              key={i}
              tokenId={present.cells[i] ?? BLANK_ID}
              index={i}
              active={past.length === 0 && i === head}
              style={{ left: i * PITCH }}
            />
          ))}
        </div>
      </div>
      <ArrowUp className="stroke-1" />
    </div>
  );
}

function Cell({
  tokenId,
  index,
  active,
  style,
}: {
  tokenId: ID;
  index: number;
  active: boolean;
  style: React.CSSProperties;
}) {
  const token = useAppSelector((s) => selectTokenById(s, tokenId));

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(moveHead(index));
  };

  return (
    <div
      onClick={handleClick}
      style={style}
      className={cn(
        "absolute w-15 h-12 border flex items-center justify-center",
        active && "group-focus:border-primary group-focus:bg-accent",
      )}
    >
      {token?.name ?? "_"}
    </div>
  );
}
